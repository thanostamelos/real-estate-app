import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from '@mui/material';
import {PaperComponentDraggable} from "./CustomPaperComponent";
import SimpleButton from "../Buttons/SimpleButton";

const GeneralDialog = ({isOpen, handleClose, title, message, isLoading, buttonName, handleEvent, sx, extra}) => {

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperComponent={PaperComponentDraggable}
            aria-labelledby="draggable-dialog-title-2"
            sx={{
                zIndex: 1600
            }}
            PaperProps={{
                sx: {
                    minWidth: '370px',
                    minHeight: '200px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    border: '1px solid',
                    ...sx
                }
            }}
            {...extra}
        >
            <DialogTitle id="draggable-dialog-title-2">
                <Grid container sx={{minHeight: '40px'}}>
                    {title}
                </Grid>
            </DialogTitle>
            <DialogContent sx={{display: 'flex', alignItems: 'center'}}>
                <DialogContentText>
                    <Typography variant="body2" component="span">
                        {message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{marginBottom: 1, marginRight: 0.5}}>
                <SimpleButton onClick={handleClose} name={'Cancel'} size={'small'}/>
                <SimpleButton
                    isLoading={isLoading}
                    name={buttonName}
                    onClick={handleEvent}
                    generalDialog={true}
                    size={'small'}
                />
            </DialogActions>
        </Dialog>
    );
};

export default GeneralDialog;
