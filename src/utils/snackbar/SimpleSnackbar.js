import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Slide} from "@mui/material";
import {useDispatch} from "react-redux";
import {closeSnackbar} from "../../store/slices/data_snackbar";

const SimpleSnackbar = ({open, message, type = 'success', maxStack = 3, autoHideDuration = 4000}) => {
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small"/>
        </IconButton>
    );

    function SlideTransition(props) {
        return <Slide {...props} direction="up"/>;
    }

    return (
        <div>
            <Snackbar
                open={open}
                // maxSnack={maxStack}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
                message={message}
                action={action}
                TransitionComponent={SlideTransition}
                ContentProps={{
                    sx: {
                        backgroundColor: type === 'success' ? '#00cd35' : type === 'warning' ? '#e3a13f' : '#ff3d3d',
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                }}
            />
        </div>
    )
}

export default SimpleSnackbar;