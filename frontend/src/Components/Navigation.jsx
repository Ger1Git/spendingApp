import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { PiSignOut } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import { FaChevronRight } from 'react-icons/fa';
import { IoIosArrowDropright } from 'react-icons/io';
import { navItems } from '../utils/utils';
import Cookies from 'js-cookie';
import logo from '../images/logo.svg';

const Navigation = () => {
    const location = useLocation();
    const [nav, setNav] = useState(false);
    const [active, setActive] = useState(location.pathname);
    const [underlineStyle, setUnderlineStyle] = useState({ transform: 'translateX(0)', width: 0 });
    const navRef = useRef(null);
    const navigate = useNavigate();
    const isAuthenticated = !!Cookies.get('token');

    const handleLogout = () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            setNav((displayNav) => !displayNav);
        }

        Cookies.remove('token');
        navigate('/login');
    };

    useEffect(() => {
        if (navRef.current) {
            const currentRoute = navItems.find((route) => route.link === location.pathname);
            const activeItem = navRef.current.querySelector(`.navItem-${currentRoute?.id}`);
            if (activeItem) {
                setUnderlineStyle({
                    transform: `translateX(${activeItem.offsetLeft}px)`,
                    width: activeItem.offsetWidth
                });
            }
        }
    }, [active, location.pathname]);

    return (
        <div className='sticky top-0 left-0 z-10 w-full flex justify-between items-center h-21 mx-auto px-4 text-white bg-blue-400 shadow-md'>
            <div className='flex justify-center items-center flex-col cursor-pointer py-[5px]'>
                <div className='w-[60px] h-[35px] lg:w-[100px] lg:h-[60px] rounded-full overflow-hidden relative'>
                    <img src={logo} alt='Not loaded' className='h-100 w-50 object-cover'></img>
                </div>
                <div className='text-white font-cursive text-sm lg:text-lg'>Spending Tracker</div>
            </div>
            {isAuthenticated && (
                <>
                    <div className='hidden md:block relative'>
                        <ul ref={navRef} className='flex font-cursive'>
                            {navItems.map((item) => (
                                <li
                                    key={item?.id}
                                    className={`px-4 mx-4 py-2 text-xl relative navItem navItem-${item?.id} ${active === item?.link ? 'active' : ''}`}
                                    onClick={() => setActive(item?.link)}
                                >
                                    <Link className='text-white hover:text-gray-300 cursor-pointer' to={item?.link}>
                                        {item?.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className='custom-underline' style={underlineStyle}></div>
                    </div>
                    <div className='hidden md:flex'>
                        <VscAccount size={30} className='mr-4 cursor-pointer hover:scale-110' onClick={() => navigate('/account')} />
                        <PiSignOut size={30} className='cursor-pointer hover:scale-110 hover:text-red-500' onClick={handleLogout} />
                    </div>
                    <div onClick={() => setNav((displayNav) => !displayNav)} className='block md:hidden cursor-pointer'>
                        <AiOutlineMenu size={20} />
                    </div>
                    <div
                        className={`md:hidden top-0 left-0 w-full h-full bg-black transition-opacity duration-500 bg-opacity-50 ${
                            nav ? 'fixed opacity-100' : 'hidden opacity-0'
                        }`}
                        onClick={() => setNav((displayName) => !displayName)}
                    ></div>
                    <div
                        className={`flex md:hidden flex-col justify-between fixed top-0 left-0 shadow-dark transition-transform duration-500 ease-in-out w-[50%] h-full bg-blue-400 z-3 ${
                            nav ? 'translate-x-full' : 'translate-x-[200%]'
                        }`}
                    >
                        <ul>
                            {navItems.map((item) => (
                                <li key={item?.id} className='p-2 m-4'>
                                    <Link
                                        className='text-white hover:text-gray-300 cursor-pointer flex justify-between items-center'
                                        to={item?.link}
                                        onClick={() => setNav((displayNav) => !displayNav)}
                                    >
                                        {item?.label}
                                        <FaChevronRight />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className='p-2 m-4'>
                            <Link className='text-white flex items-center w-full mb-3' to={'/account'} onClick={() => setNav((displayNav) => !displayNav)}>
                                <VscAccount size={24} />
                                <span className='pl-4'>Account</span>
                            </Link>
                            <button className='text-whit flex items-center w-full' onClick={handleLogout}>
                                <PiSignOut size={24} />
                                <span className='pl-4'>Sign out</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navigation;
