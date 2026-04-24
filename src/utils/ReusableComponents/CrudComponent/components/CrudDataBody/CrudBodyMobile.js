import {Box, Card, CardContent, Skeleton, Stack, Typography} from "@mui/material";
import React from "react";

const CrudBodyMobile = (
    {
        listData = [],
        isLoading = false,
        onItemClick,
        selectedItem,
        idName,
        renderItem,
        emptyText = 'No items found.'
    }
) => {

    if (isLoading) {
        return (
            <Stack spacing={1.5} sx={{p: 1.5}}>
                {Array.from({length: 6}).map((_, i) => (
                    <Card key={i} variant="outlined" sx={{borderRadius: 2}}>
                        <CardContent>
                            <Skeleton variant="text" width="60%"/>
                            <Skeleton variant="text" width="40%"/>
                            <Skeleton variant="text" width="85%"/>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        );
    }

    if (!listData?.length) {
        return (
            <Box sx={{p: 2}}>
                <Typography variant="body2" color="text.secondary">
                    {emptyText}
                </Typography>
            </Box>
        );
    }

    const isSelected = (row) => {
        return selectedItem?.[idName] === row?.[idName];
    }

    return (
        <Stack spacing={1.25} sx={{p: 1.5}}>
            {listData.map((row) => (
                <Card
                    key={row?.[idName]}
                    variant="outlined"
                    onClick={() => onItemClick?.(row)}
                    elevation={isSelected(row) ? 3 : 0}
                    sx={{
                        borderRadius: 2,
                        cursor: onItemClick ? 'pointer' : 'default',
                        backgroundColor: isSelected(row) ? '#467497' : 'transparent',
                        boxShadow: isSelected(row) ? '0 0 0 2px #fff' : 'none',
                    }}
                >
                    <CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}}}>
                        {renderItem?.(row)}
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};

export default CrudBodyMobile;