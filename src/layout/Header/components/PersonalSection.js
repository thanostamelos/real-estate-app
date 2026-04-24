import {useSelector} from "react-redux";
import {selectCurrentAuthData} from "../../selectors/selectors";
import {Badge, DialogContent, Grid, IconButton, Tooltip} from "@mui/material";
import {IconUser} from "@tabler/icons-react";
import React, {lazy, Suspense, useMemo, useState} from "react";
import SimpleTextFilterFormik
    from "../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import {FormikProvider, useFormik} from "formik";

const CrudModal = lazy(() => import("../../../utils/ReusableComponents/CrudModal/container/CrudModal"));

const PersonalSection = () => {
    const [open, setOpen] = useState({state: false})

    const authData = useSelector(selectCurrentAuthData);

    const computedInitialValues = useMemo(() => {

        return {
            email: authData?.email ?? '',
            firstName: authData?.firstName || '',
            lastName: authData?.lastName || '',
        };
    }, [authData]);

    const formik = useFormik({
        initialValues: computedInitialValues
    });

    const ChildrenContent = () => {

        if (!authData?.email && !authData?.firstName && !authData?.lastName) {
            return (
                <DialogContent sx={{p: {xs: 2, sm: 4, md: 6}, mt: {xs: 0.5, sm: 2}}}>
                    No Personal Info Available
                </DialogContent>
            )
        }


        return (
            <DialogContent sx={{p: {xs: 2, sm: 4, md: 6}, mt: {xs: 0.5, sm: 2}}}>
                <FormikProvider value={formik}>
                    <Grid
                        container
                        spacing={{xs: 1.5, sm: 2}}
                        alignItems="flex-start"
                        sx={{mt: {xs: 1, sm: 1}}}
                    >
                        <Grid item xs={12} md={6}>
                            <SimpleTextFilterFormik value={authData?.email} name="email" disabled/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SimpleTextFilterFormik value={authData?.firstName} name="firstName" disabled/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SimpleTextFilterFormik value={authData?.lastName} name="lastName" disabled/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SimpleTextFilterFormik value={authData?.roles} name="roles" disabled/>
                        </Grid>
                    </Grid>
                </FormikProvider>
            </DialogContent>
        )
    }

    return (
        <>
            <Tooltip title={'View Personal Details'}>
                <IconButton aria-label="notifications" onClick={() => {
                    setOpen((prevState => ({state: !prevState?.state})))
                }}>
                    <Badge badgeContent={0} color="secondary" sx={{border: '1px solid #ccc', borderRadius: 5, p: 1}}>
                        <IconUser size={'20px'}/>
                    </Badge>
                </IconButton>
            </Tooltip>
            {open?.state &&
                <Suspense fallback={<></>}>
                    <CrudModal
                        open={open}
                        handleClose={() => setOpen({state: false})}
                        title={'Personal Info'}
                        hideSubmit={true}
                    >
                        <ChildrenContent/>
                    </CrudModal>
                </Suspense>
            }
        </>
    )
}

export default PersonalSection;