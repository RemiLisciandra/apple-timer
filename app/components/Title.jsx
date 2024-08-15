"use client";

export const Title = ({ children }) => {
  return (
    <h1 className="font-bold text-lg border rounded px-4 py-2 bg-base-200 border-base-200">
      {children}
    </h1>
  );
};

export default Title;
