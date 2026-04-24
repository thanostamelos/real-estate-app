import {AppBar, Autocomplete, Box, Grid, IconButton, TextField, Toolbar, useMediaQuery} from "@mui/material";
import React, {Suspense, useEffect, useRef, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {selectIsOpen} from "../../selectors/selectors";
import {useTheme} from "@mui/material/styles";
import LogoSection from "../components/LogoSection";
import ThemeMode from "../components/ThemeMode";
import PersonalSection from "../components/PersonalSection";
import {IconCategory} from "@tabler/icons-react";
import ProfileSectionPopperMenu from "../components/ProfileSectionPopperMenu";

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector(selectIsOpen);
    const [isOpen, setIsOpen] = useState(false);

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

                <Grid size={{md: 12, lg: 6}}>
                    <Autocomplete
                        limitTags={1}
                        id={`id-search`}
                        multiple={false}
                        options={[]}
                        size="small"
                        freeSolo
                        autoSelect
                        value={null}
                        onChange={(e, v) => {
                        }}
                        name={'search'}
                        width={500}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant={'outlined'}
                                label={'Search'}
                                size="small"
                                sx={{
                                    minWidth: 500,
                                    width: 500,
                                    '& .MuiInputBase-root': {
                                        minHeight: 40,
                                        maxHeight: 40,
                                        fontSize: '13px',
                                        overflow: 'hidden',
                                        paddingRight: '60px !important'
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '4px 8px'
                                    },
                                    '& .MuiInputBase-root:focus-within': {
                                        minHeight: 40,
                                        maxHeight: 'none'
                                    },
                                    marginTop: '1px',
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                }}
                            />
                        )}
                    />
                </Grid>

                <Box sx={{flex: 1}}/>

                <IconButton
                    ref={anchorRef}
                    edge="end"
                    onClick={() => setIsOpen(true)}
                    aria-label="open drawer"
                >
                    <IconCategory fontSize={35}/>
                </IconButton>

                <Suspense fallback={null}>
                    <ProfileSectionPopperMenu open={isOpen} setOpen={setIsOpen} anchorRef={anchorRef}/>
                </Suspense>

                <ThemeMode/>

                <PersonalSection/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;