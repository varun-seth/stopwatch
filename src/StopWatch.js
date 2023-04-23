import React, { useState, useRef, useEffect } from 'react';
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
    const titleUpdateRef = useRef(null);

    useEffect(() => {
        return () => {
            document.title = "Stopwatch";
        };
    }, []);


    const startTimer = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - time;
            setIsRunning(true);
            requestRef.current = requestAnimationFrame(updateTimeAndAnimate);

            const updater = () => {
                document.title = `${formatTime(Date.now() - startTimeRef.current, true)} - Stopwatch`;
            }
            updater();
            titleUpdateRef.current = setInterval(updater, 1000); // Update title every second

        }
    };

    const stopTimer = () => {
        if (isRunning) {
            // updateTime is not good enough.
            setTime(Date.now() - startTimeRef.current);
            setIsRunning(false);
            cancelAnimationFrame(requestRef.current);

            clearInterval(titleUpdateRef.current);

        }
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
        clearInterval(titleUpdateRef.current);
        document.title = "Stopwatch";
    };

    const updateTimeAndAnimate = () => {
        // apparently moving this line into a function slows things down.
        setTime(Date.now() - startTimeRef.current);
        requestRef.current = requestAnimationFrame(updateTimeAndAnimate);
    }

    const formatTime = (time, secondsOnly) => {
        let timeSeconds = time / 1000;
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = secondsOnly ? Math.round(timeSeconds % 60) : Math.floor(timeSeconds % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        if (secondsOnly) {
            return formattedTime;
        }
        const milliseconds = Math.floor((timeSeconds % 1) * 100);
        return `${formattedTime}.${milliseconds.toString().padStart(2, '0')}`;
    };


    return (

        <div className="App">
            <header className="App-header">
                <div>
                    <div className='timer-icon'>
                        <TimerIcon style={{ fontSize: '2rem' }} />
                    </div>
                    <h1 style={{
                        fontFeatureSettings: "tnum",
                        fontVariantNumeric: "tabular-nums",
                        marginTop: "25px"
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
