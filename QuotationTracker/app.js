const express = require("express");
const path = require("path");
const models = require("./models/index.js");
const authUser = require('./api/authUser.js');
const sequelize = require("./models/database.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const response = await authUser.authUser(req, res);  
    if (response) {
      console.log('Login success..........');
       
    }
  } catch (error) {
    console.log('Server error...........', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

sequelize.sync({ alter: true, force: false }).then(async () => {
  console.log('Tables synced successfully (if needed)');
  await models.seedDefaultData();
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
