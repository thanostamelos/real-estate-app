import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {selectAuthChecked, selectAuthData} from "../selectors/RoutesSelectors";

export default function RequireGuest({children, allowAuth}) {
    const authData = useSelector(selectAuthData);
    const authChecked = useSelector(selectAuthChecked);
    const location = useLocation();

    if (!authChecked && !allowAuth) return null;

    if (authData?.isAuthenticated && !allowAuth) {
        const redirectTo = location.state?.from?.pathname ?? '/';
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}