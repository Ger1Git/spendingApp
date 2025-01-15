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
const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const authRoutes = require('./routes/auth');

app.use('/api/v1', expenseRoutes);
app.use('/api/v1', incomeRoutes);
app.use('/api/v1', authRoutes);

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port', PORT);
    });
};

server();
