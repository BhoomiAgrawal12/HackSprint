'use client';
import { useState, useEffect } from 'react';

export default function Home() {
   const [time, setTime] = useState('');
const [date, setDate] = useState('');
const [day, setDay] = useState('');
const [is24HourFormat, setIs24HourFormat] = useState(true);
const [stopwatchTime, setStopwatchTime] = useState(0);
const [stopwatchRunning, setStopwatchRunning] = useState(false);
const [timer, setTimer] = useState('');
const [timerInterval, setTimerInterval] = useState(null);
const [alarmTime, setAlarmTime] = useState('');
const [alarmStatus, setAlarmStatus] = useState('');

// Function to update time
const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (!is24HourFormat) {
        hours = hours % 12 || 12; // Convert to 12-hour format
    }

    setTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${!is24HourFormat ? ampm : ''}`);
    setDate(now.toLocaleDateString());
    setDay(now.toLocaleDateString('en-US', { weekday: 'long' }));

    // Check if alarm time matches current time
    if (alarmTime && now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) === alarmTime) {
        triggerAlarm();
    }
};

const pad = (num) => (num < 10 ? `0${num}` : num);

// Toggle time format
const toggleFormat = () => setIs24HourFormat(!is24HourFormat);

// Alarm
const setAlarm = () => {
    setAlarmStatus(`Alarm set for ${alarmTime}`);
};

const triggerAlarm = () => {
    setAlarmStatus('ALARM RINGING!');
    setTimeout(() => setAlarmStatus(''), 10000); // Stop alarm after 10 seconds
};

// Stopwatch
useEffect(() => {
    let interval;
    if (stopwatchRunning) {
        interval = setInterval(() => setStopwatchTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(interval);
}, [stopwatchRunning]);

const startStopwatch = () => setStopwatchRunning(true);
const stopStopwatch = () => setStopwatchRunning(false);
const resetStopwatch = () => {
    setStopwatchTime(0);
    setStopwatchRunning(false);
};

const formatStopwatch = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

// Timer
const startTimer = (minutes) => {
    let totalSeconds = minutes * 60;
    const interval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            setTimer('00:00');
        } else {
            totalSeconds--;
            const displayMinutes = Math.floor(totalSeconds / 60);
            const displaySeconds = totalSeconds % 60;
            setTimer(`${pad(displayMinutes)}:${pad(displaySeconds)}`);
        }
    }, 1000);
    setTimerInterval(interval);
};

useEffect(() => {
    // Update the time every second
    const interval = setInterval(updateTime, 1000);
    updateTime(); // Call once to avoid delay
    return () => clearInterval(interval); // Cleanup on component unmount
}, [alarmTime]);

return (
    <div className="clock-container">
        <div id="time">{time}</div>
        <div id="date">{date}</div>
        <div id="day">{day}</div>
        <button onClick={toggleFormat}>Switch Format</button>

        {/* Stopwatch */}
        <div>
            <button onClick={startStopwatch}>Start Stopwatch</button>
            <button onClick={stopStopwatch}>Stop Stopwatch</button>
            <button onClick={resetStopwatch}>Reset Stopwatch</button>
            <div id="stopwatch">{formatStopwatch(stopwatchTime)}</div>
        </div>

        {/* Timer */}
        <button onClick={setTimer}>Set Timer</button>
        <div>
            <input
                type="number"
                placeholder="Minutes"
                onChange={(e) => startTimer(e.target.value)}
            />
            <div id="timer">{timer}</div>
        </div>

        {/* Alarm */}
        <div>
            <label htmlFor="alarmTime">Set Alarm:</label>
            <input text="black"
                type="time"
                id="alarmTime"
                onChange={(e) => setAlarmTime(e.target.value)}
            />
            <button onClick={setAlarm}>Set Alarm</button>
        </div>
        <div id="alarmStatus">{alarmStatus}</div>
    </div>
);
}
