import React from 'react';
import {Box, CssBaseline,} from '@mui/material';
import Header from "./Header/containers/Header";
import MenuBar from "./MenuBar/containers/MenuBar";


export default function MainLayout({children}) {

    return (
        <Box sx={{display: 'flex', minHeight: '100vh', bgcolor: 'background.default'}}>
            <CssBaseline/>

            <Header/>

            {/* Drawer */}
            <MenuBar/>

            {/* Main */}
            <Box
                component="main"
                sx={{
                    flex: 1,
                    p: {xs: 2, sm: 3},
                    pt: {xs: 10, sm: 11},
                    pb: {xs: 10, md: 3},
                }}
            >
                {children}
            </Box>

            {/* Bottom Navigation (mobile) */}
            {/*{!isDesktop && (*/}
            {/*    <MenuBarMobile/>*/}
            {/*)}*/}
        </Box>
    );
}