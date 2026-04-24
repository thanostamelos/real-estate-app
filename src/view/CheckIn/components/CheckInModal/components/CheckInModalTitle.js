import {DialogTitle, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {IconAlertCircle, IconX} from "@tabler/icons-react";
import React, {useCallback} from "react";
import {FormikProvider} from "formik";
import {openSnackbar} from "../../../../../store/slices/data_snackbar";
import {useDispatch, useSelector} from "react-redux";
import {selectReservationById} from "../../../selectors/CheckInSelectors";

const CheckInModalTitle = ({handleClose, formik, listData, wasLoadingOnce}) => {
    const dispatch = useDispatch();
    const reservationById = useSelector(selectReservationById);

    const showMessage = useCallback(() => {
        dispatch(
            openSnackbar({
                message: 'Select one reservation and then hit Select!',
                type: 'warning',
                autoHideDuration: 2500
            })
        );
    }, [dispatch]);

    return (
        <DialogTitle
            id="draggable-dialog-title-2"
            sx={{
                px: 2,
                py: 1.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: {xs: 18, sm: 22},
                        lineHeight: 1.2,
                        fontWeight: 600,
                        mb: {xs: 1, sm: 1, md: 1, lg: 1},
                    }}
                >
                    Reservations
                </Typography>
                <FormikProvider value={formik}>
                    <Grid
                        container
                        spacing={{xs: 1.5, sm: 2}}
                        alignItems="flex-start"
                    >
                        {/*<Grid sx={{pt: 1}}>*/}
                        {/*    <SimpleTextFilterFormik name="email" disabled={wasLoadingOnce || listData?.length === 1}/>*/}
                        {/*</Grid>*/}

                        {/*<Grid sx={{pt: 1}}>*/}
                        {/*    <SimplePhoneFilterFormik name="phone" disabled={wasLoadingOnce || listData?.length === 1}/>*/}
                        {/*</Grid>*/}

                        {listData?.length > 1 && !reservationById &&
                            <Grid sx={{pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Tooltip title={'Select one reservation and then hit Select!'}>
                                    <Typography
                                        fontSize={18}
                                        fontWeight={600}
                                        color={'#b1946a'}
                                    >
                                        Choose one Reservation!
                                    </Typography>
                                </Tooltip>
                                <IconButton onClick={showMessage}>
                                    <IconAlertCircle/>
                                </IconButton>
                            </Grid>
                        }
                        {(reservationById || listData?.length === 1) &&
                            <Grid sx={{pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography
                                    fontSize={17}
                                    fontWeight={700}
                                    color={'#4de42b'}
                                >
                                    Welcome! Enjoy the movie.
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </FormikProvider>
            </div>

            <IconButton
                onClick={handleClose}
                size="small"
            >
                <IconX fontSize={20}/>
            </IconButton>
        </DialogTitle>
    )
}

export default CheckInModalTitle;