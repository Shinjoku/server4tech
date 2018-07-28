'use strict';


const server = require('./config/server');
const express = require('express');
const port = process.env.PORT || 8000;

server.use('/vjobs', express.static(__dirname + '/app/static'));

server.get('/', async (req, res) => {
    return res.redirect(`http://localhost:${port}/vjobs`);
});

server.listen(port, () => {
    console.log(`A mágica ta rolando na porta ${port}`);
});
