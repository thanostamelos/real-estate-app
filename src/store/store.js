import {configureStore} from "@reduxjs/toolkit";
import {attachStore} from "./apiClient";

export const store = configureStore({
    reducer: {},
});

attachStore(store);