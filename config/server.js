'use strict';


const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
const consign = require('consign');
const cors = require('cors');


server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors({origin: '*'}));

// // Permitir comunicação entre servidores distintos | bypass segurança contra
// server.use(function(req, res, next) {
//      res.header("Access-Control-Allow-Origin", "*");
//      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//      next();
// });

// Incluir rotas e configurações automaticamente
consign()
  .include('./config/firebaseConfig.js')
  .then('./app/routes')
  .into(server);

module.exports = server;
