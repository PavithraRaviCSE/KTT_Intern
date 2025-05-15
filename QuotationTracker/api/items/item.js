const models = require('../../models/index.js');
const { Op, where, fn, col } = require('sequelize');

exports.get = async (req, res) => {
    try {
        const items = await models.Item.findAll();
        if (!items.length) {
            return res.status(404).send({ status: false, error: 'No items found' });
        }
        res.status(200).send({ status: true, items });
    } catch (error) {
        console.error("Get items error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await models.Item.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ status: false, error: 'Item not found' });
        }
        res.status(200).send({ status: true, item });
    } catch (error) {
        console.error("Get item by ID error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};

const calculateAmount = (unitPrice, gstPercentage) => {

    return unitPrice * gstPercentage / 100;
}

const validateItemFields = ({ name, code, unitPrice, gstPercentage }) => {
    const errors = [];

    name = name?.trim();
    code = code?.trim();

    if (!name) errors.push({ field: 'name', error: 'Item name is required.' });
    if (!code) errors.push({ field: 'code', error: 'Item code is required.' });
    if (unitPrice == null || unitPrice === '') errors.push({ field: 'unitPrice', error: 'Unit price is required.' });
    if (gstPercentage == null || gstPercentage === '') errors.push({ field: 'gstPercentage', error: 'GST percentage is required.' });

    console.log("inputs:   ", name, code.unitPrice, gstPercentage);

    return { errors, data: { name, code, unitPrice, gstPercentage } };
};

const checkDuplicateItem = async ({ name, code }, excludeId = null) => {
    const whereConditions = {
        [Op.or]: [
            where(fn('lower', col('name')), name.toLowerCase()),
            where(fn('lower', col('code')), code.toLowerCase())
        ]
    };

    if (excludeId) {
        whereConditions.id = { [Op.ne]: excludeId };
    }

    const duplicates = await models.Item.findAll({ where: whereConditions });
    const errors = [];

    for (const item of duplicates) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            errors.push({ field: 'name', error: 'Item name already exists.' });
        }
        if (item.code.toLowerCase() === code.toLowerCase()) {
            errors.push({ field: 'code', error: 'Item code already exists.' });
        }
    }

    return errors;
};

exports.create = async (req, res) => {
    try {
        const loggeduser = req.user;
        const userId = loggeduser.id;
        const userName = loggeduser.userName;

        const { errors, data } = validateItemFields(req.body);
        if (errors.length) return res.status(400).send({ status: false, errors });

        const duplicateErrors = await checkDuplicateItem(data);
        if (duplicateErrors.length) return res.status(409).send({ status: false, errors: duplicateErrors });

        const gstAmount = calculateAmount(data.unitPrice, data.gstPercentage);
        const user = {
            createdBy: { id: userId, name: userName },
            updatedBy: { id: userId, name: userName }
        };


        console.log("update item: ", ...data, gstAmount, gstAmount + data.unitPrice);

        const newItem = await models.Item.create({
            ...data,
            gstAmount,
            totalAmount: gstAmount + data.unitPrice,
            user
        });

        return res.status(201).send({ status: true, message: "Item created successfully", data: newItem });

    } catch (error) {
        console.error("Create item error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


exports.update = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await models.Item.findByPk(itemId);
        if (!item) return res.status(404).send({ status: false, error: "Item not found" });

        const { errors, data } = validateItemFields(req.body);
        if (errors.length) return res.status(400).send({ status: false, errors });

        const duplicateErrors = await checkDuplicateItem(data, itemId);
        if (duplicateErrors.length) return res.status(409).send({ status: false, errors: duplicateErrors });

        const unitPrice = parseFloat(data.unitPrice);
        const gstPercentage = parseFloat(data.gstPercentage);
        const gstAmount = calculateAmount(unitPrice, gstPercentage);
        const totalAmount = parseFloat((unitPrice + gstAmount).toFixed(2));

        await item.update({
            ...data,
            unitPrice,
            gstPercentage,
            gstAmount,
            totalAmount
        });

        return res.status(200).send({ status: true, message: "Item updated successfully", data: item });

    } catch (error) {
        console.error("Update item error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};


// exports.create = async (req, res) => {
//     try {
//         const { name, code, unitPrice, gstPercentage } = req.body;
//         const loggeduser = req.user;

//         const userId = loggeduser.id;
//         const userName = loggeduser.userName;

//         const gstAmount = calculateAmount(unitPrice, gstPercentage);

//         const user = {
//             createdBy: {
//                 id: userId,
//                 name: userName
//             },
//             updatedBy: {
//                 id: userId,
//                 name: userName
//             }
//         };

//         let errors = [];

//         if (!name) errors.push({ field: 'name', error: 'Item name is required.' });
//         if (!code) errors.push({ field: 'code', error: 'Item code is required.' });
//         if (!unitPrice) errors.push({ field: 'unitPrice', error: 'Unit price is required.' });
//         if (!gstPercentage) errors.push({ field: 'gstPercentage', error: 'GST percentage is required.' });

//         if (errors.length > 0) {
//             return res.status(400).send({ status: false, errors });
//         }

//         const existingItem = await models.Item.findOne({
//             where: {
//                 [Op.or]: [
//                     { name },
//                     { code }
//                 ]
//             }
//         });

//         if (existingItem) {
//             if (existingItem.name === name) {
//                 errors.push({ field: 'name', error: 'Item name already exists.' });
//             }
//             if (existingItem.code === code) {
//                 errors.push({ field: 'code', error: 'Item code already exists.' });
//             }
//         }

//         if (errors.length > 0) {
//             return res.status(409).send({ status: false, errors });
//         }

//         // Create new item
//         const newItem = await models.Item.create({
//             name,
//             code,
//             unitPrice,
//             gstPercentage,
//             gstAmount,
//             user
//         });

//         return res.status(201).send({ status: true, message: "Item created successfully", data: newItem });

//     } catch (error) {
//         console.error("Create item error:", error);
//         return res.status(500).send({ status: false, error: error.message });
//     }
// };


// exports.update = async (req, res) => {
//     try {
//         const itemId = req.params.id;
//         const itemData = req.body;

//         const item = await models.Item.findByPk(itemId);
//         if (!item) {
//             return res.status(404).send({ status: false, error: "Item not found" });
//         }

//         const existingItem = await models.Item.findOne({
//             where: {
//                 [Op.or]: [
//                     { name: itemData.name, id: { [Op.ne]: itemId } },
//                     { code: itemData.code, id: { [Op.ne]: itemId } }
//                 ]
//             }
//         });

//         if (existingItem) {
//             return res.status(409).send({
//                 status: false,
//                 error: "Another item with same name or code already exists."
//             });
//         }

//         await item.update(itemData);

//         res.status(200).send({ status: true, message: "Item updated successfully", data: item });
//     } catch (error) {
//         console.error("Update item error:", error);
//         res.status(500).send({ status: false, error: error.message });
//     }
// };

exports.delete = async (req, res) => {
    try {
        const item = await models.Item.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ status: false, error: "Item not found" });
        }

        await item.destroy();
        res.status(200).send({ status: true, message: "Item deleted successfully" });
    } catch (error) {
        console.error("Delete item error:", error);
        res.status(500).send({ status: false, error: error.message });
    }
};
