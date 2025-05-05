const { UserRole } = require('../../models/index.js');
const path = require('path');

exports.get = async (req, res) => {
    try {
        console.log("user model: ", UserRole);
        const userRoles = await UserRole.findAll({ attributes: ['id', 'status', 'name'] });
        console.log(userRoles);
        res.json(userRoles);
        if (userRoles.length === 0) {
            return res.status(404).json({ message: "No userRole found" });
        }
    } catch (error) {
        console.log("get user error: ", error);
        return res.status(500).json({ message: "An error occurred while fetching userRoles" });
    }
};


exports.getById = async (req, res) => {
    try {
        console.log("user model: ", UserRole);
        const userRoleId = req.params.id;
        const userRoleWithId = await UserRole.findAll({
            where: {
                id: userRoleId
            }
        });

        console.log(userRoleWithId);

        res.json(userRoleWithId);
        if (userRoleWithId.length === 0) {
            return res.status(404).json({ message: "No userRole found" });
        }
    } catch (error) {
        console.log("get user error: ", error);
        return res.status(500).json({ message: "An error occurred while fetching userRoles" });
    }
};
exports.update = async (req, res) => {
    try {

        console.log("update method is called.......");

        const { name, status } = req.body;
        const { id } = req.params;

        console.log("Request Params:", req.params);
        console.log("Request Body:", req.body);

        if (!id || !name || status === undefined) {
            return res.status(400).json({ message: "id, name, or status is missing" });
        }

        const userRole = await UserRole.findByPk(id);

        if (!userRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        await userRole.update({
            name,
            status
        });

        return res.status(200).json({ message: "Role updated successfully", role: userRole });

    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: " Role name is required" });
        }

        const existingRole = await UserRole.findOne({ where: { name } });

        if (existingRole) {
            return res.status(409).json({ message: "Role name already exists" });
        }

        const newRole = await UserRole.create({ name });

        return res.status(201).json({ message: "Role created successfully", role: newRole });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went worng", err });

    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Role ID is required" });
        }

        const userRole = await UserRole.findByPk(id);

        if (!userRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        await userRole.destroy();

        const remainingRoles = await UserRole.count();
        if (remainingRoles === 0) {
            await sequelize.query('ALTER SEQUENCE "UserRoles_id_seq" RESTART WITH 1;');
            console.log("Sequence reset to 1");
        }
        
        return res.status(200).json({ message: "Role deleted successfully" });

    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

