const models = require('../../models/index.js');
const { Op, where, fn, col } = require('sequelize');

// Get all quotation details
exports.get = async (req, res) => {
    try {
        const details = await models.QoDetail.findAll({
            attributes: [
                'id',
                'QoHeaderId',
                'ItemId',
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
                    attributes: ['name'] // assuming Item has a name
                },
                {
                    model: models.QoHeader,
                    attributes: ['qoNumber'] // optional
                }
            ]
        });

        if (!details.length) {
            return res.status(404).send({ status: false, message: "No quotation details found" });
        }

        return res.status(200).send({ status: true, data: details });

    } catch (error) {
        console.error("Fetch quotation details error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

// Get quotation header by ID
// Get quotation detail by ID
exports.getById = async (req, res) => {
    try {
        const detail = await models.QoDetail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).send({ status: false, error: 'Quotation detail not found' });
        }
        res.status(200).send({ status: true, data: detail });
    } catch (error) {
        console.error("Get quotation detail by ID error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};

exports.getByQHId = async (req, res) => {
    try {
        const details = await models.QoDetail.findAll({
            where: { QoHeaderId: req.params.id },
            attributes: ['id', 'quantity', 'desc','unitPrice','discount','gstPercentage','gstAmount', 'totalAmount'],
            include: [
                {
                    model: models.Item,
                    as: 'Item',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!details.length) {
            return res.status(404).send({ status: false, error: 'No quotation items found for this ID' });
        }

        const data = details.map(d => ({
            id: d.id,
            ItemId: d.Item.id,
            ItemName: d.Item.name,
            desc:d.desc,
            quantity: d.quantity,
            discount:d.discount,
            unitPrice: d.unitPrice,
            gstPercentage: d.gstPercentage,
            gstAmount: d.gstAmount,
            totalAmount: d.totalAmount
        }));

        res.status(200).send({ status: true, data });
    } catch (error) {
        console.error('Get quotation detail by ID error:', error);
        res.status(500).send({ status: false, error: error.message });
    }
};


const validateFields = ({ QoHeaderId, ItemId, desc, quantity, unitPrice, discount, gstPercentage, gstAmount, totalAmount }) => {
    const errors = [];

    if (!QoHeaderId) errors.push({ field: 'QoHeaderId', error: 'Quotation header ID is required.' });
    if (!ItemId) errors.push({ field: 'ItemId', error: 'Item ID is required.' });
    if (!desc) errors.push({ field: 'desc', error: 'Description is required.' });
    if (isNaN(quantity) || quantity <= 0) errors.push({ field: 'quantity', error: 'Quantity must be a positive number.' });
    if (!unitPrice) errors.push({ field: 'unitPrice', error: 'Unit price is required.' });
    if (discount === undefined) errors.push({ field: 'discount', error: 'Discount is required.' });
    if (gstPercentage === undefined) errors.push({ field: 'gstPercentage', error: 'GST percentage is required.' });
    if (gstAmount === undefined) errors.push({ field: 'gstAmount', error: 'Get amount is required.' });
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


// Create quotation detail
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

        const newDetail = await models.QoDetail.create({
            ...data,
            user
        });

        return res.status(201).send({ status: true, message: "Quotation detail created successfully", data: newDetail });

    } catch (error) {
        console.error("Create quotation detail error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

// Update quotation detail
exports.update = async (req, res) => {
    try {
        const detailId = req.params.id;
        const detail = await models.QoDetail.findByPk(detailId);
        if (!detail) return res.status(404).send({ status: false, error: "Quotation detail not found" });

        const { errors, data } = validateFields(req.body);
        if (errors.length) return res.status(400).send({ status: false, errors });

        await detail.update({
            ...data
        });

        return res.status(200).send({ status: true, message: "Quotation detail updated successfully", data: detail });

    } catch (error) {
        console.error("Update quotation detail error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


// Delete quotation detail
exports.delete = async (req, res) => {
    try {
        const detail = await models.QoDetail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).send({ status: false, error: "Quotation detail not found" });
        }

        await detail.destroy();
        res.status(200).send({ status: true, message: "Quotation detail deleted successfully" });
    } catch (error) {
        console.error("Delete quotation detail error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};

