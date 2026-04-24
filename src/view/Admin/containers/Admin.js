import React from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Box, Paper, Tab, Tabs} from '@mui/material';
import {useSelector} from "react-redux";
import {selectAuth} from "../selectors/AdminSelectors";

const tabs = [
    {
        label: 'Reservations',
        path: '/admin/reservations'
    },
    {label: 'Entry Log', path: '/admin/entryLog'},
    {label: 'Movies', path: '/admin/movie'},
    {label: 'Screens', path: '/admin/screen'},
    {label: 'Users/Roles', path: '/admin/users'},
];

export default function Admin() {
    const location = useLocation();
    const navigate = useNavigate();
    const authData = useSelector(selectAuth);

    const current =
        tabs.find((t) => location.pathname.startsWith(t.path))?.path ?? '/admin/users';

    return (
        <Box sx={{display: 'grid', gap: 1}}>
            <Paper
                variant="outlined"
                sx={{
                    borderRadius: {xs: 0, sm: 3},
                    overflow: 'hidden',
                }}
            >
                <Tabs
                    value={current}
                    onChange={(e, v) => navigate(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        minHeight: {xs: 44, sm: 48},
                        px: {xs: 0.5, sm: 1},

                        '& .MuiTabs-flexContainer': {
                            gap: {xs: 0.5, sm: 1},
                        },

                        '& .MuiTab-root': {
                            minHeight: {xs: 44, sm: 48},
                            minWidth: {xs: 'auto', sm: 120},
                            px: {xs: 1.25, sm: 2},
                            py: {xs: 0.75, sm: 1},
                            fontSize: {xs: '0.8rem', sm: '0.95rem'},
                            textTransform: 'none',
                            whiteSpace: 'nowrap',
                            borderRadius: 2,
                        },
                    }}
                >
                    {tabs
                        .filter(
                            (tab) =>
                                !tab.roles ||
                                authData?.roles?.some((role) => tab.roles.includes(role))
                        )
                        .map((tab) => (
                            <Tab
                                key={tab.path}
                                value={tab.path}
                                label={tab.label}
                            />
                        ))}
                </Tabs>
            </Paper>

            <Outlet/>
        </Box>
    );
}