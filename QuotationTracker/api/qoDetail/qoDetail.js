const models = require('../../models/index.js');
const { Op, where, fn, col } = require('sequelize');

// Get all quotation headers
exports.get = async (req, res) => {
    try {
        const headers = await models.QoHeader.findAll({
            attributes: [
                'id',
                'qoNumber',
                'CustomerId',
                'qoDate',
                'expiryDate',
                'subTotal',
                'taxAmount',
                'discount',
                'gstAmount',
                'totalAmount',
                'status'
            ],
            include: [{
                model: models.Customer,
                attributes: ['name']  
            }]
        });

        if (!headers.length) {
            return res.status(404).send({ status: false, message: "No quotations found" });
        }

        return res.status(200).send({ status: true, data: headers });

    } catch (error) {
        console.error("Fetch quotation headers error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};
// Get quotation header by ID
exports.getById = async (req, res) => {
    try {
        const quotation = await models.QuotationHeader.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).send({ status: false, error: 'Quotation not found' });
        }
        res.status(200).send({ status: true, quotation });
    } catch (error) {
        console.error("Get quotation by ID error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};

// Validation for fields
const validateFields = ({ customerId, quotationDate, expiryDate }) => {
    const errors = [];

    customerId = customerId?.trim();

    if (!customerId) errors.push({ field: 'customerId', error: 'Customer name is required.' });
    if (!quotationDate) errors.push({ field: 'quotationDate', error: 'Quotation date is required.' });
    if (!expiryDate) errors.push({ field: 'expiryDate', error: 'Expiry date is required.' });

    return { errors, data: { customerId, quotationDate, expiryDate } };
};

// Create quotation header
exports.create = async (req, res) => {
    try {
        const loggedUser = req.user;
        const userId = loggedUser.id;
        const userName = loggedUser.userName;

        const { errors, data } = validateFields(req.body);
        if (errors.length) return res.status(400).send({ status: false, errors });

        const user = {
            createdBy: { id: userId, name: userName },
            updatedBy: { id: userId, name: userName }
        };

        const newQuotation = await models.QuotationHeader.create({
            ...data,
            user
        });

        return res.status(201).send({ status: true, message: "Quotation created successfully", data: newQuotation });

    } catch (error) {
        console.error("Create quotation error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

// Update quotation header
exports.update = async (req, res) => {
    try {
        const quotationId = req.params.id;
        const quotation = await models.QuotationHeader.findByPk(quotationId);
        if (!quotation) return res.status(404).send({ status: false, error: "Quotation not found" });

        const { errors, data } = validateFields(req.body);
        if (errors.length) return res.status(400).send({ status: false, errors });

        await quotation.update({
            ...data
        });

        return res.status(200).send({ status: true, message: "Quotation updated successfully", data: quotation });

    } catch (error) {
        console.error("Update quotation error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

// Delete quotation header
exports.delete = async (req, res) => {
    try {
        const quotation = await models.QuotationHeader.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).send({ status: false, error: "Quotation not found" });
        }

        await quotation.destroy();
        res.status(200).send({ status: true, message: "Quotation deleted successfully" });
    } catch (error) {
        console.error("Delete quotation error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};
