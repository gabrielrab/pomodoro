import React, { createContext, useCallback, useEffect, useState } from "react";

const DEFAULT_FOCUS_SESSION = 25;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 30;

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const [timerId, setTimerId] = useState();
  const [session, setSession] = useState(1);
  const [onBreak, setOnBreak] = useState(false);
  const [onPause, setOnPause] = useState(false);
  // const timer = { hour: 0, minute: DEFAULT_FOCUS_SESSION, second: 0 };
  const timer = { hour: 0, minute: 0, second: DEFAULT_FOCUS_SESSION };
  const [[hr, min, sec], setTime] = useState([
    timer.hour,
    timer.minute,
    timer.second,
  ]);

  const reset = useCallback(
    () =>
      setTime([
        parseInt(timer.hour),
        parseInt(timer.minute),
        parseInt(
          !onBreak
            ? session % 4
              ? DEFAULT_SHORT_BREAK
              : DEFAULT_LONG_BREAK
            : DEFAULT_FOCUS_SESSION
        ),
        // parseInt(timer.second),
      ]),
    [onBreak, session, timer.hour, timer.minute]
  );

  const tick = useCallback(() => {
    if (hr === 0 && min === 0 && sec === 0) {
      onBreak && setSession((state) => state + 1);
      setOnBreak(!onBreak);
      reset();
    } else if (min === 0 && sec === 0) {
      setTime([hr - 1, 59, 59]);
    } else if (sec === 0) {
      setTime([hr, min - 1, 59]);
    } else {
      setTime([hr, min, sec - 1]);
    }
  }, [hr, min, onBreak, reset, sec]);

  const start = useCallback(() => {
    setOnPause(false);
    let currentTimer = setInterval(() => tick(), 1000);
    setTimerId(currentTimer);
  }, [tick]);

  const pause = useCallback(() => {
    clearInterval(timerId);
    setOnPause(true);
  }, [timerId]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    setTimerId(timerId);
    return () => clearInterval(timerId);
  }, [tick]);

  return (
    <TimerContext.Provider
      value={{
        min,
        sec,
        reset,
        timerId,
        start,
        onPause,
        pause,
        session,
        onBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext };
