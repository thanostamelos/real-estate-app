import {Box, DialogTitle, IconButton, Typography} from "@mui/material";
import React from "react";
import {IconX} from '@tabler/icons-react';


const CalendarViewEventsModalTitle = ({handleClose, eventDate}) => {
    const displayDate = () => {
        if (!eventDate) return '-';
        return `${String(eventDate.getDate()).padStart(2, '0')}/${String(eventDate.getMonth() + 1).padStart(2, '0')}/${eventDate.getFullYear()}`;
    };

    return (
        <DialogTitle
            id="draggable-dialog-title-2"
            sx={{
                backgroundColor: 'background.paper',
                px: {xs: 2, sm: 2.5},
                py: {xs: 1.5, sm: 1.75}
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 1.5
                }}
            >
                <Box sx={{minWidth: 0}}>
                    <Typography
                        sx={{
                            fontSize: {xs: '1rem', sm: '1.1rem'},
                            fontWeight: 800,
                            color: 'text.primary',
                            lineHeight: 1.2
                        }}
                    >
                        View Events
                    </Typography>
                    <Typography
                        sx={{
                            mt: 0.5,
                            fontSize: {xs: '0.8rem', sm: '0.9rem'},
                            color: 'text.secondary'
                        }}
                    >
                        {displayDate()}
                    </Typography>
                </Box>

                <IconButton onClick={handleClose} size="small">
                    <IconX size={22} stroke={2}/>
                </IconButton>
            </Box>
        </DialogTitle>
    )
}

export default CalendarViewEventsModalTitle;