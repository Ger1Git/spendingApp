import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { Link } from 'react-router-dom';
import Chart from './Chart';

const Dashboard = () => {
    const { incomes, getIncomes } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <div className='flex flex-col justify-center gap-10 my-[50px]'>
            <div className='text-center text-[30px] mb-4'>All transactions</div>
            <div className='flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white min-h-[100px]'>
                {incomes && incomes.length > 0 ? (
                    <Chart data={incomes} />
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
