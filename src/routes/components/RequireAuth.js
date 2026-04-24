import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {selectAuthChecked, selectAuthData} from "../selectors/RoutesSelectors";

export default function RequireAuth({children}) {
    const authData = useSelector(selectAuthData);
    const authChecked = useSelector(selectAuthChecked);
    const location = useLocation();

    if (!authChecked) return null;

    if (!authData?.isAuthenticated) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    }

    return children;
}