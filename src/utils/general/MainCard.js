import React from 'react';
import {Card, CardContent, CardHeader, Divider} from '@mui/material';

const defaultHeaderSX = {
    '& .MuiCardHeader-action': {mr: 0}
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = React.forwardRef(
    (
        {
            border = false,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            headerSX = {},
            secondary,
            shadow,
            hideDivider,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: 'none',
                    ...sx
                }}
            >
                {/* card header and action */}
                {title && (
                    <CardHeader sx={{...defaultHeaderSX, ...headerSX}} title={title} action={secondary}/>
                )}

                {/* content & header divider */}
                {title && !hideDivider && <Divider/>}

                {/* card content */}
                {content && (
                    <CardContent sx={{...contentSX}} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

export default MainCard;
