import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {IconDeviceLaptop, IconDoor, IconMovie, IconUserFilled} from "@tabler/icons-react";

const ICONS = {
    home: <HomeIcon/>,
    event: <EventIcon/>,
    ticket: <ConfirmationNumberIcon/>,
    admin: <AdminPanelSettingsIcon/>,
    user: <IconUserFilled/>,
    screen: <IconDeviceLaptop/>,
    movie: <IconMovie/>,
    entry: <IconDoor/>,
};

const MENU_CONFIG = [
    {label: 'Home', to: '/', icon: 'home'},
    {
        label: 'Calendar',
        to: '/calendar',
        icon: 'event'
    },
    {
        label: 'Reservation',
        to: '/reservation',
        icon: 'ticket'
    },
    {
        label: 'Entry',
        to: '/checkIn',
        icon: 'entry',
    },
    {
        label: 'Admin',
        to: '/admin',
        icon: 'admin',
    },
];

const useMenuItems = () => {

    console.log('jeefde')
    return MENU_CONFIG
        .map((item) => ({
            ...item,
            icon: ICONS[item.icon],
        }));
}

export default useMenuItems;