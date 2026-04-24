import {Box, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {setSelectedScreening} from "../../../store/slices/data_reservation";

const NowPlayingFooter = ({item, setOpen}) => {
    const dispatch = useDispatch();
    const availableSeats = item?.availableSeats ?? 0;

    return (
        <Box sx={{mt: 'auto', pt: 1}}>
            {setOpen &&
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!availableSeats || item?.status !== 'AVAILABLE'}
                    onClick={() => {
                        dispatch(setSelectedScreening(item))
                        setOpen({state: true, action: 'create'});
                    }}
                >
                    Book now
                </Button>
            }
        </Box>
    )
}

export default NowPlayingFooter;