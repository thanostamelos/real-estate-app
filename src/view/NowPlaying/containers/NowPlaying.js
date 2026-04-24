import {Box, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import NowPlayingImage from "../components/NowPlayingImage";
import NowPlayingBody from "../components/NowPlayingBody";
import NowPlayingFooter from "../components/NowPlayingFooter";

const NowPlaying = ({setOpen, isLoading, screenings}) => {


    const formatDate = (eventDate) => {
        if (!eventDate) return '-';

        const date = new Date(eventDate);
        if (Number.isNaN(date.getTime())) return eventDate;

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    minHeight: 260,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Stack spacing={1.5} alignItems="center">
                    <CircularProgress size={32}/>
                    <Typography variant="body2" color="text.secondary">
                        Loading screenings...
                    </Typography>
                </Stack>
            </Box>
        );
    }

    if (screenings.length === 0) {
        return (
            <Box
                sx={{
                    minHeight: 260,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3
                }}
            >
                <Stack spacing={1} alignItems="center" textAlign="center">
                    <Typography variant="h6" fontWeight={800}>
                        No screenings available
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        There are no movies currently available for reservation.
                    </Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                p: {xs: 1.5, sm: 2.5}
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        xl: 'repeat(3, minmax(0, 1fr))'
                    }
                }}
            >
                {screenings.map((item) => (
                    <Card
                        key={item?.calendarId}
                        variant="outlined"
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0
                        }}
                    >
                        <NowPlayingImage item={item}/>
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                                flex: 1
                            }}
                        >

                            <NowPlayingBody item={item} formatDate={formatDate}/>

                            <NowPlayingFooter item={item} setOpen={setOpen}/>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default NowPlaying;