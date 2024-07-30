const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { authenticateToken } = require('../middleware/auth');
const { login } = require('../controllers/login');
const { register } = require('../controllers/register');

const router = require('express').Router();

router
    .post('/login', login)
    .post('/register', register)
    .post('/add-income', authenticateToken, addIncome)
    .get('/get-incomes', authenticateToken, getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', authenticateToken, addExpense)
    .get('/get-expenses', authenticateToken, getExpenses)
    .delete('/delete-expense/:id', authenticateToken, deleteExpense);

module.exports = router;
