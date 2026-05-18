import {memo, useCallback} from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, ClickAwayListener, Divider, Paper, Popper, Typography} from '@mui/material';
import {IconHelp, IconSearch, IconUpload} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';

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

    const go = (path) => {
        setOpen(false);
        navigate(path);
    };

    return (
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
                <Paper
                    elevation={8}
                    sx={{
                        width: 280,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: "hidden",
                        bgcolor: theme.palette.background.paper,
                        py: 1
                    }}
                >
                    <SectionLabel label="Browse"/>
                    <MenuItem
                        icon={<IconSearch size={18}/>}
                        label="Find a Property"
                        description="Search all available listings"
                        color="#3fb129"
                        onClick={() => go("/")}
                    />

                    <Divider sx={{my: 1, mx: 1.5}}/>

                    <SectionLabel label="Manage"/>
                    <MenuItem
                        icon={<IconUpload size={18}/>}
                        label="Upload a Property"
                        description="Create a new listing"
                        color="#1976d2"
                        onClick={() => go("/new-listing")}
                    />

                    <Divider sx={{my: 1, mx: 1.5}}/>

                    <SectionLabel label="Support"/>
                    <MenuItem
                        icon={<IconHelp size={18}/>}
                        label="Help"
                        description="FAQs and contact support"
                        onClick={() => setOpen(false)}
                    />
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
};

export default memo(ProfileSectionPopperMenu);
