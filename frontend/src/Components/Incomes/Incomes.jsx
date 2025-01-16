import React, { useEffect } from 'react';
import Form from '../Form';
import { useGlobalContext } from '../../context/globalContext';
import { format } from 'date-fns';
import Item from '../Item';

const Incomes = () => {
    const { incomes, addIncome, getIncomes, setIncomesError } = useGlobalContext();

    useEffect(() => {
        if (incomes.length === 0) {
            getIncomes();
        }
    }, [incomes.length, getIncomes]);

    const handleAddIncome = async (income) => {
        try {
            await addIncome(income);
            await getIncomes();
        } catch (err) {
            setIncomesError(err.message || 'Failed to add income');
        }
    };

    return (
        <>
            <div className='flex flex-col lg:my-[50px] gap-[15px] bg-blue-400 bg-opacity-40 p-5 rounded-md shadow-dark text-white min-h-[100px]'>
                <div className='text-center font-serif text-shadow-lg text-[30px] lg:text-[40px] mb-4'>Incomes</div>
                <div className='flex flex-col lg:max-h-[600px] mx-[20px] md:flex-row justify-center gap-[30px]'>
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
