import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const timer = { hour: 0, minute: 0, second: 60 };
  const [[hr, min, sec], setTime] = useState([
    timer.hour,
    timer.minute,
    timer.second,
  ]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const tick = () => {
    if (hr === 0 && min === 0 && sec === 0) reset();
    else if (min === 0 && sec === 0) {
      setTime([hr - 1, 59, 59]);
    } else if (sec === 0) {
      setTime([hr, min - 1, 59]);
    } else {
      setTime([hr, min, sec - 1]);
    }
  };

  const reset = useCallback(
    () =>
      setTime([
        parseInt(timer.hour),
        parseInt(timer.minute),
        parseInt(timer.second),
      ]),
    [timer.hour, timer.minute, timer.second]
  );

  const value = useMemo(() => ({ hr, min, sec, reset }), [hr, min, sec, reset]);

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export { TimerContext };
