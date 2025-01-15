const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

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
