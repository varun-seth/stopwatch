import React, { useState, useRef } from 'react';
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import './App.css';



function StopWatch() {
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
                    <div className='timer-icon'>
                    <TimerIcon style={{ fontSize: '2rem' }}/>
                    </div>
                    <h1 style={{
                        fontFeatureSettings: "tnum",
                        fontVariantNumeric: "tabular-nums",
                        marginTop:"25px"
                    }}>{formatTime(time)}</h1>
                    <div style={{ display: "flex", justifyContent: "space-around", "alignItems": "center" }}>
                        <Fab style={{ width: '2rem', height: '2rem' }} color={time ? 'warning' : ''} aria-label="reset" onClick={resetTimer} variant="contained"><ClearIcon style={{ fontSize: '1rem' }} /></Fab>
                        {!isRunning && <Fab style={{ width: '3rem', height: '3rem' }} aria-label="start" color='primary' onClick={startTimer} variant="contained"> <PlayArrowIcon style={{ fontSize: '1.5rem' }} /> </Fab>}
                        {isRunning && <Fab style={{ width: '3rem', height: '3rem' }} aria-label="pause" color='secondary' onClick={stopTimer} variant="contained"><PauseIcon style={{ fontSize: '1.5rem' }} /> </Fab>}

                    </div>

                </div>
            </header >
        </div >
    );
}

export default StopWatch;
