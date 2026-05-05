import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {selectAuthChecked, selectAuthData} from "../selectors/RoutesSelectors";

const RequireRole = ({role, roles, children}) => {
    const authData = useSelector(selectAuthData);
    const authChecked = useSelector(selectAuthChecked);
    const location = useLocation();

    if (!authChecked) return null;

    if (!authData?.isAuthenticated) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    }

    const allowedRoles = roles ?? (role ? [role] : []);
    const userRoles = authData?.roles ?? [];
    const hasRequiredRole = allowedRoles.some((allowedRole) => userRoles.includes(allowedRole));

    if (!hasRequiredRole) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    return children;
}

export default RequireRole;