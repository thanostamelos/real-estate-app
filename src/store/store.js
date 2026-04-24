import data_auth from "./slices/data_auth";
import data_reservation from "./slices/data_reservation";
import data_calendar from "./slices/data_calendar";
import {configureStore} from "@reduxjs/toolkit";
import data_menu from "./slices/data_menu";
import data_snackbar from "./slices/data_snackbar";
import {attachStore} from "./apiClient";
import data_userAdmin from "./slices/data_userAdmin";
import data_screen from "./slices/data_screen";
import data_movies from "./slices/data_movies";
import data_entryLog from "./slices/data_entryLog";

export const store = configureStore({
    reducer: {
        data_auth: data_auth,
        data_reservation: data_reservation,
        data_calendar: data_calendar,
        data_menu: data_menu,
        data_snackbar: data_snackbar,
        data_userAdmin: data_userAdmin,
        data_screen: data_screen,
        data_movies: data_movies,
        data_entryLog: data_entryLog,
    },
});

attachStore(store);