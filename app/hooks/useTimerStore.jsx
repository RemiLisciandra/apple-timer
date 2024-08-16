import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTimerStore = () => {
  const [timers, setTimers] = useState([]);

  const addTimer = (duration) => {
    const newTimer = {
      id: uuidv4(),
      duration,
      timeLeft: duration,
      endAt: Date.now() + duration,
      isRunning: false,
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  return {
    timers,
    addTimer,
  };
};

export default useTimerStore;
