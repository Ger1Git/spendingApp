const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT;

const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = {
    origin: function (origin, callback) {
        console.log('Request Origin:', origin);
        console.log('Frontend URL:', frontendUrl);
        if (origin === frontendUrl || !origin) {
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
const routes = require('./routes/routes');

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/test', (req, res) => {
    res.send(`The frontend url for CORS is ${frontendUrl}`);
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port', PORT);
    });
};

server();
