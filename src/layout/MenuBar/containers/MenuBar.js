import {Box, Drawer, useMediaQuery} from "@mui/material";
import MenuBarItems from "../components/MenuBarItems";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {setIsOpen} from "../../../store/slices/data_menu";
import {selectIsOpen} from "../../selectors/selectors";

const DRAWER_WIDTH = 280;

const MenuBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isMenuOpen = useSelector(selectIsOpen);

    return (
        <Box
            component="nav"
            sx={{width: {md: DRAWER_WIDTH}, flexShrink: {md: 0}}}
            aria-label="navigation"
        >
            {!isDesktop && (
                <Drawer
                    variant="temporary"
                    open={isMenuOpen}
                    onClose={() => dispatch(setIsOpen(false))}
                    ModalProps={{keepMounted: true}}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            height: '100vh',
                            maxHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <MenuBarItems/>
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <MenuBarItems/>
                </Drawer>
            )}
        </Box>
    )
}

export default MenuBar;