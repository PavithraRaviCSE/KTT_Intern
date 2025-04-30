const express = require('express');
const models = require('./models/index.js');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api", require('./api/index.js'));

async function startServer() {
  await models.sync();
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
  
}

startServer();


