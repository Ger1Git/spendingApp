import React, { useEffect } from 'react';
import Form from '../Form';
import { useGlobalContext } from '../../context/globalContext';
import { format } from 'date-fns';
import Item from '../Item';

const Expenses = () => {
    const { expenses, getExpenses, addExpense, setExpensesError } = useGlobalContext();

    useEffect(() => {
        if (expenses.length === 0) {
            getExpenses();
        }
    }, [expenses.length, getExpenses]);

    const handleAddIncome = async (expense) => {
        try {
            await addExpense(expense);
            await getExpenses();
        } catch (err) {
            setExpensesError(err.message || 'Failed to add expense');
        }
    };

    return (
        <>
            <div className='flex flex-col lg:my-[50px] gap-[15px] bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white min-h-[100px]'>
                <div className='text-center font-serif text-[30px] lg:text-[45px] mb-4'>Expenses</div>
                <div className='flex flex-col lg:max-h-[600px] mx-[20px] md:flex-row justify-center gap-[30px]'>
                    <Form type={'Expense'} onSubmit={handleAddIncome} />
                    <div className='order-1 md:order-2 flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 max-h-[480px] lg:max-h-full p-5 rounded-md shadow-dark text-white overflow-hidden overflow-y-auto custom-scrollbar'>
                        {expenses && expenses.length ? (
                            expenses.map((expense, index) => {
                                if (!expense) return null;

                                const { _id, title, amount, date, category, description } = expense || {};
                                let formattedDate = format(new Date(date), 'dd/MM/yyyy');

                                return (
                                    <Item
                                        _id={_id}
                                        key={_id}
                                        title={title}
                                        amount={amount}
                                        date={formattedDate}
                                        category={category}
                                        description={description}
                                        index={index}
                                        transaction={'expense'}
                                    />
                                );
                            })
                        ) : (
                            <p className='text-center text-[20px]'>No expenses added</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Expenses;
