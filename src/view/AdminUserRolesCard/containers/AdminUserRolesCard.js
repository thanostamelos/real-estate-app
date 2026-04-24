import {Box, Divider, Paper, Typography} from "@mui/material";
import React, {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedUser} from "../../Admin/selectors/AdminSelectors";
import {validationSchema} from "../../Admin/helper/helper";
import {FormikProvider, useFormik} from "formik";
import AdminUserRolesCardHeader from "../components/AdminUserRolesCardHeader/AdminUserRolesCardHeader";
import AdminUserRolesCardBody from "../components/AdminUserRolesCardBody";
import {asyncUpdateUser} from "../../../store/slices/data_userAdmin";
import {formatDatesForBackEndSingle} from "../../../utils/functions/generalFunctions";

const AdminUserRolesCard = () => {
    const dispatch = useDispatch();

    const selectedUser = useSelector(selectSelectedUser);

    const [edit, setEdit] = useState(false)

    const initialValues = useMemo(() => {
        return {
            userId: selectedUser?.userId || '',
            active: selectedUser?.active || true,
            dateOfBirth: selectedUser?.dateOfBirth || null,
            email: selectedUser?.email || '',
            firstName: selectedUser?.firstName || '',
            lastName: selectedUser?.lastName || '',
            roles: selectedUser?.roles || []
        }
    }, [selectedUser])

    const handleSubmitEvent = (values, {resetForm}) => {
        const request = {
            ...values,
            dateOfBirth: formatDatesForBackEndSingle(values?.dateOfBirth)
        }
        const id = values?.userId;

        dispatch(asyncUpdateUser({id, request}))
            .unwrap()
            .then(() => {
                resetForm();
                setEdit(false);
            })
            .catch(() => {
            })
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmitEvent
    });

    if (!selectedUser?.userId) {
        return (
            <Paper variant="outlined" sx={{borderRadius: 3, p: 2.5, minHeight: 240, width: '100%'}}>
                <Typography variant="body2" color="text.secondary">
                    Choose a user.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper variant="outlined" sx={{borderRadius: 3, p: 2.5, minHeight: 240, width: '100%'}}>
            <FormikProvider value={formik}>
                <Box sx={{display: "grid", gap: 2}}>
                    <AdminUserRolesCardHeader
                        selectedUser={selectedUser}
                        formik={formik}
                        edit={edit}
                        setEdit={setEdit}
                    />

                    <Divider/>

                    <AdminUserRolesCardBody
                        selectedUser={selectedUser}
                        formik={formik}
                        edit={edit}
                    />
                </Box>
            </FormikProvider>
        </Paper>
    )
}

export default AdminUserRolesCard;