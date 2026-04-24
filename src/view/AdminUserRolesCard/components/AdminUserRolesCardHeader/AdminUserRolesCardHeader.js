import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import AdminUserRolesCardActionButtons from "./AdminUserRolesCardActionButtons";

const AdminUserRolesCardHeader = ({formik, edit, setEdit, selectedUser}) => {

    const displayName = `${selectedUser?.firstName ?? ""} ${selectedUser?.lastName ?? ""}`.trim();
    const hasName = Boolean(displayName);

    return (
        <Box sx={{display: "flex", alignItems: "flex-start", gap: 2}}>
            {edit ?
                <Box sx={{flex: 1, minWidth: 0}}>
                    <Typography variant="h6" sx={{fontWeight: 900}} noWrap>
                        {hasName ? displayName : selectedUser?.email ?? "Unknown user"}
                    </Typography>
                </Box>
                :
                <Box sx={{flex: 1, minWidth: 0}}>
                    <Typography variant="h6" sx={{fontWeight: 900}} noWrap>
                        {hasName ? displayName : selectedUser?.email ?? "Unknown user"}
                    </Typography>
                    {hasName && (
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {selectedUser?.email}
                        </Typography>
                    )}
                    {(selectedUser?.dateOfBirth) && (
                        <Stack direction="row" spacing={1} sx={{mt: 1, flexWrap: "wrap"}}>
                            DOB: {selectedUser?.dateOfBirth}
                        </Stack>
                    )}
                </Box>
            }

            <AdminUserRolesCardActionButtons formik={formik} edit={edit} setEdit={setEdit}/>
        </Box>
    )
}

export default AdminUserRolesCardHeader;