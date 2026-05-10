import {AppBar, Box, IconButton, Toolbar, useMediaQuery} from "@mui/material";
import React, {lazy, Suspense, useEffect, useRef, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {selectIsOpen} from "../../selectors/selectors";
import {useTheme} from "@mui/material/styles";
import LogoSection from "../components/LogoSection";
import ThemeMode from "../components/ThemeMode";
import {IconCategory, IconUser} from "@tabler/icons-react";
import SearchBar from "../components/SearchBar";
import AuthPopperMenu from "../components/AuthPopperMenu";

const ProfileSectionPopperMenu = lazy(() => import("../components/ProfileSectionPopperMenu"));

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector(selectIsOpen);
    const [isOpen, setIsOpen] = useState(false);
    const [authPopper, setAuthPopper] = useState(false);

    const prevOpen = useRef(open);

    const anchorRef = useRef(null);
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const toggleMenu = () => {
        dispatch(setIsOpen(!open))
    };

    useEffect(() => {
        if (prevOpen.current === true && isOpen === false) {
            if (anchorRef.current) {
                anchorRef.current.focus();
            }
        }
        prevOpen.current = isOpen;
    }, [isOpen]);

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
                <SearchBar/>

                <Box sx={{flex: 1}}/>

                <IconButton
                    ref={anchorRef}
                    edge="end"
                    onClick={() => setIsOpen(true)}
                    aria-label="open drawer"
                >
                    <IconCategory fontSize={35}/>
                </IconButton>

                {isOpen &&
                    <Suspense fallback={<></>}>
                        <ProfileSectionPopperMenu open={isOpen} setOpen={setIsOpen} anchorRef={anchorRef}/>
                    </Suspense>
                }

                <ThemeMode/>

                <IconButton
                    ref={anchorRef}
                    onClick={() => setAuthPopper(true)}
                    aria-label="open drawer"
                >
                    <IconUser fontSize={35}/>
                </IconButton>

                {authPopper &&
                    <Suspense fallback={<></>}>
                        <AuthPopperMenu open={authPopper} setOpen={setAuthPopper} anchorRef={anchorRef}/>
                    </Suspense>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;