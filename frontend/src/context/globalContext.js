import React, { useContext, useState, useCallback } from 'react';
import useRequestWithAuth from '../hooks/useRequestWithAuth';

const GlobalContext = React.createContext();

export const Provider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [successIncomes, setSuccessIncomes] = useState('');
    const [successExpenses, setSuccessExpenses] = useState('');
    const [incomesError, setIncomesError] = useState('');
    const [expensesError, setExpensesError] = useState('');
    const { request } = useRequestWithAuth();

    const addIncome = async (income) => {
        try {
            await request('/add-income', 'POST', income);
            setSuccessIncomes('Income successfully added');
            setIncomesError('');
            getIncomes();
        } catch (err) {
            setIncomesError(err.message);
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const data = await request('/get-incomes');
            setIncomesError('');
            setIncomes(data);
        } catch (error) {
            setIncomesError(error.message);
        }
    }, [request]);

    const deleteIncome = async (id) => {
        try {
            await request(`/delete-income/${id}`, 'DELETE');
            setIncomesError('');
            setSuccessIncomes('Income successfully deleted');
            getIncomes();
        } catch (error) {
            setIncomesError(error.message);
        }
    };

    const updateIncome = async (id, data) => {
        try {
            const response = await request(`/update-income/${id}`, 'PUT', data);
            return response;
        } catch (error) {
            setIncomesError(error.response.data.message);
        }
    };

    const addExpense = async (expense) => {
        try {
            await request('/add-expense', 'POST', expense);
            setSuccessExpenses('Expense successfully added');
            setExpensesError('');
            getExpenses();
        } catch (error) {
            setExpensesError(error.message);
        }
    };

    const getExpenses = useCallback(async () => {
        try {
            const data = await request('/get-expenses');
            setExpensesError('');
            setExpenses(data);
        } catch (error) {
            setExpensesError(error.message);
        }
    }, [request]);

    const deleteExpense = async (id) => {
        try {
            await request(`/delete-expense/${id}`, 'DELETE');
            setExpensesError('');
            setSuccessExpenses('Expense successfully deleted');
            getExpenses();
        } catch (error) {
            setExpensesError(error.message);
        }
    };

    const updateExpense = async (id, data) => {
        try {
            const response = await request(`/update-expense/${id}`, 'PUT', data);
            return response;
        } catch (error) {
            setExpensesError(error.response.data.message);
        }
    };

    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
        });

        return history;
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                deleteIncome,
                updateIncome,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                updateExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                incomes,
                expenses,
                successIncomes,
                incomesError,
                setSuccessIncomes,
                setIncomesError,
                expensesError,
                successExpenses,
                setSuccessExpenses,
                setExpensesError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
