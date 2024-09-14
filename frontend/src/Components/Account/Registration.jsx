import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../context/auth';
import { useGlobalContext } from '../../context/globalContext';
import { MdError } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

const Register = () => {
    const { getIncomes, getExpenses } = useGlobalContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerMutation.mutateAsync({ username, password, email });
            await getIncomes();
            await getExpenses();
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <div className='mt-[70px] order-2 lg:order-1 bg-blue-400 bg-opacity-40 p-7 rounded-md shadow-dark text-white w-[300px] md:w-[500px]'>
            <form onSubmit={handleRegister} className='text-black flex flex-col justify-center'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Register</h1>
                {error && (
                    <div className='flex items-center mb-2'>
                        <MdError className='mr-2 h-5 w-5' color={'#b30404'} />
                        <span>{error}</span>
                    </div>
                )}
                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-700'>
                    Username
                </label>
                <div className='flex items-center mb-4 p-1 rounded-md shadow-dark bg-white w-full focus-within:ring-2 focus-within:ring-blue-400'>
                    <FaRegUser className='mx-2' />
                    <input
                        type='text'
                        value={username}
                        name='username'
                        placeholder='Enter your username'
                        className='p-1 border-0 w-full rounded-md focus:ring-0 focus:outline-none'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-700'>
                    Email address
                </label>
                <div className='flex items-center mb-4 p-1 rounded-md shadow-dark bg-white w-full focus-within:ring-2 focus-within:ring-blue-400'>
                    <RiLockPasswordLine className='mx-2' />
                    <input
                        type='email'
                        value={email}
                        name='email'
                        placeholder='Enter your email address'
                        className='p-1 border-0 w-full rounded-md focus:ring-0 focus:outline-none'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-700'>
                    Password
                </label>
                <div className='flex items-center mb-4 p-1 rounded-md shadow-dark bg-white w-full focus-within:ring-2 focus-within:ring-blue-400'>
                    <RiLockPasswordLine className='mx-2' />
                    <input
                        type='password'
                        value={password}
                        name='password'
                        placeholder='Enter your password'
                        className='p-1 border-0 w-full rounded-md focus:ring-0 focus:outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    disabled={registerMutation.isLoading}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex justify-center items-center my-2'
                >
                    {registerMutation.isLoading ? 'Creating the account...' : 'Register'}
                </button>
            </form>
            <div className='text-center text-black'>
                <span>Already have an account?</span>
                <Link className='text-blue-700 cursor-pointer ml-2 hover:text-blue-900' to={'/login'}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
