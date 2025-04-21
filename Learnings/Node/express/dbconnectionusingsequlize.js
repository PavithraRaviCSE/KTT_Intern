const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

const sequelize = new Sequelize('Students', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'Student',
    timestamps: false,
});

sequelize.sync()
    .then(() => console.log('Database synced successfully'))
    .catch(err => console.error('Error syncing database:', err));

app.get('/', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM Student', {
            type: sequelize.QueryTypes.SELECT
        });
        console.log('Raw query result:', result);  
        res.json(result);  
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Database error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
