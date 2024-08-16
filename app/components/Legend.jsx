"use client";

export const Legend = ({ children }) => {
  return (
    <div className="flex justify-center pt-5">
      <p className="text-center text-neutral-content">{children}</p>
    </div>
  );
};

export default Legend;
