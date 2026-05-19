import {configureStore} from "@reduxjs/toolkit";
import {attachStore} from "./apiClient";
import data_snackbar from "./slices/data_snackbar";
import data_searchbar from "./slices/data_searchbar";
import data_listings from "./slices/data_listings";
import data_messages from "./slices/data_messages";

export const store = configureStore({
    reducer: {
        data_snackbar,
        data_searchbar,
        data_listings,
        data_messages
    },
});

attachStore(store);
