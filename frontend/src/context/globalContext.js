import React, { useContext, useState, useCallback } from 'react';
import axios from 'axios';
import useRequestWithAuth from '../hooks/useRequestWithAuth';

const BASE_URL = 'http://localhost:5000/api/v1';

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
            getIncomes();
        } catch (err) {
            setError(err.message);
        }
    };

    const getIncomes = useCallback(async () => {
        try {
            const data = await request('/get-incomes');
            setIncomes(data);
        } catch (error) {
            setError(error.message);
        }
    }, [request]);

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-income/${id}`);
            getIncomes();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const addExpense = async (expense) => {
        try {
            await request('/add-expense', 'POST', expense);
            setSuccess('Expense successfully added');
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const getExpenses = useCallback(async () => {
        try {
            const data = await request('/get-expenses');
            setExpenses(data);
        } catch (error) {
            setError(error.message);
        }
    }, [request]);

    const deleteExpense = async (id) => {
        try {
            await request(`/delete-expense/${id}`, 'DELETE');
            getExpenses();
        } catch (error) {
            setError(error.message);
        }
    };

    const totalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

    const totalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return history;
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                deleteIncome,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
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