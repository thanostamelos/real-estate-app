import {useDispatch, useSelector} from "react-redux";
import {selectSelectedUserId, selectUsers} from "../../Admin/selectors/AdminSelectors";
import {Grid} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import AdminUserRolesCard from "../../AdminUserRolesCard/containers/AdminUserRolesCard";
import AdminUserList from "../components/AdminUserList";
import {asyncGetAllUsers, clearSelectedUser, setSelectedUser} from "../../../store/slices/data_userAdmin";

const AdminUserRoles = () => {
    const dispatch = useDispatch();

    const users = useSelector(selectUsers);
    const selectedUserId = useSelector(selectSelectedUserId);

    const [query, setQuery] = useState("");

    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;

        return users.filter((u) => {
            const email = (u?.email ?? "").toLowerCase();
            const firstName = (u?.firstName ?? "").toLowerCase();
            const lastName = (u?.lastName ?? "").toLowerCase();
            return email.includes(q) || firstName.includes(q) || lastName.includes(q);
        });
    }, [users, query]);

    useEffect(() => {
        if (!filteredUsers.length) {
            if (selectedUserId) dispatch(clearSelectedUser());
            return;
        }

        if (!selectedUserId) {
            dispatch(setSelectedUser(filteredUsers[0].userId));
            return;
        }

        const exists = filteredUsers.some(
            u => u.userId === selectedUserId
        );

        if (!exists) {
            dispatch(setSelectedUser(filteredUsers[0].userId));
        }
    }, [filteredUsers, selectedUserId, dispatch]);
    
    useEffect(() => {
        if (dispatch && asyncGetAllUsers) {
            dispatch(asyncGetAllUsers());
        }
    }, [dispatch])

    return (
        <Grid
            container
            spacing={2}
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"}
            }}
        >
            <Grid item xs={12} md={4}>
                <AdminUserList
                    query={query}
                    setQuery={setQuery}
                    filteredUsers={filteredUsers}
                />
            </Grid>

            <Grid item xs={12} md={8}>
                <AdminUserRolesCard/>
            </Grid>
        </Grid>
    );
};

export default AdminUserRoles;