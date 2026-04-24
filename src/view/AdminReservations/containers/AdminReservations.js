import {Box} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {asyncGetAllRecords} from "../../../store/slices/data_reservation";
import AdminReservationsHeader from "../components/AdminReservationsHeader";
import AdminReservationsBody from "../components/AdminReservationsBody/containers/AdminReservationsBody";

const AdminReservations = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dispatch || !asyncGetAllRecords) return;
        dispatch(asyncGetAllRecords());
    }, [dispatch]);

    return (
        <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
            <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
                <AdminReservationsHeader/>
                <AdminReservationsBody/>
            </Box>
        </Box>
    )
}

export default AdminReservations;