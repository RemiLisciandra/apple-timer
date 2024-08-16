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

  const removeTimer = (id) => {
    setTimers((prevTimers) => prevTimers.filter((pt) => pt.id !== id));
  };

  const toggleRunning = (id) => {
    setTimers((prevTimers) => {
      const timerIndex = prevTimers.findIndex((timer) => timer.id === id);

      if (timerIndex === -1) return prevTimers;

      const timerToUpdate = prevTimers[timerIndex];

      if (timerToUpdate.timeLeft === 0) {
        const updatedTimer = {
          ...timerToUpdate,
          timeLeft: timerToUpdate.duration,
          isRunning: false,
        };

        return [
          ...prevTimers.slice(0, timerIndex),
          updatedTimer,
          ...prevTimers.slice(timerIndex + 1),
        ];
      }

      if (!timerToUpdate.isRunning) {
        const updatedTimer = {
          ...timerToUpdate,
          isRunning: true,
          endAt: Date.now() + timerToUpdate.timeLeft,
        };
        return [
          ...prevTimers.slice(0, timerIndex),
          updatedTimer,
          ...prevTimers.slice(timerIndex + 1),
        ];
      }

      if (timerToUpdate.isRunning) {
        const updatedTimer = {
          ...timerToUpdate,
          isRunning: false,
          endAt: timerToUpdate.timeLeft - Date.now(),
        };
        return [
          ...prevTimers.slice(0, timerIndex),
          updatedTimer,
          ...prevTimers.slice(timerIndex + 1),
        ];
      }
    });
  };

  return {
    timers,
    addTimer,
    removeTimer,
    toggleRunning,
  };
};

export default useTimerStore;
