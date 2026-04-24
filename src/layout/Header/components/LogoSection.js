import {Avatar, Box, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const LogoSection = () => {
    const navigate = useNavigate();

    const goHome = () => navigate('/');

    return (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5, ml: -1, pr: 2, cursor: 'pointer'}} onClick={goHome}>
            <Avatar
                src="/real-estate.png"
                alt="Cinema App"
                variant="rounded"
                sx={{width: 40, height: 40, backgroundColor: 'transparent', zIndex: 1000}}
            />
            <Box>
                <Typography variant="h6" sx={{fontWeight: 800, lineHeight: 1.1}}>
                    Real Estate
                </Typography>
            </Box>
        </Box>
    )
}

export default LogoSection;