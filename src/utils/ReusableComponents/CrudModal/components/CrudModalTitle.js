import {DialogTitle, IconButton, Typography} from "@mui/material";
import {IconX} from "@tabler/icons-react";

const CrudModalTitle = ({handleClose, action, title}) => {

    return (
        <DialogTitle
            id="draggable-dialog-title-2"
            sx={{
                px: {xs: 2, sm: 2.5},
                py: {xs: 1.25, sm: 2},
                borderBottom: '1px solid #fff',
                minHeight: {xs: 48, sm: 56},
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Typography sx={{flexGrow: 1}} fontSize={{xs: 16, sm: 18}} fontWeight={600}>
                {title ? title : action === 'create' ? 'Create Item' : 'Modify Item'}
            </Typography>

            <IconButton onClick={handleClose} size="large">
                <IconX fontSize={20}/>
            </IconButton>
        </DialogTitle>
    )
}

export default CrudModalTitle