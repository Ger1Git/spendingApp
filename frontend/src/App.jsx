import './styles/styles.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Layout from './Layout';
import Dashboard from './Components/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Incomes from './Components/Incomes/Incomes';
// import Account from './Components/Account/Account';
import Login from './Components/Account/Login';
import Account from './Components/Account/MyAccount';
import Register from './Components/Account/Registration';
import AuthRoute from './Components/Account/AuthRoute';
import { useGlobalContext } from './context/globalContext';

function App() {
    const global = useGlobalContext();
    const scrollableRef = useRef(null);
    const isAuthenticated = !!Cookies.get('token');

    useEffect(() => {
        const handleScroll = () => {
            if (scrollableRef.current) {
                scrollableRef.current.classList.add('scrolling');

                clearTimeout(scrollableRef.current.scrollTimeout);
                scrollableRef.current.scrollTimeout = setTimeout(() => {
                    scrollableRef.current.classList.remove('scrolling');
                }, 1000);
            }
        };

        if (scrollableRef.current) {
            scrollableRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableRef.current) {
                scrollableRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
                    <Route path='/dashboard' element={<AuthRoute element={Dashboard} requireAuth={true} />} />
                    <Route path='/expenses' element={<AuthRoute element={Expenses} requireAuth={true} />} />
                    <Route path='/incomes' element={<AuthRoute element={Incomes} requireAuth={true} />} />
                    <Route path='/account' element={<AuthRoute element={Account} requireAuth={true} />} />
                    <Route path='/login' element={<AuthRoute element={Login} requireAuth={false} />} />
                    <Route path='/register' element={<AuthRoute element={Register} requireAuth={false} />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
