import {ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {cloneElement, memo, useMemo} from 'react';
import {useTheme} from '@mui/material/styles';

const PopperListItem = memo(({onClick, icon, itemLabel, iconStroke = 1.5, iconSize = '20px'}) => {
    const borderRadius = 4;
    const theme = useTheme();

    const sx = useMemo(
        () => ({
            borderRadius: `${borderRadius}px`,
            '&:hover': {
                background: theme.palette.background.default
            }
        }),
        [borderRadius, theme.palette.background.default]
    );

    return (
        <ListItemButton sx={sx} onClick={onClick}>
            <ListItemIcon>
                {cloneElement(icon, {
                    stroke: icon.props?.stroke ?? iconStroke,
                    size: icon.props?.size ?? iconSize
                })}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2">{itemLabel}</Typography>}/>
        </ListItemButton>
    );
});

export default PopperListItem;
