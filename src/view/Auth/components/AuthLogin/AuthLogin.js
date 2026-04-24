import React from 'react';
import {Typography} from '@mui/material';
import AuthLoginStandard from "./AuthLoginStandard";
import AuthLoginGoogle from "./AuthLoginGoogle";
import {useNavigate} from "react-router-dom";

const AuthLogin = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="h5" sx={{fontWeight: 900}}>Login</Typography>
                <Typography
                    variant="h6"
                    fontSize={12}
                    sx={{textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={() => navigate('/signup')}
                >
                    Create account
                </Typography>
            </div>

            {/* STANDARD LOGIN*/}
            <AuthLoginStandard/>

            {/* GOOGLE LOGIN*/}
            <AuthLoginGoogle/>
        </>
    )
};

export default AuthLogin;