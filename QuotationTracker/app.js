const express = require('express');
const models = require('./models/index.js');
const userRouter = require('./api/user/index.js');
const userRoleRouter = require('./api/userrole/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/user", userRouter);
app.use("/api/userRole", userRoleRouter);

models.sync().then(() =>{
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});

