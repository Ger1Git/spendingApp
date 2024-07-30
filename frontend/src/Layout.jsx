import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation';

const Layout = ({ active, setActive, setUnderlineStyle, underlineStyle, navRef }) => {
    return (
        <div className='bg-turqoise relative flex flex-col min-h-screen'>
            <Navigation active={active} setActive={setActive} setUnderlineStyle={setUnderlineStyle} underlineStyle={underlineStyle} navRef={navRef} />
            <div className='flex justify-center'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
