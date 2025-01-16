import { Router } from 'express';
import { addExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/expense.js';
import { addIncome, getIncomes, deleteIncome, updateIncome } from '../controllers/income.js';
import { authenticateToken } from '../middleware/auth.js';
import { login } from '../controllers/login.js';
import { register } from '../controllers/register.js';

const router = Router();

router
    .post('/login', login)
    .post('/register', register)
    .post('/add-income', authenticateToken, addIncome)
    .get('/get-incomes', authenticateToken, getIncomes)
    .delete('/delete-income/:id', authenticateToken, deleteIncome)
    .put('/update-income/:id', authenticateToken, updateIncome)
    .post('/add-expense', authenticateToken, addExpense)
    .get('/get-expenses', authenticateToken, getExpenses)
    .delete('/delete-expense/:id', authenticateToken, deleteExpense)
    .put('/update-expense/:id', authenticateToken, updateExpense);

export default router;
