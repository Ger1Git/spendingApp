import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../context/auth';
import { MdError } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginMutation.mutateAsync({ username, password });
            navigate('/dashboard');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className='mt-[70px] order-2 lg:order-1 bg-blue-400 bg-opacity-40 p-7 rounded-md shadow-dark text-white w-[300px] md:w-[500px]'>
            <form onSubmit={handleLogin} className='text-black flex flex-col justify-center'>
                <h1 className='text-3xl font-bold mb-[35px] mt-[15px] text-center'>Login</h1>
                {error && (
                    <div className='flex items-center mb-2 bg-gray-100 rounded-md p-2'>
                        <MdError className='mr-2 h-8 w-8' color={'#b30404'} />
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
                    disabled={loginMutation.isLoading}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex justify-center items-center mt-8'
                >
                    {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className='text-center text-black mt-4'>
                <span>Don't have an account?</span>
                <Link className='text-blue-700 cursor-pointer ml-2 hover:text-blue-900' to={'/register'}>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
