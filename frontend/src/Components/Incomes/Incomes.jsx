import React, { useEffect } from 'react';
import Form from '../Form';
import { useGlobalContext } from '../../context/globalContext';
import { format } from 'date-fns';
import Item from '../Item';

const Incomes = () => {
    const { incomes, addIncome, getIncomes, setError } = useGlobalContext();

    useEffect(() => {
        if (incomes.length === 0) {
            getIncomes();
        }
    }, []);

    const handleAddIncome = async (income) => {
        try {
            await addIncome(income);
            await getIncomes();
        } catch (err) {
            setError(err.message || 'Failed to add income');
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center gap-10 my-[50px]'>
                <div className='text-center font-cursive text-[30px] mb-4'>Incomes</div>
                <div className='flex flex-col mx-[20px] md:flex-row justify-center gap-[30px]'>
                    <Form type={'Income'} onSubmit={handleAddIncome} />
                    <div className='order-1 md:order-2 flex flex-col gap-[15px] bg-blue-400 bg-opacity-40 max-h-[480px] lg:max-h-full p-5 rounded-md shadow-dark text-white overflow-hidden overflow-y-auto custom-scrollbar'>
                        {incomes && incomes.length ? (
                            incomes.map((income, index) => {
                                const { _id, title, amount, date, category, description } = income || {};
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
                                        transaction={'income'}
                                    />
                                );
                            })
                        ) : (
                            <p className='text-center text-[20px]'>No incomes added</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Incomes;
