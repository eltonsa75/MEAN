const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allowCors = require('./cors')

// Configuração do middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(allowCors)

// Início do servidor
server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server