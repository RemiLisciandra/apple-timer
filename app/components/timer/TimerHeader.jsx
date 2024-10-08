"use client";

export const TimerHeader = ({ finishDate }) => {
  const formattedTime = finishDate.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex items-center justify-between gap-2 z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-bell"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
      <p>{formattedTime}</p>
    </div>
  );
};

export default TimerHeader;
