import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {openSnackbar} from "../../../../store/slices/data_snackbar";
import {Box, Typography} from "@mui/material";
import SimpleButton from "../../../Buttons/SimpleButton";

const CrudHeader = ({title, setOpen, selectedItemId, handleDeleteItem}) => {
    const dispatch = useDispatch();

    const showSelectOneError = useCallback(() => {
        dispatch(
            openSnackbar({
                message: 'Select one item!',
                type: 'error',
                autoHideDuration: 2500
            })
        );
    }, [dispatch]);

    const handleDelete = useCallback(() => {
        if (!selectedItemId) {
            showSelectOneError();
            return;
        }
        handleDeleteItem(selectedItemId);
    }, [handleDeleteItem, selectedItemId, showSelectOneError]);

    const handleUpdate = useCallback(() => {
        if (!selectedItemId) {
            showSelectOneError();
            return;
        }
        setOpen({state: true, action: 'update'});
    }, [selectedItemId, setOpen, showSelectOneError]);

    return (
        <Box
            sx={{
                borderBottom: '1px solid rgba(255,255,255,0.14)',
                py: {xs: 1, sm: 1.25},
                mb: {xs: 1, sm: 2}
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: {xs: 'flex-start', sm: 'center'},
                    justifyContent: 'space-between',
                    gap: 1,
                    flexDirection: {xs: 'column', sm: 'row'}
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: {xs: 18, sm: 24},
                        lineHeight: 1.2
                    }}
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        width: {xs: '100%', sm: 'auto'},
                        display: 'flex',
                        gap: 1,
                        overflowX: {xs: 'auto', sm: 'visible'},
                        whiteSpace: 'nowrap',
                        WebkitOverflowScrolling: 'touch',
                        pb: {xs: 0.5, sm: 0},
                        '&::-webkit-scrollbar': {height: 6},
                        '&::-webkit-scrollbar-thumb': {borderRadius: 999}
                    }}
                >
                    <Box sx={{flex: '0 0 auto'}}>
                        <SimpleButton name="Add" onClick={() => setOpen({state: true, action: 'create'})}/>
                    </Box>
                    <Box sx={{flex: '0 0 auto'}}>
                        <SimpleButton name="Edit" onClick={handleUpdate}/>
                    </Box>
                    <Box sx={{flex: '0 0 auto'}}>
                        <SimpleButton name="Delete" onClick={handleDelete}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CrudHeader;