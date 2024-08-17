import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const saveTimersToLocalStorage = (timers) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("timers", JSON.stringify(timers));
  }
};

export const useTimerStore = create((set) => ({
  timers: [],
  addTimer: (duration) => {
    const newTimer = {
      id: uuidv4(),
      duration,
      timeLeft: duration,
      endAt: Date.now() + duration,
      isRunning: true,
    };
    set((state) => {
      const updatedTimers = [...state.timers, newTimer];
      saveTimersToLocalStorage(updatedTimers);
      return { timers: updatedTimers };
    });
  },
  removeTimer: (id) =>
    set((state) => {
      const updatedTimers = state.timers.filter((timer) => timer.id !== id);
      saveTimersToLocalStorage(updatedTimers);
      return { timers: updatedTimers };
    }),
  toggleRunning: (id) =>
    set((state) => {
      const updatedTimers = state.timers.map((timer) => {
        if (timer.id !== id) return timer;

        if (!timer.isRunning && timer.timeLeft === 0) {
          return {
            ...timer,
            isRunning: true,
            timeLeft: timer.duration,
            endAt: Date.now() + timer.duration,
          };
        }

        if (!timer.isRunning) {
          return {
            ...timer,
            isRunning: true,
            endAt: Date.now() + timer.timeLeft,
          };
        }

        return {
          ...timer,
          isRunning: false,
          timeLeft: timer.endAt - Date.now(),
        };
      });

      saveTimersToLocalStorage(updatedTimers);
      return { timers: updatedTimers };
    }),
  setTimers: (timers) => set({ timers }),
}));

export default useTimerStore;
