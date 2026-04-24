import {useMediaQuery} from '@mui/material';

export const useWindowSize = () => {
    const isXs = useMediaQuery('(max-width:768px)');
    const isSm = useMediaQuery('(min-width:768px) and (max-width:1020px)');
    const isMd = useMediaQuery('(min-width:1020px) and (max-width:1300px)');
    const isLg = useMediaQuery('(min-width:1300px) and (max-width:1600px)');
    const isXlg = useMediaQuery('(min-width:1600px)');

    let size;

    if (isXs) {
        size = 500;
    } else if (isSm) {
        size = 500;
    } else if (isMd) {
        size = 900;
    } else if (isLg) {
        size = 1050;
    } else if (isXlg) {
        size = 1200;
    }

    return {size, isXs, isSm, isMd, isLg};
};
