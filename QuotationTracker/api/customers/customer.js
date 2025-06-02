const models = require('../../models/index.js');
const { Op, fn, col, where } = require('sequelize');

exports.get = async (req, res) => {
    try {
        const customersData = await models.Customer.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'gstNumber', 'status', 'address'] // Added address
        });

        if (!customersData.length) return res.status(404).send({ status: false, error: 'No customers found' });

        const customers = customersData.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            gstNumber: customer.gstNumber,
            status: customer.status,
            address: customer.address // Added address
        }));

        res.status(200).json({ status: true, customers });
    } catch (error) {
        console.error("Get customer error: ", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customers = await models.Customer.findAll({ where: { id: customerId } });

        if (!customers.length) return res.status(404).send({ status: false, error: "Customer not found" });

        res.status(200).json({ status: true, customers });
    } catch (error) {
        console.error("Get customer by ID error: ", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

const normalizeAndValidateInput = (data, checkStatus) => {
    const normalized = {
        name: data.name?.trim(),
        email: data.email?.trim().toLowerCase(),
        phone: data.phone?.trim(),
        gstNumber: data.gstNumber?.trim().toUpperCase(),
        address: data.address?.trim(),

    };


    if (checkStatus) {
        normalized.status = data.status;
    }
    const errors = [];

    for (let field in normalized) {
        if (!normalized[field]) {
            errors.push({ field, error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` });
        }
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (normalized.name && !namePattern.test(normalized.name)) {
        errors.push({ field: 'name', error: 'Name should only contain alphabets and spaces.' });
    }

    const phonePattern = /^[6789][0-9]{9}$/;
    if (normalized.phone && !phonePattern.test(normalized.phone)) {
        errors.push({ field: 'phone', error: 'Phone number must be exactly 10 digits.' });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (normalized.email && !emailPattern.test(normalized.email)) {
        errors.push({ field: 'email', error: 'Invalid email format.' });
    }

    return { normalized, errors };
};


const checkDuplicateCustomer = async (normalized, customerId = null) => {
    const errors = [];

    const whereNotSelf = customerId ? { [Op.ne]: customerId } : undefined;

    const duplicates = await Promise.all([
        models.Customer.findOne({
            where: {
                [Op.and]: [
                    where(fn('LOWER', col('name')), normalized.name.toLowerCase()),
                    ...(customerId ? [{ id: { [Op.ne]: customerId } }] : [])
                ]
            }
        }),
        models.Customer.findOne({
            where: {
                email: normalized.email,
                ...(customerId && { id: { [Op.ne]: customerId } })
            }
        }),
        models.Customer.findOne({
            where: {
                phone: normalized.phone,
                ...(customerId && { id: { [Op.ne]: customerId } })
            }
        }),
        models.Customer.findOne({
            where: {
                gstNumber: normalized.gstNumber,
                ...(customerId && { id: { [Op.ne]: customerId } })
            }
        }),
    ]);

    if (duplicates[0]) errors.push({ field: 'name', error: 'Customer name already in use.' });
    if (duplicates[1]) errors.push({ field: 'email', error: 'Email already in use.' });
    if (duplicates[2]) errors.push({ field: 'phone', error: 'Phone number already in use.' });
    if (duplicates[3]) errors.push({ field: 'gstNumber', error: 'GST Number already in use.' });

    console.log("errors create: ", errors);

    return errors;
};




exports.create = async (req, res) => {
    try {
        const { normalized, errors } = normalizeAndValidateInput(req.body, false);
        if (errors.length > 0) {
            console.log("create customer errors: ", errors);

            return res.status(400).send({ status: false, errors });
        }

        const duplicateErrors = await checkDuplicateCustomer(normalized);
        console.log("duplicateErrors", duplicateErrors);

        if (duplicateErrors.length > 0) {
            return res.status(409).send({ status: false, errors: duplicateErrors });
        }

        const newCustomer = await models.Customer.create(normalized);
        return res.status(201).send({ status: true, message: "Customer created successfully", data: newCustomer });

    } catch (error) {
        console.error("Create customer error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const customerId = parseInt(req.params.id, 10);

        const { normalized, errors } = normalizeAndValidateInput(req.body, true);
        if (errors.length > 0) {
            return res.status(400).send({ status: false, errors });
        }

        const customer = await models.Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).send({ status: false, error: "Customer not found" });
        }

        const duplicateErrors = await checkDuplicateCustomer(normalized, customerId);
        if (duplicateErrors.length > 0) {
            return res.status(409).send({ status: false, errors: duplicateErrors });
        }

        await customer.update(normalized);
        return res.status(200).send({ status: true, message: "Customer updated successfully", data: customer });

    } catch (error) {
        console.error("Update customer error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


exports.delete = async (req, res) => {
    try {
        const customerId = req.params.id;

        const customer = await models.Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).send({ status: false, error: "Customer not found" });
        }

        await customer.destroy();

        return res.status(200).send({ status: true, message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Delete customer error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};
