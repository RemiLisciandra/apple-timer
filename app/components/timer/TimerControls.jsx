"use client";

import { cva } from "class-variance-authority";
import { useTimerStore } from "@/app/hooks/useTimerStore";

const buttonVariants = cva(
  "absolute bottom-3 flex size-7 items-center justify-center rounded-full p-0",
  {
    variants: {
      type: {
        remove: "left-3 bg-base-300 text-base-content",
        control: "right-3",
      },
      isRunning: {
        true: "bg-warning text-warning-content",
        false: "bg-success text-success-content",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      type: "control",
      isRunning: false,
      disabled: false,
    },
  }
);

export const TimerControls = ({ id, isRunning, timeLeft }) => {
  const toggleRunning = useTimerStore((s) => s.toggleRunning);
  const removeTimer = useTimerStore((s) => s.removeTimer);

  const isDisabled = timeLeft === 0;

  return (
    <>
      <button
        className={buttonVariants({ type: "remove" })}
        onClick={() => removeTimer(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>

      <button
        className={buttonVariants({
          type: "control",
          isRunning,
          disabled: isDisabled,
        })}
        onClick={() => !isDisabled && toggleRunning(id)}
        disabled={isDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-play"
        >
          {isRunning ? (
            <rect x="6" y="4" width="4" height="16"></rect>
          ) : (
            <polygon points="6 3 20 12 6 21 6 3"></polygon>
          )}
        </svg>
      </button>
    </>
  );
};

export default TimerControls;
