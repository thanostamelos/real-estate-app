import {AppBar, Box, IconButton, Toolbar, useMediaQuery} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {selectIsOpen} from "../../selectors/selectors";
import {useTheme} from "@mui/material/styles";
import {setIsOpen} from "../../../store/slices/data_menu";
import LogoSection from "../components/LogoSection";
import ThemeMode from "../components/ThemeMode";
import PersonalSection from "../components/PersonalSection";

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector(selectIsOpen);

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const toggleMenu = () => {
        dispatch(setIsOpen(!open))
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: 'divider',
                zIndex: (t) => t.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{gap: 2}}>

                <LogoSection/>

                {!isDesktop && (
                    <IconButton edge="start" onClick={toggleMenu} aria-label="open drawer">
                        <MenuIcon/>
                    </IconButton>
                )}

                <Box sx={{flex: 1}}/>

                <ThemeMode/>

                <PersonalSection/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;