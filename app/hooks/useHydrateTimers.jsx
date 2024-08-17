import { useEffect } from "react";
import { useTimerStore } from "./useTimerStore";

export const useHydrateTimers = () => {
  const setTimers = useTimerStore((state) => state.setTimers);

  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    setTimers(storedTimers);
  }, [setTimers]);
};

export default useHydrateTimers;
