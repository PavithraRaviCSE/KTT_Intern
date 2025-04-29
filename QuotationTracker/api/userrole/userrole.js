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

const getUserRoleTable = (req, res ) => {
       res.sendFile(path.join(__dirname, "../../views/userRoleTable.html"));
}

module.exports = {
    getUserRole,
    getUserRoleById,
    getUserRoleTable
};
