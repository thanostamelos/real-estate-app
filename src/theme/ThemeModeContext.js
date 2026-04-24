import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import buildThemeOptions from './theme';

const STORAGE_KEY = 'ui-color-mode';

export const ColorModeContext = React.createContext({
    mode: 'light',
    setMode: () => {
    },
    toggleColorMode: () => {
    },
});

const ThemeModeContext = ({children}) => {
    const [mode, setMode] = React.useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'dark' || saved === 'light' ? saved : 'light';
    });

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    const toggleColorMode = React.useCallback(() => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const theme = React.useMemo(() => {
        const options = buildThemeOptions(mode);
        return createTheme(options);
    }, [mode]);

    const value = React.useMemo(
        () => ({mode, setMode, toggleColorMode}),
        [mode, toggleColorMode]
    );

    return (
        <ColorModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ThemeModeContext;