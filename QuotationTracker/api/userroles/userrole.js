const { UserRole } = require('../../models/index.js');
const { sequelize } = require('../../models/index.js');
const { Op } = require("sequelize");

exports.get = async (req, res) => {
    try {
        const userRoles = await UserRole.findAll({ attributes: ['id', 'status', 'name'] });


        if (userRoles.length === 0) {
            return res.status(404).send({ status: false, error: "No user roles found" });
        }

        return res.status(200).send({ status: true, data: userRoles });
    } catch (error) {
        console.error("Get userRoles error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const userRoleId = req.params.id;

        const userRole = await UserRole.findByPk(userRoleId);

        if (!userRole) {
            return res.status(404).send({ status: false, error: "User role not found" });
        }

        return res.status(200).send({ status: true, data: userRole });
    } catch (error) {
        console.error("Get userRole by ID error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
}; exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        if (!id || !name || status === undefined) {
            return res.status(400).send({ status: false, error: "id, name, and status are required" });
        }

        const userRole = await UserRole.findByPk(id);

        if (!userRole) {
            return res.status(404).send({ status: false, error: "User role not found" });
        }

        const existingRole = await UserRole.findOne({
            where: {
                name: { [Op.iLike]: name },
                id: { [Op.ne]: id }
            }
        });

        if (existingRole) {
            return res.status(409).send({ status: false, error: "Role name already exists" });
        }

        await userRole.update({ name, status });

        return res.status(200).send({ status: true, message: "User role updated successfully", data: userRole });
    } catch (error) {
        console.error("Update userRole error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ status: false, error: "Role name is required" });
        }

        // Check for duplicate role name (case-insensitive)
        const existingRole = await UserRole.findOne({
            where: {
                name: { [Op.iLike]: name } // Case-insensitive check
            }
        });

        if (existingRole) {
            return res.status(409).send({ status: false, error: "Role name already exists" });
        }

        const newRole = await UserRole.create({ name });

        return res.status(201).send({ status: true, message: "User role created successfully", data: newRole });
    } catch (error) {
        console.error("Create userRole error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const userRole = await UserRole.findByPk(id);
        if (!userRole) {
            return res.status(404).send({ status: false, error: "User role not found" });
        }

        await userRole.destroy();

        const remainingRoles = await UserRole.count();
        if (remainingRoles === 0) {
            await sequelize.query('ALTER SEQUENCE "UserRoles_id_seq" RESTART WITH 1;');
            console.log("Sequence reset to 1");
        }

        return res.status(200).send({ status: true, message: "User role deleted successfully" });
    } catch (error) {
        console.error("Delete userRole error:", error);
        return res.status(500).send({ status: false, error: error.message });
    }
};
