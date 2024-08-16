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
    set((state) => {
      const timerIndex = state.timers.findIndex((timer) => timer.id === id);

      if (timerIndex === -1) return state;

      const timerToUpdate = state.timers[timerIndex];

      if (timerToUpdate.timeLeft === 0) {
        const updatedTimer = {
          ...timerToUpdate,
          timeLeft: timerToUpdate.duration,
          isRunning: false,
        };
        return {
          timers: [
            ...state.timers.slice(0, timerIndex),
            updatedTimer,
            ...state.timers.slice(timerIndex + 1),
          ],
        };
      }

      if (!timerToUpdate.isRunning) {
        const updatedTimer = {
          ...timerToUpdate,
          isRunning: true,
          endAt: Date.now() + timerToUpdate.timeLeft,
        };
        return {
          timers: [
            ...state.timers.slice(0, timerIndex),
            updatedTimer,
            ...state.timers.slice(timerIndex + 1),
          ],
        };
      }

      if (timerToUpdate.isRunning) {
        const updatedTimer = {
          ...timerToUpdate,
          isRunning: false,
          timeLeft: timerToUpdate.endAt - Date.now(),
        };
        return {
          timers: [
            ...state.timers.slice(0, timerIndex),
            updatedTimer,
            ...state.timers.slice(timerIndex + 1),
          ],
        };
      }
    }),
}));

export default useTimerStore;
