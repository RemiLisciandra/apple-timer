"use client";

export const TimerDisplay = ({ timeText }) => {
  return (
    <div className="flex flex-col items-center justify-center z-10">
      <p className="text-base-content text-2xl">{timeText}</p>
    </div>
  );
};

export default TimerDisplay;
