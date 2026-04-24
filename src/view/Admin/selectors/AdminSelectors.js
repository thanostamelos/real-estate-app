import {createSelector} from "reselect";

const selectDataUserAdmin = (state) => state.data_userAdmin;

export const selectUsers = createSelector(
    [selectDataUserAdmin], (dataUserAdmin) => dataUserAdmin?.users ?? []);

export const selectSelectedUserId = createSelector(
    [selectDataUserAdmin], (dataUserAdmin) => dataUserAdmin?.selectedUserId ?? null);

export const selectSelectedUser = createSelector(
    [selectUsers, selectSelectedUserId],
    (users, selectedId) =>
        users.find(u => u.userId === selectedId) ?? null
);


const selectDataAuth = (state) => state.data_auth;

export const selectAuth = createSelector(
    [selectDataAuth], (dataAuth) => dataAuth?.authData ?? {});

