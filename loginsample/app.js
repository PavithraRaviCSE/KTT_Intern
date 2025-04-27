const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config');
const User = require('./models/user');
const authRoutes = require('./api/auth'); 

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login');  
});

app.use('/api', authRoutes);

sequelize.sync({ force: true }).then(async () => {
  await User.create({ username: 'pavi', password: '1234' }); 

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
