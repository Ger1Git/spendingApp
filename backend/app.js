const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').forEach((route) => {
    app.use('/api/v1', require('./routes/' + route));
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port', PORT);
    });
};

server();
