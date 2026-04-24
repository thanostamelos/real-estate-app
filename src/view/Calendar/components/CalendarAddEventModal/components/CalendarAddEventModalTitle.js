import {DialogTitle, Divider, IconButton} from "@mui/material";
import React, {memo} from "react";
import {IconX} from "@tabler/icons-react";

const CalendarAddEventModalTitle = ({selectedEvent, handleClose}) => {
    return (
        <>
            <DialogTitle id="draggable-dialog-title-2">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    {selectedEvent?.calendarId ? 'Edit Event' : 'Add Event'}
                    <IconButton onClick={handleClose}>
                        <IconX size={22} stroke={2}/>
                    </IconButton>
                </div>
            </DialogTitle>
            <Divider/>
        </>
    )
}

export default memo(CalendarAddEventModalTitle);