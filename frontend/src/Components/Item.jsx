import React, { useState, useEffect } from 'react';
import { parse, isValid, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { GiWallet } from 'react-icons/gi';
import { ImBin } from 'react-icons/im';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaCommentDollar } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { useGlobalContext } from '../context/globalContext';

const Item = ({ _id, title, amount, date, category, description, transaction }) => {
    const { deleteIncome, deleteExpense, updateIncome, updateExpense } = useGlobalContext();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newCategory, setNewCategory] = useState(category);
    const [newAmount, setNewAmount] = useState(amount);
    const [newDate, setNewDate] = useState(date ? parse(date, 'dd/MM/yyyy', new Date()) : new Date());
    const [newDescription, setNewDescription] = useState(description);

    // Track original values
    const [originalValues, setOriginalValues] = useState({
        title,
        category,
        amount,
        date: date ? parse(date, 'dd/MM/yyyy', new Date()) : new Date(),
        description
    });

    useEffect(() => {
        // Update original values when item properties change
        setOriginalValues({
            title,
            category,
            amount,
            date: date ? parse(date, 'dd/MM/yyyy', new Date()) : new Date(),
            description
        });
    }, [title, category, amount, date, description]);

    useEffect(() => {
        if (isEditing) {
            // Save current values when editing starts
            setOriginalValues({
                title: newTitle,
                category: newCategory,
                amount: newAmount,
                date: newDate,
                description: newDescription
            });
        }
    }, [isEditing]);

    const updateNewIncome = async () => {
        try {
            const updatedIncome = await updateIncome(_id, {
                title: newTitle,
                amount: newAmount,
                date: newDate,
                category: newCategory,
                description: newDescription
            });
            setNewTitle(updatedIncome.title);
            setNewAmount(updatedIncome.amount);
            setNewDate(updatedIncome.date);
            setNewCategory(updatedIncome.category);
            setNewDescription(updatedIncome.description);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const updateNewExpense = async () => {
        try {
            const updatedExpense = await updateExpense(_id, {
                title: newTitle,
                amount: newAmount,
                date: newDate,
                category: newCategory,
                description: newDescription
            });
            setNewTitle(updatedExpense.title);
            setNewAmount(updatedExpense.amount);
            setNewDate(updatedExpense.date);
            setNewCategory(updatedExpense.category);
            setNewDescription(updatedExpense.description);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const revertChanges = () => {
        setNewTitle(originalValues.title);
        setNewAmount(originalValues.amount);
        setNewDate(originalValues.date);
        setNewCategory(originalValues.category);
        setNewDescription(originalValues.description);
        setIsEditing(false);
    };

    return (
        <div className='flex justify-between items-center gap-[20px] lg:gap-[100px] h-[80px] flex-shrink-0 p-3 border-2 rounded-md shadow-dark overflow-hidden'>
            <div className='flex gap-3 items-center flex-grow flex-shrink-0'>
                <GiWallet size={30} />
                <div className='flex flex-col gap-1'>
                    {!isEditing ? (
                        <>
                            <div>{`${newTitle} (${newCategory})`}</div>
                            <div className='flex gap-3'>
                                <div className={`flex items-center gap-1 ${newAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    <FaMoneyBillAlt /> {newAmount} RON
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaCalendarDays />
                                    {format(newDate, 'dd/MM/yyyy')}
                                </div>
                                {newDescription && (
                                    <div className='flex items-center gap-1'>
                                        <FaCommentDollar />
                                        {newDescription}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex gap-3'>
                                <div className='flex items-center gap-1'>
                                    <label>Title</label>
                                    <input
                                        value={newTitle}
                                        type='text'
                                        className='py-0.5 px-1 rounded-md shadow-dark border-2 border-blue-400 w-40 text-sm font-medium text-gray-700'
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className='flex items-center gap-1'>
                                    <label>Category</label>
                                    <input
                                        value={newCategory}
                                        type='text'
                                        className='py-0.5 px-1 rounded-md shadow-dark border-2 border-blue-400 w-40 text-sm font-medium text-gray-700'
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-3 mt-[5px]'>
                                <div className='flex items-center gap-1'>
                                    <FaMoneyBillAlt />
                                    <input
                                        value={newAmount}
                                        type='number'
                                        pattern='[0-9]*'
                                        inputMode='numeric'
                                        className='py-0.5 px-1 rounded-md shadow-dark border-2 border-blue-400 w-20 text-sm font-medium text-gray-700 text-center'
                                        onChange={(e) => setNewAmount(e.target.value)}
                                    />
                                    RON
                                </div>
                                <div className='flex items-center gap-1'>
                                    <FaCalendarDays />
                                    <DatePicker
                                        id='date'
                                        selected={newDate}
                                        dateFormat='dd/MM/yyyy'
                                        className='py-0.5 px-1 rounded-md shadow-dark border-2 border-blue-400 w-[6rem] text-sm font-medium text-gray-700 text-center'
                                        onChange={(date) => setNewDate(date)}
                                    />
                                </div>
                                {description && (
                                    <div className='flex items-center gap-1'>
                                        <FaCommentDollar />
                                        <input
                                            value={newDescription}
                                            type='text'
                                            className='py-0.5 px-1 rounded-md shadow-dark border-2 border-blue-400 w-30 text-sm font-medium text-gray-700'
                                            onChange={(e) => setNewDescription(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`relative transition-transform duration-300 flex gap-[10px] ${isEditing || isDeleting ? 'transform translate-x-[-80px]' : ''}`}>
                <FaEdit
                    size={20}
                    className={`transition duration-300 ${
                        isDeleting
                            ? 'opacity-0 translate-x-[40px] cursor-default'
                            : isEditing
                            ? 'opacity-0 md:opacity-100 translate-x-[30px] cursor-default'
                            : 'translate-x-0 cursor-pointer hover:text-black '
                    }`}
                    onClick={() => setIsEditing(true)}
                />
                <ImBin
                    size={20}
                    className={`transition duration-300 
                        ${
                            isEditing
                                ? 'opacity-0 translate-x-[40px] cursor-default'
                                : isDeleting
                                ? 'translate-y-[-100px] md:translate-y-0 cursor-default'
                                : 'translate-x-0 cursor-pointer hover:text-red-500'
                        }`}
                    onClick={() => setIsDeleting(true)}
                />
                <div className='flex flex-col items-center gap-[2px] absolute top-[-100%] left-[130%]'>
                    {isEditing ? (
                        <>
                            <span>Save?</span>
                            <div className='flex items-center gap-[10px]'>
                                <button
                                    className='bg-blue-500 hover:bg-green-500 text-white font-bold p-1 rounded'
                                    onClick={() => (transaction === 'income' ? updateNewIncome(_id) : updateNewExpense(_id))}
                                >
                                    Yes
                                </button>
                                <button className='bg-blue-500 hover:bg-red-500 text-white font-bold p-1 rounded' onClick={revertChanges}>
                                    No
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span>Delete?</span>
                            <div className='flex items-center gap-[10px]'>
                                <button
                                    className='bg-blue-500 hover:bg-red-500 text-white font-bold p-1 rounded'
                                    onClick={() => (transaction === 'income' ? deleteIncome(_id) : deleteExpense(_id))}
                                >
                                    Yes
                                </button>
                                <button className='bg-blue-500 hover:bg-red-500 text-white font-bold p-1 rounded' onClick={() => setIsDeleting(false)}>
                                    No
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Item;
