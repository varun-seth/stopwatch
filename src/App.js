import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ClearIcon from '@mui/icons-material/Clear';
import logo from './logo.svg';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(null);
    const requestRef = useRef(null);

    const startTimer = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - time;
            setIsRunning(true);
            requestRef.current = requestAnimationFrame(updateTimeAndAnimate);
        }
    };

    const stopTimer = () => {
        if (isRunning) {
            // updateTime is not good enough.
            setTime(Date.now() - startTimeRef.current);
            setIsRunning(false);
            cancelAnimationFrame(requestRef.current);
        }
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
    };

    const updateTimeAndAnimate = () => {
        // apparently moving this line into a function slows things down.
        setTime(Date.now() - startTimeRef.current);
        requestRef.current = requestAnimationFrame(updateTimeAndAnimate);
    }

    const formatTime = (time) => {
        let timeSeconds = time / 1000;
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = Math.floor(timeSeconds % 60);
        const milliseconds = Math.floor((timeSeconds % 1) * 100);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };


    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1 style={{
                        fontFeatureSettings: "tnum",
                        fontVariantNumeric: "tabular-nums"
                    }}>{formatTime(time)}</h1>
                    {!isRunning && <Fab onClick={startTimer} variant="contained"> <PlayArrowIcon /> </Fab>}
                    {isRunning && <Fab onClick={stopTimer} variant="contained"><StopIcon /> </Fab>}
                    <Fab onClick={resetTimer} variant="contained"><ClearIcon /></Fab>
                </div>
            </header>
        </div>
    );
}

export default App;
