import {Button, Tooltip} from '@mui/material';
import React, {forwardRef} from 'react';
import {useTheme} from '@mui/material/styles';

const SimpleButton = forwardRef(
    (
        {
            isLoading,
            disabled,
            onClick,
            name,
            icon,
            type,
            color,
            backgroundColor,
            hoverColor,
            hoverBackgroundColor,
            sx,
            tooltipTitle,
            size,
            component,
            to,
            animateButtonStyle,
            variant = 'contained',
            fullWidth
        },
        ref
    ) => {
        const theme = useTheme();
        const buttonColor = theme.palette.primary.color;
        const buttonBackground = theme.palette.primary.main;
        const buttonBackgroundHover = theme.palette.primary.hover;


        const nameAndIcon = () => {
            return (
                <>
                    {icon}
                    &nbsp;{name}
                </>
            );
        };

        return (
            <Tooltip title={!isLoading && tooltipTitle} placement={'top'}>
                <span>
                    <Button
                        fullWidth={fullWidth}
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.875rem',
                            color: color || buttonColor,
                            backgroundColor: backgroundColor || buttonBackground,
                            '&:hover': {
                                color: hoverColor || buttonColor,
                                backgroundColor: hoverBackgroundColor || buttonBackgroundHover
                            },
                            ...sx
                        }}
                        onClick={onClick}
                        color="secondary"
                        loading={isLoading}
                        disabled={disabled || isLoading}
                        size={size ? size : 'small'}
                        display="flex"
                        variant={variant}
                        type={type}
                        component={component}
                        to={to}
                    >
                        <span
                            style={{
                                visibility: isLoading ? 'hidden' : 'visible',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {nameAndIcon()}
                        </span>
                    </Button>
                </span>
            </Tooltip>
        );
    }
);

export default SimpleButton;
