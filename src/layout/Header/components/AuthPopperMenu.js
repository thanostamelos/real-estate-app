import {useCallback, useMemo} from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, ClickAwayListener, Divider, List, Paper, Popper, Typography} from '@mui/material';
import {IconLogin, IconLogout, IconUser} from '@tabler/icons-react';
import PopperListItem from "./PopperListItem";
import MainCard from "../../../utils/general/MainCard";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectCurrentUser, selectIsAuthenticated} from "../../../store/slices/data_auth";
import {openSnackbar} from "../../../store/slices/data_snackbar";

const popperModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 8]
        }
    }
];

const LoginIcon = <IconLogin/>;
const LogoutIcon = <IconLogout/>;

const AuthPopperMenu = ({open, setOpen, anchorRef}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);

    const listStyles = useMemo(
        () => ({
            width: '100%',
            maxWidth: 350,
            minWidth: 300,
            backgroundColor: theme.palette?.background?.default,
            borderRadius: '10px',
            [theme.breakpoints.down('md')]: {
                minWidth: '100%'
            },
            '& .MuiListItemButton-root': {
                mt: 0.5
            }
        }),
        [theme.palette?.background?.default, theme.breakpoints]
    );

    const mainCardSx = useMemo(
        () => ({backgroundColor: theme.palette?.background?.default}),
        [theme.palette?.background?.default]
    );

    const handleClose = useCallback(
        (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        },
        [anchorRef, setOpen]
    );

    const handleLogin = useCallback(() => {
        navigate('/login');
        setOpen(false);
    }, [setOpen, navigate]);

    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
        dispatch(openSnackbar({ message: 'You have been logged out.', type: 'info' }));
        navigate('/');
        setOpen(false);
    }, [dispatch, navigate, setOpen]);

    const handleRedirectUserProfile = useCallback(() => {
        navigate('/profile');
        setOpen(false);
    }, [setOpen, navigate]);

    return (
        <>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                disablePortal
                modifiers={popperModifiers}
                sx={{zIndex: (t) => t.zIndex.drawer + 2}}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper>
                        {open && (
                            <MainCard
                                sx={mainCardSx}
                                border={false}
                                elevation={16}
                                content={false}
                                boxShadow
                                shadow={theme.shadows[16]}
                            >
                                <Box sx={{p: 2, pt: 0}}>
                                    {isAuthenticated && currentUser && (
                                        <>
                                            <Box sx={{px: 1, py: 1.5}}>
                                                <Typography variant="subtitle2" fontWeight={700}>
                                                    {currentUser.username}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {currentUser.email} · {currentUser.role}
                                                </Typography>
                                            </Box>
                                            <Divider sx={{mb: 1}}/>
                                        </>
                                    )}
                                    <List component="nav" sx={listStyles}>
                                        <PopperListItem
                                            onClick={handleRedirectUserProfile}
                                            itemLabel={'User Profile'}
                                            icon={<IconUser/>}
                                        />
                                        {isAuthenticated ? (
                                            <PopperListItem
                                                onClick={handleLogout}
                                                itemLabel={'Logout'}
                                                icon={LogoutIcon}
                                            />
                                        ) : (
                                            <PopperListItem
                                                onClick={handleLogin}
                                                itemLabel={'Login / Sign Up'}
                                                icon={LoginIcon}
                                            />
                                        )}
                                    </List>
                                </Box>
                            </MainCard>
                        )}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}

export default AuthPopperMenu