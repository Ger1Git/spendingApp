import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Link } from 'react-router-dom';
import Chart from './Chart';

const Dashboard = () => {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
    const combinedData = [...incomes, ...expenses];
    const [selectedChart, setSelectedChart] = useState('Total');

    const sortedData = combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        if (incomes.length === 0 || expenses.length === 0) {
            getIncomes();
            getExpenses();
        }
    }, []);

    const handleChartChange = (e) => {
        setSelectedChart(e.target.value);
    };

    return (
        <div className='flex flex-col justify-center gap-10 my-[50px]'>
            <div className='flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white min-h-[100px]'>
                <div className='text-center text-[30px]'>All transactions</div>
                <div className='flex justify-center mb-4'>
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
                    <div className='flex flex-col md:flex-row justify-center gap-[30px]'>
                        {selectedChart === 'Incomes' && <Chart data={incomes} label={'Income'} lineColor={'rgba(0, 128, 0)'} />}
                        {selectedChart === 'Expenses' && <Chart data={expenses} label={'Expense'} lineColor={'rgb(210, 4, 45)'} />}
                        {selectedChart === 'Total' && <Chart data={sortedData} label={'Total'} lineColor={'rgb(255, 255, 255)'} />}
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
