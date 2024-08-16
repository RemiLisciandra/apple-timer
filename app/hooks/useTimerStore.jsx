import create from "zustand";
import { v4 as uuidv4 } from "uuid";

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
    set((state) => ({
      timers: [...state.timers, newTimer],
    }));
  },
  removeTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    })),
  toggleRunning: (id) =>
    set((state) => ({
      timers: state.timers.map((timer) => {
        if (timer.id !== id) return timer;

        if (!timer.isRunning && timer.timeLeft === 0) {
          return {
            ...timer,
            isRunning: true,
            timeLeft: timer.duration,
            endAt: Date.now() + timer.duration,
          };
        }

        return {
          ...timer,
          isRunning: !timer.isRunning,
          endAt: timer.isRunning
            ? Date.now() + timer.timeLeft
            : timer.endAt - Date.now(),
        };
      }),
    })),
}));

export default useTimerStore;
