"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { getTimeText, getDurationText } from "./../../utils/timeUtils";
import CircularProgress from "./CircularProgress";
import TimerHeader from "./TimerHeader";
import TimerDisplay from "./TimerDisplay";
import DurationDisplay from "./DurationDisplay";
import TimerControls from "./TimerControls";
import useTimerStore from "../../hooks/useTimerStore";

export const Timer = ({ propsId }) => {
  const timer = useTimerStore((s) => s.timers.find((t) => t?.id === propsId));

  if (!timer) return null;

  const { id, duration, timeLeft, isRunning, endAt } = timer;

  const timeText = getTimeText(timeLeft);
  const durationText = getDurationText(duration);

  return (
    <motion.div
      className={clsx(
        "relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4",
        {
          "brightness-75": timeLeft === 0,
        }
      )}
      animate={timeLeft === 0 ? { y: [0, 5, 0, 5, 0] } : {}}
      transition={
        timeLeft === 0 ? { duration: 0.5, repeat: 3, repeatType: "loop" } : {}
      }
    >
      <div className="relative flex size-full flex-col items-center justify-center gap-1">
        <CircularProgress
          className="absolute"
          timeLeft={timeLeft}
          duration={duration}
          width={180}
          radiusRatio={0.9}
        />
        <TimerHeader finishDate={new Date(endAt)} />
        <TimerDisplay timeText={timeText} />
        <DurationDisplay durationText={durationText} />
      </div>
      <TimerControls id={id} isRunning={isRunning} timeLeft={timeLeft} />
    </motion.div>
  );
};

export default Timer;
