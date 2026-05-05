import {configureStore} from "@reduxjs/toolkit";
import {attachStore} from "./apiClient";
import data_snackbar from "./slices/data_snackbar";
import data_searchbar from "./slices/data_searchbar";

export const store = configureStore({
    reducer: {
        data_snackbar: data_snackbar,
        data_searchbar: data_searchbar
    },
});

attachStore(store);