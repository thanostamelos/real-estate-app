import React from "react";
import {Box, Chip, Paper, Typography, useMediaQuery} from "@mui/material";
import {IconUser} from "@tabler/icons-react";
import {useTheme} from "@mui/material/styles";
import AdminUserRolesSearch from "./AdminUserRolesSearch";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectSelectedUserId} from "../../Admin/selectors/AdminSelectors";
import {setSelectedUser} from "../../../store/slices/data_userAdmin";

const AdminUserList = ({query, setQuery, filteredUsers}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const authData = useSelector(selectAuth);
    const selectedUserId = useSelector(selectSelectedUserId);

    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const handleSelectUser = (userId) => {
        dispatch(setSelectedUser(userId));
    };

    return (
        <Paper variant="outlined" sx={{borderRadius: 3, overflow: "hidden"}}>
            <AdminUserRolesSearch query={query} setQuery={setQuery}/>

            <Box
                sx={{
                    maxHeight: isMdUp ? "calc(100vh - 280px)" : "auto",
                    overflowY: isMdUp ? "auto" : "visible",
                    p: 1.5,
                    display: "grid",
                    gap: 1
                }}
            >
                {filteredUsers.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{p: 1}}>
                        No users found.
                    </Typography>
                )}

                {filteredUsers.map((u) => {
                    const active = Boolean(u?.active);
                    const isYou = u?.email === authData?.email;
                    const isSelected = u.userId === selectedUserId;
                    const fullName = `${u?.firstName ?? ""} ${u?.lastName ?? ""}`.trim();
                    const displayName = isYou ? `You (${fullName})` : fullName;
                    const hasName = Boolean(displayName);

                    return (
                        <Paper
                            key={u.userId}
                            variant="outlined"
                            onClick={() => handleSelectUser(u.userId)}
                            sx={{
                                p: 1.5,
                                borderRadius: 2.5,
                                cursor: "pointer",
                                boxShadow: isSelected ? 5 : 'none',
                                borderColor: isSelected ? "primary.main" : "divider",
                                backgroundColor: isSelected ? "rgba(30, 58, 138, 0.06)" : "background.paper"
                            }}
                        >
                            <Box sx={{display: "flex", alignItems: "center", gap: 1.25}}>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 2,
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: "primary.main",
                                        color: "#fff",
                                        flexShrink: 0
                                    }}
                                >
                                    <IconUser size={18}/>
                                </Box>

                                <Box sx={{minWidth: 0, flex: 1}}>
                                    <Typography fontSize={16} fontWeight={700} noWrap>
                                        {hasName ? displayName : u?.email ?? "Unknown user"}
                                    </Typography>

                                    {hasName && (
                                        <Typography variant="caption" color="text.secondary" noWrap>
                                            {u?.email}
                                        </Typography>
                                    )}
                                </Box>

                                <Chip
                                    size="small"
                                    label={active ? "Active" : "Inactive"}
                                    color={active ? "success" : "default"}
                                    variant={active ? "filled" : "outlined"}
                                    sx={{ml: "auto"}}
                                />
                            </Box>

                            <Box sx={{mt: 1, display: "flex", gap: 0.75, flexWrap: "wrap"}}>
                                {u?.roles && u?.roles?.slice(0, 3).map((r) => (
                                    <Chip key={r} size="small" label={r} variant="outlined"/>
                                ))}
                                {u?.roles?.length > 3 && (
                                    <Chip size="small" label={`+${(u.roles.length - 3)}`} variant="outlined"/>
                                )}
                                {(!u?.roles || u?.roles.length <= 0) && (
                                    <Chip size="small" label="No roles" variant="outlined"/>
                                )}
                            </Box>
                        </Paper>
                    );
                })}
            </Box>
        </Paper>
    )
}

export default AdminUserList;