import React from 'react';
import {useTheme} from "@mui/material/styles";

export default function Home() {
    const theme = useTheme();

    return (
        <div style={{
            minHeight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 40,
            color: theme.palette.text.default,
            backgroundColor: theme.palette.background.default,
        }}>
            <div style={{
                background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.85)',
                backdropFilter: "blur(12px)",
                borderRadius: 20,
                padding: 40,
                width: "100%",
                maxWidth: 700,
                textAlign: "center",
                boxShadow:
                    theme.palette.mode === 'dark'
                        ? '0 10px 30px rgba(0,0,0,0.45)'
                        : '0 10px 30px rgba(15,23,42,0.10)',
                border: `1px solid ${
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(30,58,138,0.08)'
                }`,
                color: theme.palette.text.default,
            }}>

                <h1 style={{
                    fontSize: 42,
                    fontWeight: 700,
                    marginBottom: 10,
                    color: theme.palette.primary.main,
                }}>
                    Real Estate
                </h1>

                <h2 style={{
                    fontSize: 24,
                    marginBottom: 30,
                    opacity: 0.9,
                    color: theme.palette.text.default,
                }}>
                    Welcome Guest
                </h2>
            </div>
        </div>
    );
}
