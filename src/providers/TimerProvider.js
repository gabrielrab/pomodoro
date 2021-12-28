import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const [timerId, setTimerId] = useState();
  const timer = { hour: 0, minute: 25, second: 0 };
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
        parseInt(timer.second),
      ]),
    [timer.hour, timer.minute, timer.second]
  );

  const tick = useCallback(() => {
    if (hr === 0 && min === 0 && sec === 0) reset();
    else if (min === 0 && sec === 0) {
      setTime([hr - 1, 59, 59]);
    } else if (sec === 0) {
      setTime([hr, min - 1, 59]);
    } else {
      setTime([hr, min, sec - 1]);
    }
  }, [hr, min, reset, sec]);

  const start = useCallback(() => {
    let currentTimer = setInterval(() => tick(), 1000);
    setTimerId(currentTimer);
  }, [tick]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    setTimerId(timerId);
    return () => clearInterval(timerId);
  }, [tick]);

  // const tick = () => {
  //   if (hr === 0 && min === 0 && sec === 0) reset();
  //   else if (min === 0 && sec === 0) {
  //     setTime([hr - 1, 59, 59]);
  //   } else if (sec === 0) {
  //     setTime([hr, min - 1, 59]);
  //   } else {
  //     setTime([hr, min, sec - 1]);
  //   }
  // };

  // const value = useMemo(
  //   () => ({ hr, min, sec, reset, timerId, start }),
  //   [hr, min, sec, reset, timerId, start]
  // );

  return (
    <TimerContext.Provider value={{ hr, min, sec, reset, timerId, start }}>
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext };
