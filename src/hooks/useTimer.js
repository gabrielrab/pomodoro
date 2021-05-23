import { useContext } from "react";
import { TimerContext } from "@providers/TimerProvider";

export default function useTimer() {
  const context = useContext(TimerContext);
  return context;
}
