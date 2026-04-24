import {Box} from '@mui/material';
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {asyncGetAllEntries} from "../../../store/slices/data_entryLog";
import EntryLogHeader from "../components/EntryLogHeader";
import EntryLogBody from "../components/EntryLogBody/containers/EntryLogBody";

const EntryLog = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dispatch || !asyncGetAllEntries) return;
        dispatch(asyncGetAllEntries());
    }, [dispatch]);

    return (
        <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
            <Box sx={{width: '100%', maxWidth: '100vw', overflow: 'hidden'}}>
                <EntryLogHeader/>
                <EntryLogBody/>
            </Box>
        </Box>
    );
};

export default EntryLog;