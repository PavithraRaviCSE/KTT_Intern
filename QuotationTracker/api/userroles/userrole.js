const { UserRole } = require('../../models/index.js');
const path = require('path');

const getUserRole = async (req, res) => {
    try {
        console.log("user model: ", UserRole);

        const userRoles = await UserRole.findAll({});
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

const getUserRoleById = async (req, res) => {
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

const update = async (req, res) => {
    try{
        const {id, name, status} = req.body;

        if(!id || !name || status == ""){
            return res.status(400).json({message: "id or name or status missing"});
        }
        userRole = UserRole.findByPk(id);
    }
    catch(err){
        console.log("error: " , err);
        
    }
};

const addRole = async (req, res) => {
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

module.exports = {
    getUserRole,
    getUserRoleById,
    addRole,
    update
};
