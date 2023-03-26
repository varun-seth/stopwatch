import React, { useState, useRef } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const refreshRate = 60;

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setTime((time) => time + 1/refreshRate);
        }, 1000/refreshRate);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setTime(0);
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
                    <button onClick={startTimer}>Start</button>
                    <button onClick={stopTimer}>Stop</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>

            </header>
        </div>
    );
}

export default App;
