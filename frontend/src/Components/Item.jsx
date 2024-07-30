import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { GiWallet } from 'react-icons/gi';
import { ImBin } from 'react-icons/im';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaCommentDollar } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';

const Item = ({ _id, title, amount, date, category, description, index, transaction }) => {
    const { deleteIncome, deleteExpense } = useGlobalContext();
    const [isTransformed, setIsTransformed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newAmount, setNewAmount] = useState(amount);
    const [newDate, setNewDate] = useState(date);

    const buttonTransition = () => {
        setIsTransformed(!isTransformed);
    };

    return (
        <div className={`flex justify-between items-center md:gap-[20px] lg:gap-[100px] p-3 border-2 rounded-md shadow-dark overflow-hidden`}>
            <div className='flex gap-3 items-center flex-grow'>
                <GiWallet size={30} />
                <div className='flex flex-col'>
                    {!isEditing ? (
                        <>
                            <div>{title}</div>
                            <div className='flex gap-3'>
                                <div className='flex items-center gap-1'>
                                    <FaMoneyBillAlt /> {amount} RON
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaCalendarDays />
                                    {date}
                                </div>
                                {description && (
                                    <div className='flex items-center gap-1'>
                                        <FaCommentDollar />
                                        {description}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <label>Change title</label>
                            <input value={newTitle} type='text' onChange={(e) => setNewTitle(e.target.value)} />
                            <div className='flex gap-3'>
                                <div className='flex items-center gap-1'>
                                    <FaMoneyBillAlt />
                                    <input value={newAmount} type='text' onChange={(e) => setNewAmount(e.target.value)} /> RON
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaCalendarDays />
                                    <DatePicker
                                        id='date'
                                        placeholderText='Enter a date'
                                        selected={newDate}
                                        dateFormat='dd/MM/yyyy'
                                        className='p-1 rounded-md shadow-dark border-2 border-blue-400 w-full'
                                        onChange={(date) => {
                                            setNewDate('date', date);
                                        }}
                                    />
                                    {date}
                                </div>
                                {description && (
                                    <div className='flex items-center gap-1'>
                                        <FaCommentDollar />
                                        {description}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`relative transition-transform duration-300 flex gap-[10px] ${isTransformed ? 'transform translate-x-[-80px]' : ''}`}>
                <FaEdit size={20} className='hover:text-black cursor-pointer' />
                <ImBin size={20} className='hover:text-red-500 transition-colors duration-300 cursor-pointer' onClick={buttonTransition} />
                <div className='flex flex-col items-center gap-[2px] absolute top-[-100%] left-[130%]'>
                    Delete?
                    <div className='flex items-center gap-[10px]'>
                        <button
                            className='bg-blue-500 hover:bg-red-500 text-white font-bold p-1 rounded'
                            onClick={() => (transaction === 'income' ? deleteIncome(_id) : deleteExpense(_id))}
                        >
                            Yes
                        </button>
                        <button className='bg-blue-500 hover:bg-red-500 text-white font-bold p-1 rounded' onClick={buttonTransition}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
