import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { addMinutes, format } from "date-fns";

import { createNotification } from "@hooks/useNotification";

const DEFAULT_FOCUS_SESSION = 25;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 30;

const NOTIFICATION_MESSAGES = {
  break: {
    title: "🎯 Sua sessão chegou ao fim. ",
    body: "Sua sessão chegou ao fim, tire um momento para descansar",
  },
  work: {
    title: "💪🏻 Hora de voltar ao trabalho",
    body: "",
  },
};

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const [timerId, setTimerId] = useState();
  const [session, setSession] = useState(1);
  const [onBreak, setOnBreak] = useState(false);
  const [onPause, setOnPause] = useState(false);
  const [endAt, setEndAt] = useState(
    format(addMinutes(new Date(), DEFAULT_FOCUS_SESSION), "HH:mm")
  );
  const timer = { hour: 0, minute: DEFAULT_FOCUS_SESSION, second: 0 };
  const [[hr, min, sec], setTime] = useState([
    timer.hour,
    timer.minute,
    timer.second,
  ]);

  const reset = useCallback(() => {
    setTime([
      parseInt(timer.hour),
      parseInt(
        !onBreak
          ? session % 4
            ? DEFAULT_SHORT_BREAK
            : DEFAULT_LONG_BREAK
          : DEFAULT_FOCUS_SESSION
      ),
      parseInt(timer.second),
    ]);
    setEndAt(
      format(
        addMinutes(
          new Date(),
          !onBreak
            ? session % 4
              ? DEFAULT_SHORT_BREAK
              : DEFAULT_LONG_BREAK
            : DEFAULT_FOCUS_SESSION
        ),
        "HH:mm"
      )
    );
  }, [onBreak, session, timer.hour, timer.second]);

  const tick = useCallback(() => {
    if (hr === 0 && min === 0 && sec === 0) {
      createNotification(
        NOTIFICATION_MESSAGES[onBreak ? "work" : "break"].title,
        NOTIFICATION_MESSAGES[onBreak ? "work" : "break"].body
      );
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
    if (session === 1) {
      setEndAt(
        format(
          addMinutes(
            new Date(),
            !onBreak
              ? session % 4
                ? DEFAULT_SHORT_BREAK
                : DEFAULT_LONG_BREAK
              : DEFAULT_FOCUS_SESSION
          ),
          "HH:mm"
        )
      );
    } else {
      setEndAt(format(addMinutes(new Date(), min), "HH:mm"));
    }
    clearInterval(timerId);
    let currentTimer = setInterval(() => tick(), 1000);
    setTimerId(currentTimer);
    setOnPause(false);
  }, [min, onBreak, session, tick, timerId]);

  const pause = () => {
    clearInterval(timerId);
    setOnPause(true);
  };

  useEffect(() => {
    clearInterval(timerId);
    const currentTimerId = setInterval(() => tick(), 1000);
    setTimerId(currentTimerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const memorizedValues = useMemo(
    () => ({ onPause, session, endAt }),
    [onPause, session, endAt]
  );

  return (
    <TimerContext.Provider
      value={{
        min,
        sec,
        reset,
        timerId,
        start,
        pause,
        onBreak,
        ...memorizedValues,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext };
