import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { green, lightBlue } from '@mui/material/colors';

import StopWatch from './StopWatch';

const theme = createTheme({
    palette: {
        primary: {
            light: green[300],
            main: green[500],
            dark: green[700],
            contrastText: '#fff',
        },
        secondary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
            contrastText: '#000',
        },
    },
});

function App() {


    return (
        <ThemeProvider theme={theme}>

            <StopWatch></StopWatch>
        </ThemeProvider>
    );
}

export default App;
