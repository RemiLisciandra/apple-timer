"use client";

import { cva } from "class-variance-authority";
import { useTimerStore } from "@/app/hooks/useTimerStore";
import { X, Play, Pause, RotateCcw } from "lucide-react";

const buttonVariants = cva(
  "absolute bottom-3 flex size-7 items-center justify-center rounded-full p-0",
  {
    variants: {
      type: {
        control: "right-3",
        remove: "left-3 bg-base-300 text-base-content",
        reset: "right-3 bg-success text-success-content",
      },
      isRunning: {
        true: "bg-warning text-warning-content",
        false: "bg-success text-success-content",
      },
    },
    defaultVariants: {
      type: "control",
      isRunning: null,
    },
  }
);

export const TimerControls = ({ id, isRunning, timeLeft }) => {
  const { toggleRunning, removeTimer } = useTimerStore();

  return (
    <>
      <button
        className={buttonVariants({ type: "remove" })}
        onClick={() => removeTimer(id)}
      >
        <X size={14} strokeWidth={2} />
      </button>
      {timeLeft === 0 ? (
        <button
          className={buttonVariants({ type: "reset" })}
          onClick={() => toggleRunning(id)}
        >
          <RotateCcw size={14} strokeWidth={2} />
        </button>
      ) : (
        <button
          className={buttonVariants({ type: "control", isRunning })}
          onClick={() => toggleRunning(id)}
        >
          {isRunning ? (
            <Pause size={14} strokeWidth={2} />
          ) : (
            <Play size={14} strokeWidth={2} />
          )}
        </button>
      )}
    </>
  );
};

export default TimerControls;
