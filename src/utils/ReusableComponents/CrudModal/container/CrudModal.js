import {PaperComponentDraggable} from "../../../general/CustomPaperComponent";
import CrudModalTitle from "../components/CrudModalTitle";
import CrudModalActions from "../components/CrudModalActions";
import {Dialog, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const CrudModal = ({children, open, handleClose, formik, title, hideSubmit, disableSubmit, submitIsLoading}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={open?.state}
            fullScreen={isMobile}
            onClose={() => {
                handleClose();
                if (formik?.resetForm) {
                    formik.resetForm();
                }
            }}
            PaperComponent={isMobile ? undefined : PaperComponentDraggable}
            aria-labelledby="draggable-dialog-title-2"
            hideBackdrop
            PaperProps={{
                sx: {
                    backgroundColor: 'background.paper',

                    width: '100%',
                    m: {xs: 0, sm: 2},

                    minWidth: {xs: '100%', sm: 560, md: 300},
                    maxWidth: {xs: '100%', sm: 'min(90vw, 900px)'},
                    minHeight: {xs: '100%', sm: 480},
                    maxHeight: {xs: '100%', sm: 'calc(100vh - 184px)'},

                    borderRadius: {xs: 0, sm: 2},
                    overflow: 'hidden'
                }
            }}
        >
            <CrudModalTitle handleClose={handleClose} action={open?.action} title={title}/>
            {children}
            {!hideSubmit && <CrudModalActions handleClose={handleClose} formik={formik} disableSubmit={disableSubmit} submitIsLoading={submitIsLoading}/>}
        </Dialog>
    )
};

export default CrudModal;