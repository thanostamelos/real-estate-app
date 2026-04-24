import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link as RouterLink} from "react-router";
import React from "react";
import useMenuItems from "../MenuItems/useMenuItems";
import {useLocation} from "react-router-dom";
import Rights from "./Rights";
import AuthMenuItem from "./AuthMenuItem";

const MenuBarItems = () => {
    const location = useLocation();
    const items = useMenuItems();

    return (
        <Box
            sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Box sx={{height: 60, flexShrink: 0}}/>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <List sx={{px: 1}}>
                    {items.map((item) => (
                        <ListItemButton
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            selected={location.pathname === item.to}
                            sx={{borderRadius: 2, mx: 1, my: 0.5}}
                        >
                            <ListItemIcon sx={{minWidth: 40}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{p: 2}}>
                    <Divider sx={{mb: 2}}/>

                    <AuthMenuItem/>

                    <Divider sx={{mb: 2, mt: 2}}/>

                    <Box sx={{mt: 2}}>
                        <Rights/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MenuBarItems;