import {Box, Divider, TextField} from "@mui/material";
import React from "react";
import {IconSearch} from "@tabler/icons-react";

const AdminUserRolesSearch = ({query, setQuery}) => {


    return (
        <>
            <Box sx={{p: 2}}>
                <TextField
                    fullWidth
                    size="small"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by email/name…"
                    InputProps={{
                        startAdornment: (
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                mr: 1,
                                color: "text.secondary"
                            }}>
                                <IconSearch size={18}/>
                            </Box>
                        )
                    }}
                />
            </Box>
            <Divider/>
        </>
    )
}

export default AdminUserRolesSearch;