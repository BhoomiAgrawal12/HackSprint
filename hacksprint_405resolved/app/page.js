// 'use client';
// import { useState, useEffect } from 'react';

// export default function Home() {
//    const [time, setTime] = useState('');
// const [date, setDate] = useState('');
// const [day, setDay] = useState('');
// const [is24HourFormat, setIs24HourFormat] = useState(true);
// const [stopwatchTime, setStopwatchTime] = useState(0);
// const [stopwatchRunning, setStopwatchRunning] = useState(false);
// const [timer, setTimer] = useState('');
// const [timerInterval, setTimerInterval] = useState(null);
// const [alarmTime, setAlarmTime] = useState('');
// const [alarmStatus, setAlarmStatus] = useState('');

// // Function to update time
// const updateTime = () => {
//     const now = new Date();
//     let hours = now.getHours();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();
//     const ampm = hours >= 12 ? 'PM' : 'AM';

//     if (!is24HourFormat) {
//         hours = hours % 12 || 12; // Convert to 12-hour format
//     }

//     setTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${!is24HourFormat ? ampm : ''}`);
//     setDate(now.toLocaleDateString());
//     setDay(now.toLocaleDateString('en-US', { weekday: 'long' }));

//     // Check if alarm time matches current time
//     if (alarmTime && now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) === alarmTime) {
//         triggerAlarm();
//     }
// };

// const pad = (num) => (num < 10 ? `0${num}` : num);

// // Toggle time format
// const toggleFormat = () => setIs24HourFormat(!is24HourFormat);

// // Alarm
// const setAlarm = () => {
//     setAlarmStatus(`Alarm set for ${alarmTime}`);
// };

// const triggerAlarm = () => {
//     setAlarmStatus('ALARM RINGING!');
//     setTimeout(() => setAlarmStatus(''), 10000); // Stop alarm after 10 seconds
// };

// // Stopwatch
// useEffect(() => {
//     let interval;
//     if (stopwatchRunning) {
//         interval = setInterval(() => setStopwatchTime((prevTime) => prevTime + 1), 1000);
//     }
//     return () => clearInterval(interval);
// }, [stopwatchRunning]);

// const startStopwatch = () => setStopwatchRunning(true);
// const stopStopwatch = () => setStopwatchRunning(false);
// const resetStopwatch = () => {
//     setStopwatchTime(0);
//     setStopwatchRunning(false);
// };

// const formatStopwatch = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = time % 60;
//     return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
// };

// // Timer
// const startTimer = (minutes) => {
//     let totalSeconds = minutes * 60;
//     const interval = setInterval(() => {
//         if (totalSeconds <= 0) {
//             clearInterval(interval);
//             setTimer('00:00');
//         } else {
//             totalSeconds--;
//             const displayMinutes = Math.floor(totalSeconds / 60);
//             const displaySeconds = totalSeconds % 60;
//             setTimer(`${pad(displayMinutes)}:${pad(displaySeconds)}`);
//         }
//     }, 1000);
//     setTimerInterval(interval);
// };

// useEffect(() => {
//     // Update the time every second
//     const interval = setInterval(updateTime, 1000);
//     updateTime(); // Call once to avoid delay
//     return () => clearInterval(interval); // Cleanup on component unmount
// }, [alarmTime]);

// return (
//     <div className="clock-container">
//         <div id="time">{time}</div>
//         <div id="date">{date}</div>
//         <div id="day">{day}</div>
//         <button onClick={toggleFormat}>Switch Format</button>

//         {/* Stopwatch */}
//         <div>
//             <button onClick={startStopwatch}>Start Stopwatch</button>
//             <button onClick={stopStopwatch}>Stop Stopwatch</button>
//             <button onClick={resetStopwatch}>Reset Stopwatch</button>
//             <div id="stopwatch">{formatStopwatch(stopwatchTime)}</div>
//         </div>

//         {/* Timer */}
//         <button onClick={setTimer}>Set Timer</button>
//         <div>
//             <input
//                 type="number"
//                 placeholder="Minutes"
//                 onChange={(e) => startTimer(e.target.value)}
//             />
//             <div id="timer">{timer}</div>
//         </div>

//         {/* Alarm */}
//         <div>
//             <label htmlFor="alarmTime">Set Alarm:</label>
//             <input text="black"
//                 type="time"
//                 id="alarmTime"
//                 onChange={(e) => setAlarmTime(e.target.value)}
//             />
//             <button onClick={setAlarm}>Set Alarm</button>
//         </div>
//         <div id="alarmStatus">{alarmStatus}</div>
//     </div>
// );
// }
// // pages/index.js
// import Clock from '../components/Clock';

// export default function Home() {
//   return (
//     <div>
//       <h1>Clock App</h1>
//       <Clock />
//     </div>
//   );
// }


// export default function ScheduleReminder() {
//     const [reminderName, setReminderName] = useState('');
//     const [reminderDate, setReminderDate] = useState('');
//     const [reminderTime, setReminderTime] = useState('');
//     const [scheduledReminder, setScheduledReminder] = useState('');

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!reminderName || !reminderDate || !reminderTime) {
//             alert('Please fill out all fields!');
//             return;
//         }

//         const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
//         const now = new Date();

//         if (reminderDateTime < now) {
//             alert('Please choose a future date and time.');
//             return;
//         }

//         setScheduledReminder(`Reminder "${reminderName}" set for ${reminderDate} at ${reminderTime}.`);

//         // Here, you can add logic to handle the scheduling of the reminder (e.g., saving it in a database or setting a timer).
//     };

//     return (
//         <div className="schedule-container">
//             <h2>Schedule a Reminder</h2>
//             <form onSubmit={handleSubmit} className="reminder-form">
//                 <div>
//                     <label htmlFor="reminderName">Reminder Name:</label>
//                     <input
//                         type="text"
//                         id="reminderName"
//                         value={reminderName}
//                         onChange={(e) => setReminderName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="reminderDate">Reminder Date:</label>
//                     <input
//                         type="date"
//                         id="reminderDate"
//                         value={reminderDate}
//                         onChange={(e) => setReminderDate(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="reminderTime">Reminder Time:</label>
//                     <input
//                         type="time"
//                         id="reminderTime"
//                         value={reminderTime}
//                         onChange={(e) => setReminderTime(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Schedule Reminder</button>
//             </form>

//             {/* Display the scheduled reminder */}
//             {scheduledReminder && <div className="scheduled-reminder">{scheduledReminder}</div>}
//         </div>
//     );
// }


'use client';
import "./globals.css";
import { useState, useEffect } from 'react';

export default function Home() {
    // States for clock, date, day, alarm, etc.
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

    // States for reminder scheduling
    const [reminderName, setReminderName] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [scheduledReminder, setScheduledReminder] = useState('');

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

    // Handle form submission for reminders
    const handleSubmitReminder = (e) => {
        e.preventDefault();

        if (!reminderName || !reminderDate || !reminderTime) {
            alert('Please fill out all fields!');
            return;
        }

        const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
        const now = new Date();

        if (reminderDateTime < now) {
            alert('Please choose a future date and time.');
            return;
        }

        setScheduledReminder(`Reminder "${reminderName}" set for ${reminderDate} at ${reminderTime}.`);
    };

    // useEffect for time updates
    useEffect(() => {
        // Update the time every second
        const interval = setInterval(updateTime, 1000);
        updateTime(); // Call once to avoid delay
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [alarmTime]);

    return (
      <>
        <div className="clock-container">
            <h1>Clock and Reminder App</h1>

            {/* Time, Date, and Day */}
            <div id="time">{time}</div>
            <div id="date">{date}</div>
            <div id="day">{day}</div>
            <button onClick={toggleFormat}>Switch Format</button>

            {/* Stopwatch */}
            <div>
                <h2>Stopwatch</h2>
                <button onClick={startStopwatch}>Start Stopwatch</button>
                <button onClick={stopStopwatch}>Stop Stopwatch</button>
                <button onClick={resetStopwatch}>Reset Stopwatch</button>
                <div id="stopwatch">{formatStopwatch(stopwatchTime)}</div>
            </div>

            {/* Timer */}
            <div>
                <h2>Timer</h2>
                <input
                    type="number"
                    placeholder="Minutes"
                    onChange={(e) => startTimer(e.target.value)}
                />
                <div id="timer">{timer}</div>
            </div>

            {/* Alarm */}
            <div>
                <h2>Set Alarm</h2>
                <label htmlFor="alarmTime">Set Alarm:</label>
                <input
                    type="time"
                    id="alarmTime"
                    onChange={(e) => setAlarmTime(e.target.value)}
                />
                <button onClick={setAlarm}>Set Alarm</button>
                <div id="alarmStatus">{alarmStatus}</div>
            </div>

            {/* Reminder Scheduling */}
            <div className="schedule-container">
                <h2>Schedule a Reminder</h2>
                <form onSubmit={handleSubmitReminder} className="reminder-form">
                    <div>
                        <label htmlFor="reminderName">Reminder Name:</label>
                        <input
                            type="text"
                            id="reminderName"
                            value={reminderName}
                            onChange={(e) => setReminderName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reminderDate">Reminder Date:</label>
                        <input
                            type="date"
                            id="reminderDate"
                            value={reminderDate}
                            onChange={(e) => setReminderDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reminderTime">Reminder Time:</label>
                        <input
                            type="time"
                            id="reminderTime"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Schedule Reminder</button>
                </form>

                {/* Display the scheduled reminder */}
                {scheduledReminder && <div className="scheduled-reminder">{scheduledReminder}</div>}
            </div>
        </div>
        </>
    );
}
