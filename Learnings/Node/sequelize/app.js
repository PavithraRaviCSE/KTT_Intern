
const express = require('express');
const sequelize = require('./db');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

sequelize.sync({alter: true}).then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
// sequelize.sync({ force: true }) // drops and recreates tables
// sequelize.sync({ alter: true }) // alters existing tables without dropping
