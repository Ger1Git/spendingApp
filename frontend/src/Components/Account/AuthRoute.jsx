import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRoute = ({ element: Component, requireAuth }) => {
    const token = Cookies.get('token');

    if (requireAuth) {
        return token ? <Component /> : <Navigate to='/login' />;
    } else {
        return token ? <Navigate to='/account' /> : <Component />;
    }
};

export default AuthRoute;
