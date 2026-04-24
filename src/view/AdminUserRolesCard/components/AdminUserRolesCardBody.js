import {Box, Chip, Typography} from "@mui/material";
import React, {useCallback} from "react";
import SimpleTextFilterFormik
    from "../../../utils/filters/formikProvider/SimpleTextFilterFormik";
import SimpleDateFilterFormik
    from "../../../utils/filters/formikProvider/SimpleDateFilterFormik";
import {dateInputFormat} from "../../../constants/formatConstants";
import CustomCheckbox from "../../../utils/filters/formikProvider/CustomCheckbox";
import {APPLICATION_ROLES} from "../../../constants/ApplicationRoles";

const AdminUserRolesCardBody = ({formik, edit, selectedUser}) => {
    const {values, setFieldValue} = formik;

    const setRoles = useCallback((value) => {
        if (!value) return;

        const roles = values?.roles;

        if (roles?.length <= 0) {
            setFieldValue('roles', [value]);
        }

        if (roles.includes(value)) {
            const filtered = roles.filter(a => a !== value);
            setFieldValue('roles', filtered);
        } else {
            setFieldValue('roles', [...roles, value]);
        }
    }, [setFieldValue, values])

    return (
        <>
            {edit && <Box sx={{display: 'flex', alignItems: 'center', gap: 2, flexWrap: "wrap"}}>
                <SimpleTextFilterFormik name="email"/>
                <SimpleTextFilterFormik name="firstName"/>
                <SimpleTextFilterFormik name="lastName"/>
                <SimpleDateFilterFormik
                    name={'dateOfBirth'}
                    inputFormat={dateInputFormat}
                    views={['day', 'month', 'year']}
                />
            </Box>}

            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="subtitle1" sx={{fontWeight: 800}}>
                    Roles
                </Typography>
                {!edit ? (
                    <Chip
                        size="small"
                        label={selectedUser?.active ? "Active" : "Inactive"}
                        color={selectedUser?.active ? "success" : "default"}
                        variant={selectedUser?.active ? "filled" : "outlined"}
                        sx={{ml: "auto"}}
                    />
                ) : (
                    <CustomCheckbox
                        label="Active"
                        checked={values?.active}
                        onClick={() =>
                            setFieldValue(
                                'active',
                                !values.active
                            )
                        }
                        sx={{width: 231}}
                    />
                )}
            </Box>

            {edit &&
                <>

                    <Box sx={{display: "flex", gap: 1, alignItems: "center", mt: 1}}>
                        <CustomCheckbox
                            label={APPLICATION_ROLES.ADMIN}
                            checked={values?.roles.includes(APPLICATION_ROLES.ADMIN)}
                            onClick={() =>
                                setRoles(APPLICATION_ROLES.ADMIN)
                            }
                            sx={{width: 231}}
                        />
                    </Box>

                    <Box sx={{display: "flex", gap: 1, alignItems: "center", mt: 1}}>
                        <CustomCheckbox
                            label={APPLICATION_ROLES.TICKET_ADMIN}
                            checked={values?.roles.includes(APPLICATION_ROLES.TICKET_ADMIN)}
                            onClick={() =>
                                setRoles(APPLICATION_ROLES.TICKET_ADMIN)
                            }
                            sx={{width: 231}}
                        />
                    </Box>

                    <Box sx={{display: "flex", gap: 1, alignItems: "center", mt: 1}}>
                        <CustomCheckbox
                            label={APPLICATION_ROLES.USER}
                            checked={values?.roles.includes(APPLICATION_ROLES.USER)}
                            onClick={() =>
                                setRoles(APPLICATION_ROLES.USER)
                            }
                            sx={{width: 231}}
                        />
                    </Box>
                </>
            }

            <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                {values?.roles?.length > 0 ? values?.roles.map((role) => (
                    <Chip
                        key={role}
                        label={role}
                        variant={'outlined'}
                    />
                )) : (
                    <Chip label="No roles assigned" variant="outlined"/>
                )}
            </Box>
        </>
    )
}

export default AdminUserRolesCardBody;