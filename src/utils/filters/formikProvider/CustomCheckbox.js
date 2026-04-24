import {Stack, Tooltip, Typography} from "@mui/material";
import {IconCheck} from "@tabler/icons-react";

const CustomActionCheckbox = ({ label, checked, onClick, disabled, tooltipTitle, sx }) => (
    <Tooltip title={tooltipTitle} placement="top" arrow enterDelay={1000}>
        <Stack
            direction="row"
            onClick={!disabled ? onClick : undefined}
            sx={{
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: '6px',
                cursor: disabled ? 'default' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: !disabled ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                },
                '&:active': {
                    transform: !disabled ? 'scale(0.97)' : 'none'
                },
                '&:hover .custom-checkbox-box': {
                    borderColor: !disabled && !checked ? '#fff' : undefined
                },
                ...sx
            }}
        >
            <div
                className="custom-checkbox-box"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 18,
                    height: 18,
                    borderRadius: '4px',
                    backgroundColor: checked ? '#e0e0e0': '#d8d8d8',
                    border: checked ? '1px solid transparent' : '1px solid #6E6E6E',
                    transition: 'all 0.2s ease-in-out'
                }}
            >
                <IconCheck
                    size={14}
                    stroke={3}
                    color={'#2b2b2b'}
                    style={{
                        opacity: checked ? 1 : 0,
                        transform: checked ? 'scale(1)' : 'scale(0.5)',
                        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                />
            </div>
            <Typography
                sx={{
                    fontSize: '0.75rem',
                    fontWeight: checked ? 500 : 400,
                    color: checked ? 'text.hover' : 'text.default',
                    userSelect: 'none',
                    transition: 'all 0.2s ease-in-out'
                }}
            >
                {label}
            </Typography>
        </Stack>
    </Tooltip>
);

export default CustomActionCheckbox;