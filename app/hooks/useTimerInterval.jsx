import { useEffect } from "react";
import useTimerStore from "./useTimerStore";

export const useTimerInterval = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      useTimerStore.setState((state) => ({
        timers: state.timers.map((timer) => {
          if (!timer.isRunning) {
            return timer;
          }

          const onTimerFinish = () => {
            const audio = new Audio("/ring.mp3");
            audio.play();

            if (Notification.permission === "granted") {
              new Notification("Timer finished !");
            }

            return {
              ...timer,
              isRunning: false,
              timeLeft: 0,
            };
          };

          const newTime = timer.endAt - Date.now();

          if (newTime <= 0) {
            return onTimerFinish();
          }

          return {
            ...timer,
            timeLeft: newTime,
          };
        }),
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
};

export default useTimerInterval;
