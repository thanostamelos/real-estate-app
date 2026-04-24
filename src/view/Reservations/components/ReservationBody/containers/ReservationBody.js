import {Box, Paper, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {lazy, Suspense, useMemo} from "react";
import {useSelector} from "react-redux";
import {
    selectCalendar,
    selectCalendarLoading,
    selectSelectedReservation
} from "../../../selectors/ReservationsSelectors";
import NowPlaying from "../../../../NowPlaying/containers/NowPlaying";

const TabMyReservations = lazy(() => import("../components/TabMyReservations"));

const desktopStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: 'background.default'
};

const ReservationBody = (
    {
        idName,
        emptyText,
        tabIndex,
        setOpen
    }
) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const selectedItem = useSelector(selectSelectedReservation);
    const screenings = useSelector(selectCalendar);
    const screeningIsLoading = useSelector(selectCalendarLoading);

    const normalizedScreenings = useMemo(() => {
        const data = Array.isArray(screenings) ? screenings : []
        if (data && data?.length > 0) {
            return data.filter(a => a.status !== "FINISHED");
        }
        return data;
    }, [screenings]);

    return (
        <Paper
            sx={{
                width: "100%",
                height: {xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 253px)'},
                overflow: "hidden",
                borderRadius: {xs: 1.5, sm: 2}
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    ...(isDesktop ? desktopStyle : {}),
                    overflowY: {xs: 'auto', md: 'hidden'},
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {
                    tabIndex === 0 ?
                        <NowPlaying
                            setOpen={setOpen}
                            screenings={normalizedScreenings}
                            isLoading={screeningIsLoading}
                        />
                        :
                        <Suspense fallback={<></>}>
                            <TabMyReservations
                                selectedItem={selectedItem}
                                idName={idName}
                                emptyText={emptyText}
                                isDesktop={isDesktop}
                            />
                        </Suspense>
                }
            </Box>
        </Paper>
    )
}

export default ReservationBody;