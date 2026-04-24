import React from 'react';
import {Box, Paper, Stack} from '@mui/material';
import AuthCreateAccount from "../components/AuthCreateAccount/AuthCreateAccount";
import AuthLogin from "../components/AuthLogin/AuthLogin";

const Auth = ({mode = 'login'}) => {

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '6px',
            p: 4
        }}>
            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    borderRadius: 3,

                    width: {xs: '100%', sm: 420},
                    maxWidth: 500,

                    minWidth: 0,
                    boxSizing: 'border-box',

                    mx: {xs: 2, sm: 0},

                    minHeight: 280,
                    maxHeight: 500,
                    height: 'auto',
                }}
            >
                <Stack spacing={2}>
                    {mode === 'signup' ? <AuthCreateAccount/> : <AuthLogin/>}
                </Stack>
            </Paper>
        </Box>
    )
};

export default Auth;