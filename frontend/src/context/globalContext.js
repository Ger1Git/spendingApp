import React, { useContext, useState, useCallback } from 'react';
import axios from 'axios';
import useRequestWithAuth from '../hooks/useRequestWithAuth';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const GlobalContext = React.createContext();

export const Provider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { request } = useRequestWithAuth();

    const addIncome = async (income) => {
        try {
            await request('/add-income', 'POST', income);
            setSuccess('Income successfully added');
            setError('');
            getIncomes();
        } catch (err) {
            setError(err.message);
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const data = await request('/get-incomes');
            setError('');
            setIncomes(data);
        } catch (error) {
            setError(error.message);
        }
    }, [request]);

    const deleteIncome = async (id) => {
        try {
            await request(`/delete-income/${id}`, 'DELETE');
            setError('');
            setSuccess('Income successfully deleted');
            getIncomes();
        } catch (error) {
            setError(error.message);
        }
    };

    const updateIncome = async (id, data) => {
        try {
            const response = await request(`/update-income/${id}`, 'PUT', data);
            return response;
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const addExpense = async (expense) => {
        try {
            await request('/add-expense', 'POST', expense);
            setSuccess('Expense successfully added');
            setError('');
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const getExpenses = useCallback(async () => {
        try {
            const data = await request('/get-expenses');
            setError('');
            setExpenses(data);
        } catch (error) {
            setError(error.message);
        }
    }, [request]);

    const deleteExpense = async (id) => {
        try {
            await request(`/delete-expense/${id}`, 'DELETE');
            setError('');
            setSuccess('Expense successfully deleted');
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const updateExpense = async (id, data) => {
        try {
            const response = await request(`/update-expense/${id}`, 'PUT', data);
            return response;
        } catch (error) {
            setError(error.response.data.message);
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
                success,
                error,
                setSuccess,
                setError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
