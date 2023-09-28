const express = require('express');
const userController = require('./controllers/user.controller');

// const findUserByEmail = require('./middlewares/findUserByEmail.middleware');

const app = express();
app.use(express.json());

app.use('/', userController);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
