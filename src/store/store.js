import {configureStore} from "@reduxjs/toolkit";
import {attachStore} from "./apiClient";
import data_snackbar from "./slices/data_snackbar";

export const store = configureStore({
    reducer: {
        data_snackbar: data_snackbar
    },
});

attachStore(store);