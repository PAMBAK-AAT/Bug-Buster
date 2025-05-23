

import React from 'react';
import {Navigate} from 'react-router-dom';

import {isLoggedIn} from '../utils/auth'; // Importing the isLoggedIn function

const PrivateRoute = ( {children} ) => {
    return isLoggedIn() ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;