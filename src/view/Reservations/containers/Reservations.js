import {Box} from "@mui/material";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {asyncGetMyRecords} from "../../../store/slices/data_reservation";
import ReservationsHeader from "../components/ReservationsHeader";
import ReservationBody from "../components/ReservationBody/containers/ReservationBody";
import {asyncGetAllEvent} from "../../../store/slices/data_calendar";

const ReservationsModal = lazy(() => import("../components/modal/ReservationsModal"));

const Reservations = () => {
    const dispatch = useDispatch();

    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState({state: false, action: ''});

    useEffect(() => {
        if (!dispatch || !asyncGetMyRecords || !asyncGetAllEvent) return;
        dispatch(asyncGetMyRecords());
        dispatch(asyncGetAllEvent());
    }, [dispatch]);

    return (
        <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
            <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
                <ReservationsHeader
                    title={'Reservations'}
                    setOpen={setOpen}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
                <ReservationBody
                    idName={'reservationId'}
                    tabIndex={tabIndex}
                    setOpen={setOpen}
                />
            </Box>
            {open.state &&
                <Suspense>
                    <ReservationsModal open={open} handleClose={() => setOpen({state: false, action: ''})}/>
                </Suspense>
            }
        </Box>
    )
}

export default Reservations;