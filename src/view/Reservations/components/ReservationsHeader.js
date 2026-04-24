import {Box, Tab, Tabs, Typography} from "@mui/material";
import SimpleButton from "../../../utils/Buttons/SimpleButton";

const tabsItems = [
    {
        field: 'My reservations'
    },
];

const ReservationsHeader = ({title, setOpen, tabIndex, setTabIndex}) => {

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box
            sx={{

                py: {xs: 1, sm: 1.25},
                mb: {xs: 1, sm: 2}
            }}
        >
            <Box
                sx={{
                    borderBottom: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex',
                    alignItems: {xs: 'flex-start', sm: 'center'},
                    justifyContent: 'space-between',
                    gap: 1,
                    flexDirection: {xs: 'column', sm: 'row'}
                }}
            >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: {xs: 18, sm: 24},
                            lineHeight: 1.2
                        }}
                    >
                        {title}
                    </Typography>
                    <Tabs value={tabIndex} onChange={handleTabChange} sx={{mt: '-14px', ml: 1}} indicatorColor="primary"
                          textColor="primary">
                        <Tab label={'Now Playing'} key="default"/>
                        {tabsItems.map((a, index) => <Tab label={a?.field} key={a?.field || index}/>)}
                    </Tabs>
                </div>

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
                        '&::-webkit-scrollbar-thumb': {borderRadius: 999},
                        mb: 0.5
                    }}
                >
                    <Box sx={{flex: '0 0 auto'}}>
                        <SimpleButton name="Add Reservation" onClick={() => setOpen({state: true, action: 'create'})}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationsHeader;