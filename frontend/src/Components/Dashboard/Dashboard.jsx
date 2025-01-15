import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Item from '../Item';
import Chart from './Chart';

const Dashboard = () => {
    const { incomes, expenses, getIncomes, getExpenses, totalIncome, totalExpenses, totalBalance, transactionHistory } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const [selectedChart, setSelectedChart] = useState('Total');

    useEffect(() => {
        const fetchData = async () => {
            await getIncomes();
            await getExpenses();
            setLoading(false);
        };

        if (incomes.length === 0 || expenses.length === 0) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, []);

    const transactionHistoryItems = transactionHistory();

    const combinedData = [...incomes, ...expenses];

    const sortedData = combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const value = selectedChart === 'Incomes' ? totalIncome() : selectedChart === 'Expenses' ? totalExpenses() : totalBalance();

    const colorClass = value > 0 ? 'text-green-500' : 'text-red-500';

    const handleChartChange = (e) => {
        setSelectedChart(e.target.value);
    };

    const renderTransactionItems = (transactions) => {
        return transactions.length > 0 ? (
            transactions.map((transaction, index) => {
                const { _id, title, amount, date, category, description } = transaction;
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
                        transaction={category === 'income' ? 'income' : 'expense'}
                    />
                );
            })
        ) : (
            <p className='text-center text-[20px]'>No transactions in this category</p>
        );
    };

    return (
        <div className='flex flex-col justify-center gap-10 lg:my-[50px]'>
            <div className='flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white min-h-[100px]'>
                <div className='text-center text-[30px]'>All transactions</div>
                <div className='text-center text-[30px]'>
                    <span>{selectedChart === 'Incomes' ? 'Total Income: ' : selectedChart === 'Expenses' ? 'Total Expense: ' : 'Total Balance: '}</span>
                    <span className={colorClass}>{value} RON</span>
                </div>
                <div className='flex justify-center'>
                    <select
                        value={selectedChart}
                        onChange={handleChartChange}
                        className='bg-blue-400 bg-opacity-70 border text-white py-2 px-4 rounded-lg shadow-md hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-300'
                    >
                        <option value='Incomes'>Incomes</option>
                        <option value='Expenses'>Expenses</option>
                        <option value='Total'>Total</option>
                    </select>
                </div>
                {(incomes && incomes.length > 0) || (expenses && expenses.length > 0) ? (
                    <div className='flex flex-col lg:flex-row justify-center gap-[30px] mt-[20px]'>
                        {selectedChart === 'Incomes' && <Chart data={incomes} label={'Income'} lineColor={'rgba(0, 128, 0)'} />}
                        {selectedChart === 'Expenses' && <Chart data={expenses} label={'Expense'} lineColor={'rgb(210, 4, 45)'} />}
                        {selectedChart === 'Total' && <Chart data={sortedData} label={'Total'} lineColor={'rgb(255, 255, 255)'} />}

                        <div className='order-1 md:order-2 flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 max-h-[300px] lg:max-h-[450px] p-5 rounded-md shadow-dark text-white overflow-hidden overflow-y-auto custom-scrollbar'>
                            {!loading && selectedChart === 'Incomes'
                                ? renderTransactionItems(incomes)
                                : !loading && selectedChart === 'Expenses'
                                ? renderTransactionItems(expenses)
                                : !loading
                                ? renderTransactionItems(transactionHistoryItems)
                                : null}
                        </div>
                    </div>
                ) : (
                    <>
                        <p className='text-center text-[20px]'>No transactions yet</p>
                        <p className='text-center text-[20px]'>
                            To create a transaction go to the
                            <Link className='text-white hover:text-gray-300 cursor-pointer mx-2 underline' to='/incomes'>
                                Incomes
                            </Link>
                            or the
                            <Link className='text-white hover:text-gray-300 cursor-pointer mx-2 underline' to='/expenses'>
                                Expenses
                            </Link>
                            tab
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
