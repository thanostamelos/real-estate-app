import {DialogActions} from "@mui/material";
import SimpleButton from "../../../Buttons/SimpleButton";

const CrudModalActions = ({formik, disableSubmit, submitIsLoading}) => {

    return (
        <DialogActions
            sx={{
                p: {xs: 2, sm: 2},
                gap: 1,
                justifyContent: 'flex-end'
            }}
        >
            <SimpleButton
                onClick={formik?.handleSubmit}
                name={'Submit'}
                disabled={disableSubmit}
                isLoading={submitIsLoading}
            >

            </SimpleButton>
        </DialogActions>
    )
};

export default CrudModalActions;