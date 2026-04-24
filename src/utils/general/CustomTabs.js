import { Box, Button } from '@mui/material';

const CustomTabs = ({ tab, setTab, items }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                pb: 0.5,
            }}
        >
            {items.map((item, index) => {
                const active = tab === index;

                return (
                    <Button
                        key={item.label}
                        disabled={item.disabled}
                        onClick={() => setTab(index)}
                        sx={(theme) => ({
                            whiteSpace: 'nowrap',
                            borderRadius: 999,
                            px: 2,
                            py: 0.75,
                            fontSize: 13,
                            textTransform: 'none',
                            minWidth: 'auto',

                            color: active
                                ? theme.palette.primary.color
                                : theme.palette.text.default,

                            backgroundColor: active
                                ? theme.palette.primary.main
                                : 'transparent',

                            '&:hover': {
                                backgroundColor: active
                                    ? theme.palette.primary.hover
                                    : theme.palette.background.grey,
                            },

                            opacity: item.disabled ? 0.4 : 1,
                        })}
                    >
                        {item.label}
                    </Button>
                );
            })}
        </Box>
    );
};

export default CustomTabs;