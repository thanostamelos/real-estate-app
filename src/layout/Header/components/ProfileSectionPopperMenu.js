import {memo, useCallback} from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, ClickAwayListener, Divider, Paper, Popper, Typography} from '@mui/material';
import {IconHelp, IconSearch, IconUpload} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';
import MainCard from "../../../utils/general/MainCard";

const popperModifiers = [
    {name: 'offset', options: {offset: [0, 8]}}
];

const MenuItem = ({icon, label, description, onClick, color}) => {
    const theme = useTheme();
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex", alignItems: "flex-start", gap: 1.5,
                px: 1.5, py: 1.2, borderRadius: 2, cursor: "pointer",
                transition: "background 0.15s",
                "&:hover": {bgcolor: theme.palette.action.hover}
            }}
        >
            <Box sx={{
                mt: 0.3, p: 0.8, borderRadius: 1.5,
                bgcolor: color ? `${color}18` : theme.palette.action.selected,
                color: color ?? theme.palette.text.primary,
                display: "flex"
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" fontWeight={600}>{label}</Typography>
                <Typography variant="caption" color="text.secondary">{description}</Typography>
            </Box>
        </Box>
    );
};

const SectionLabel = ({label}) => (
    <Typography variant="caption" color="text.disabled"
        sx={{px: 1.5, pt: 1, pb: 0.5, display: "block", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700}}>
        {label}
    </Typography>
);

const ProfileSectionPopperMenu = ({open, setOpen, anchorRef}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClose = useCallback((event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    }, [anchorRef, setOpen]);

    const handleSettingsClick = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handlePrivacyNoticeClick = useCallback(() => {
    }, []);

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
                                    <List component="nav" sx={listStyles}>
                                        <PopperListItem
                                            onClick={handleSettingsClick}
                                            itemLabel={'Find House'}
                                            icon={SearchIcon}
                                        />
                                        <PopperListItem
                                            onClick={handlePrivacyNoticeClick}
                                            itemLabel={'Upload a Property'}
                                            icon={UploadIcon}
                                        />
                                        <PopperListItem
                                            onClick={handlePrivacyNoticeClick}
                                            itemLabel={'Help'}
                                            icon={HelpIcon}
                                        />
                                        <Divider sx={{my: 1}}/>
                                    </List>
                                </Box>
                            </MainCard>
                        )}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};

export default memo(ProfileSectionPopperMenu);
