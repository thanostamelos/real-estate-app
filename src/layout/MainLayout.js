import React from 'react';
import {Box, CssBaseline,} from '@mui/material';
import Header from "./Header/containers/Header";
import Footer from "./Footer/containers/Footer";

export default function MainLayout({children}) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <CssBaseline/>

            <Header/>

            {/* Main */}
            <Box
                sx={{
                    flex: 1, // 🔥 αυτό κάνει το footer να πάει κάτω
                    p: { xs: 2, sm: 3 },
                    pt: { xs: 10, sm: 11 },
                }}
            >
                {children}
            </Box>

            <Footer/>
        </Box>
    );
}