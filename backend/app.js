import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db/db.js';
import routes from './routes/routes.js';
import mongoose from 'mongoose';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT = process.env.PORT;

const app = express();

const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = {
    origin: function (origin, callback) {
        if (origin?.includes(frontendUrl) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy: This origin is not allowed by CORS.'));
        }
    },
    credentials: true
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/test', (req, res) => {
    const state = mongoose.connection.readyState;
    const status = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    res.send(`The frontend url for CORS is ${frontendUrl} and the database connections status is: ${status[state]}`);
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port', PORT);
    });
};

server();
