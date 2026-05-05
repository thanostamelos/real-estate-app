const buildThemeOptions = (mode = 'light') => ({
    palette: {
        mode,
        primary: {
            main: '#1E3A8A',
            hover: '#2554d8',
            color: '#FFFFFF',
            dark: '#070e29',
        },
        secondary: { main: '#F59E0B' },
        background:
            mode === 'dark'
                ? { default: '#0B1220', paper: '#0F172A', grey: '#3b4153' }
                : { default: '#F5F7FB', paper: '#FFFFFF', grey: '#f6f6f6' },
        text:
            mode === 'dark'
                ? { default: '#dbdbdb', hover: '#fff' }
                : { default: '#0B1220', hover: '#0F172A' },

        calendar: {
            cardColors:
                mode === 'dark'
                    ? ['#5b6877', '#52796F', '#6b577e', '#4A6B8C']
                    : ['#B8C4D1', '#A8D5BA', '#D6C2E8', '#AFCBE3'],
        },
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: [
            'Inter',
            'system-ui',
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

export default buildThemeOptions;