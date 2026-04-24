import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './store/store';
import theme from './theme/theme';
import ThemeModeContext from "./theme/ThemeModeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeModeContext theme={theme}>
                <App/>
            </ThemeModeContext>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
