import {Box} from '@mui/material';
import {lazy, Suspense, useState} from "react";
import EnterPersonalDetails from "../components/EnterPersonalDetails";
import {emptyFindById, emptySearchReservation} from "../../../store/slices/data_reservation";
import {useDispatch} from "react-redux";

const CheckInModal = lazy(() => import("../components/CheckInModal/containers/CheckInModal"));

const CheckIn = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)

    return (
        <Box
            sx={{
                minHeight: '80vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                backgroundColor: 'background.default',
            }}
        >
            <EnterPersonalDetails setOpen={setOpen}/>

            {open &&
                <Suspense fallback={<></>}>
                    <CheckInModal open={open} handleClose={() => {
                        setOpen(false);
                        dispatch(emptySearchReservation());
                        dispatch(emptyFindById());
                    }}/>
                </Suspense>
            }
        </Box>
    );
};

export default CheckIn;