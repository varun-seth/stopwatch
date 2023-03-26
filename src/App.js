import React, { useState, useRef } from 'react';

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
        updateTime();
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
    };

    const updateTime = () => {
        const currentTime = Date.now() - startTimeRef.current;
        setTime(currentTime);
    };
    const updateTimeAndAnimate = () => {
        const currentTime = Date.now() - startTimeRef.current;
        setTime(currentTime);
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
                    {!isRunning && <button onClick={startTimer}>Start</button>}
                    {isRunning && <button onClick={stopTimer}>Stop</button>}
                    <button onClick={resetTimer}>Reset</button>
                </div>

            </header>
        </div>
    );
}

export default App;
