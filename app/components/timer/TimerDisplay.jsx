"use client";

export const TimerDisplay = ({ timeText, timeLeftFormatted }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-primary-content">{timeText}</p>
      <p className="text-sm text-neutral-content">{`${timeLeftFormatted.hrs}h ${timeLeftFormatted.mins}min ${timeLeftFormatted.secs}s`}</p>
    </div>
  );
};

export default TimerDisplay;
