import React, { useState, useRef } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const refreshRate = 60;

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTime((time) => time + 1/refreshRate);
        }, 1000/refreshRate);
        setIsRunning(true);

    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log({"intervalRef.current": intervalRef.current})
        setIsRunning(false);

    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
        setIsRunning(false);

    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const milliseconds = Math.floor((time % 1) * 100);
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
