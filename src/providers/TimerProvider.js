import React, { createContext, useMemo, useState } from "react";

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const [session, setSession] = useState(1);

  const value = useMemo(
    () => ({
      session,
      setSession,
    }),
    [session, setSession]
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export { TimerContext };
