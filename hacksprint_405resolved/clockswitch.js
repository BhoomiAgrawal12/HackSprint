// components/Clock.js
import { useEffect, useState } from 'react';

export default function Clock() {
  const [isDigital, setIsDigital] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const switchClock = () => {
    setIsDigital(!isDigital);
  };

  // Calculate time for analog clock
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

  return (
    <div>
      {isDigital ? (
        <div id="digital-clock">
          <p>{time.toLocaleTimeString()}</p>
          <p>{time.toLocaleDateString()}</p>
        </div>
      ) : (
        <div id="analog-clock" className="analog-clock">
          <div className="clock-face">
            <div
              className="hand hour-hand"
              style={{ transform: `rotate(${hoursDegrees}deg)` }}
            />
            <div
              className="hand minute-hand"
              style={{ transform: `rotate(${minutesDegrees}deg)` }}
            />
            <div
              className="hand second-hand"
              style={{ transform: `rotate(${secondsDegrees}deg)` }}
            />
          </div>
        </div>
      )}

      <button onClick={switchClock}>
        {isDigital ? 'Switch to Analog' : 'Switch to Digital'}
      </button>

      <style jsx>{`
        .analog-clock {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .clock-face {
          width: 200px;
          height: 200px;
          border: 8px solid black;
          border-radius: 50%;
          position: relative;
        }
        .hand {
          position: absolute;
          width: 50%;
          height: 6px;
          background: black;
          top: 50%;
          transform-origin: 100%;
          transition: all 0.05s;
        }
        .hour-hand {
          height: 8px;
        }
        .minute-hand {
          height: 4px;
        }
        .second-hand {
          height: 2px;
          background: red;
        }
      `}</style>
    </div>
  );
}
