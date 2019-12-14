const express = require('express');
const helmet = require('helmet');

const dbRouter=require('./schema/db-router')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/project', dbRouter)
module.exports = server;
