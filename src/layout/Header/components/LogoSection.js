import {Avatar, Box, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const LogoSection = () => {
    const navigate = useNavigate();

    const goHome = () => navigate('/');

    return (
        <Box
            onClick={goHome}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                px: 1.5,
                py: 1,
                borderRadius: "14px",
                transition: "all 0.25s ease",
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                    transform: "translateY(-1px)",
                },
            }}
        >
            {/* Logo container */}
            <Box
                sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <Avatar
                    src="/real-estate.png"
                    alt="Real Estate App"
                    variant="rounded"
                    sx={{width: 70, height: 70, backgroundColor: 'transparent', zIndex: 1000}}
                />
            </Box>

            {/* Text */}
            <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 800,
                        letterSpacing: "-0.3px",
                    }}
                >
                    Real Estate
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                    }}
                >
                    Find your next home
                </Typography>
            </Box>
        </Box>
    )
}

export default LogoSection;