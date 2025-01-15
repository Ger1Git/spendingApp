const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
const routes = require('./routes/routes');

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port', PORT);
    });
};

server();
