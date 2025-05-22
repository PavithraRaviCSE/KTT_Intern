const models = require('../../models/index.js');
const { Op, where, fn, col } = require('sequelize');

// Get all quotation headers with item info
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
                'discount',
                'gstAmount',
                'totalAmount',
                'status'
            ],
            include: [
                {
                    model: models.Customer,
                    attributes: ['name', 'id', 'email', 'address','gstNumber']
                },
                {
                    model: models.QoDetail,
                    attributes: [
                        'id',
                        'QoHeaderId',
                        'desc',
                        'quantity',
                        'unitPrice',
                        'discount',
                        'gstPercentage',
                        'gstAmount',
                        'totalAmount'
                    ],
                    include: [
                        {
                            model: models.Item,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });

        if (!headers.length) {
            return res.status(404).send({ status: false, message: "No quotations found" });
        }

        return res.status(200).send({ status: true, quotation: headers });

    } catch (error) {
        console.error("Fetch quotations error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


exports.getById = async (req, res) => {
    try {
        const id = req.params.id;

        const quotation = await models.QoHeader.findByPk(id, {
            include: [
                {
                    model: models.QoDetail,
                    as: 'QoDetails'
                }
            ]
        });

        if (!quotation) {
            return res.status(404).send({ status: false, message: 'Quotation not found' });
        }

        res.status(200).send({ status: true, quotation: quotation });
    } catch (error) {
        console.error("Get by ID Error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};



// Validation for fields
const validateFields = ({
    qoNumber,
    qoDate,
    CustomerId,
    expiryDate,
    subTotal,
    discount,
    gstAmount,
    totalAmount,
    status
}) => {
    const errors = [];

    if (!qoNumber) errors.push({ field: 'qoNumber', error: 'Quotation number is required.' });
    if (!qoDate) errors.push({ field: 'qoDate', error: 'Quotation date is required.' });
    if (!CustomerId) errors.push({ field: 'CustomerId', error: 'Customer Id is required.' });
    if (!expiryDate) errors.push({ field: 'expiryDate', error: 'Expiry date is required.' });
    if (!subTotal) errors.push({ field: 'subTotal', error: 'Sub total is required.' });
    if (!discount) errors.push({ field: 'discount', error: 'Discount is required.' });
    if (!gstAmount) errors.push({ field: 'gstAmount', error: 'GST amount is required.' });
    if (!totalAmount) errors.push({ field: 'totalAmount', error: 'Total amount is required.' });
    if (status === undefined || status === null) errors.push({ field: 'status', error: 'Status is required.' });

    return {
        errors,
        data: {
            qoNumber,
            qoDate,
            CustomerId,
            expiryDate,
            subTotal,
            discount,
            gstAmount,
            totalAmount,
            status
        }
    };
};

// Validation for fields
const validateForCreateFields = ({
    qoNumber,
    qoDate,
    expiryDate,
    CustomerId,
    details = []
}) => {
    const errors = [];

    if (!qoNumber) errors.push({ field: 'qoNumber', error: 'Quotation date is required.' });
    if (!qoDate) errors.push({ field: 'qoDate', error: 'Quotation date is required.' });
    if (!expiryDate) errors.push({ field: 'expiryDate', error: 'Expiry date is required.' });
    if (!CustomerId) errors.push({ field: 'customerId', error: 'Customer ID is required.' });
    if (!details.length) errors.push({ field: 'details', error: 'At least one item is required.' });

    let subTotal = 0;
    let discount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    details.forEach((item, index) => {
        if (!item.ItemId) errors.push({ field: `details[${index}].item`, error: 'id  is required.' });
        if (item.quantity == null || item.quantity <= 0) errors.push({ field: `details[${index}].quantity`, error: 'Quantity must be greater than 0.' });
        if (item.unitPrice == null || item.unitPrice < 0) errors.push({ field: `details[${index}].unitPrice`, error: 'Unit price must be 0 or more.' });

        const itemTotal = (item.unitPrice * item.quantity) - item.discount + item.gstAmount;

        subTotal += item.unitPrice * item.quantity;
        discount += item.discount || 0;
        gstAmount += item.gstAmount || 0;
        totalAmount += itemTotal;
    });

    return {
        errors,
        data: {
            qoNumber,
            qoDate,
            expiryDate,
            CustomerId,
            subTotal,
            discount,
            gstAmount,
            totalAmount,
            details
        }
    };
};


// Create quotation header with details
exports.create = async (req, res) => {
    try {
        debugger;
        const loggedUser = req.user;
        const userId = loggedUser.id;
        const userName = loggedUser.userName;

        // Validate the fields for the header
        console.log("qo data: ", req.body);

        const { errors, data } = validateForCreateFields(req.body);
        console.log("errors: ", errors, "data: ", data);

        if (errors.length) return res.status(400).send({ status: false, errors });

        const user = {
            createdBy: { id: userId, name: userName },
            updatedBy: { id: userId, name: userName }
        };

        if (req.body.details && req.body.details.length > 0) {
            const detailsErrors = [];
            req.body.details.forEach((detail, index) => {
                const detailErrors = validateDetailFieldsSkipHeaderId(detail);
                if (detailErrors.length) {
                    detailsErrors.push({ index, errors: detailErrors });
                }
            });

            if (detailsErrors.length) {
                return res.status(400).send({ status: false, errors: detailsErrors });
            }
        }

        // Begin managed transaction
        const newQuotation = await models.sequelize.transaction(async (transaction) => {
            const createdQuotation = await models.QoHeader.create({
                ...data,
                user
            }, { transaction });

            if (req.body.details && req.body.details.length > 0) {
                const detailsData = req.body.details.map(detail => ({
                    ...detail,
                    QoHeaderId: createdQuotation.id,
                    user
                }));

                await models.QoDetail.bulkCreate(detailsData, { transaction });
            }

            return createdQuotation;
        });


        console.log("quotations created..............");

        return res.status(201).send({
            status: true,
            message: "Quotation created successfully",
            data: newQuotation
        });

    } catch (error) {
        console.error("Create quotation error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


const validateDetailFieldsSkipHeaderId = (detail) => {
    const {
        ItemId, desc, quantity, unitPrice, discount,
        gstPercentage, gstAmount, totalAmount
    } = detail;

    const errors = [];

    if (!ItemId) errors.push({ field: 'ItemId', error: 'Item ID is required.' });
    if (!desc) errors.push({ field: 'desc', error: 'Description is required.' });
    if (isNaN(quantity) || quantity <= 0) errors.push({ field: 'quantity', error: 'Quantity must be a positive number.' });
    if (unitPrice === undefined) errors.push({ field: 'unitPrice', error: 'Unit price is required.' });
    if (discount === undefined) errors.push({ field: 'discount', error: 'Discount is required.' });
    if (gstPercentage === undefined) errors.push({ field: 'gstPercentage', error: 'GST percentage is required.' });
    if (gstAmount === undefined) errors.push({ field: 'gstAmount', error: 'GST amount is required.' });
    if (totalAmount === undefined) errors.push({ field: 'totalAmount', error: 'Total amount is required.' });

    return errors;
};

const validateDetailFields = ({ QoHeaderId, ItemId, desc, quantity, unitPrice, discount, gstPercentage, gstAmount, totalAmount }) => {
    const errors = [];

    if (!QoHeaderId) errors.push({ field: 'QoHeaderId', error: 'Quotation header ID is required.' });
    if (!ItemId) errors.push({ field: 'ItemId', error: 'Item ID is required.' });
    if (!desc) errors.push({ field: 'desc', error: 'Description is required.' });
    if (isNaN(quantity) || quantity <= 0) errors.push({ field: 'quantity', error: 'Quantity must be a positive number.' });
    if (!unitPrice) errors.push({ field: 'unitPrice', error: 'Unit price is required.' });
    if (discount === undefined) errors.push({ field: 'discount', error: 'Discount is required.' });
    if (gstPercentage === undefined) errors.push({ field: 'gstPercentage', error: 'GST percentage is required.' });
    if (gstAmount === undefined) errors.push({ field: 'gstAmount', error: 'GST amount is required.' });
    if (totalAmount === undefined) errors.push({ field: 'totalAmount', error: 'Total amount is required.' });

    return {
        errors,
        data: {
            QoHeaderId,
            ItemId,
            desc,
            quantity,
            unitPrice,
            discount,
            gstPercentage,
            gstAmount,
            totalAmount
        }
    };
};
exports.update = async (req, res) => {
    try {
        const quotationId = req.params.id;

        console.log("update function is called.....");


        const result = await models.sequelize.transaction(async (transaction) => {
            const quotation = await models.QoHeader.findByPk(quotationId, { transaction });

            if (!quotation) {
                throw new Error("Quotation not found");
            }

            const { errors, data } = validateFields(req.body);
            if (errors.length) {
                const err = new Error("Validation errors");
                err.status = 400;
                err.details = errors;
                throw err;
            }

            if (req.body.details && req.body.details.length > 0) {
                const detailsErrors = [];
                req.body.details.forEach((detail, index) => {
                    const { errors: detailErrors } = validateDetailFields(detail);
                    if (detailErrors.length) {
                        detailsErrors.push({ index, errors: detailErrors });
                    }
                });

                if (detailsErrors.length) {
                    const err = new Error("Detail validation errors");
                    err.status = 400;
                    err.details = detailsErrors;
                    throw err;
                }
            }

            await quotation.update({ ...data }, { transaction });

            if (req.body.details && req.body.details.length > 0) {
                const detailsData = req.body.details.map(detail => ({
                    ...detail,
                    QoHeaderId: quotation.id
                }));

                for (let i = 0; i < detailsData.length; i++) {
                    const detail = detailsData[i];
                    const existingDetail = await models.QoDetail.findByPk(detail.id, { transaction });
                    if (existingDetail) {
                        await existingDetail.update(detail, { transaction });
                    } else {
                        await models.QoDetail.create(detail, { transaction });
                    }
                }
            }

            return quotation;
        });

        return res.status(200).send({
            status: true,
            message: "Quotation updated successfully",
            data: result
        });

    } catch (error) {
        const status = error.status || 500;
        const response = {
            status: false,
            error: error.message
        };

        if (error.details) {
            response.errors = error.details;
        }

        console.error("Update quotation error:", error);
        return res.status(status).send(response);
    }
};


exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const quotation = await models.QoHeader.findByPk(id);

        if (!quotation) {
            return res.status(404).send({ status: false, message: 'Quotation not found' });
        }

        await quotation.destroy();

        res.status(200).send({ status: true, message: 'Quotation and details deleted successfully' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};






//SequelizeConnectionAcquireTimeoutError: Operation timeout