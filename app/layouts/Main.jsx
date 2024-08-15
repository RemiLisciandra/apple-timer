"use client";

export const Main = ({ children }) => {
  return (
    <main className="min-h-full">
      <div className="flex flex-col items-center justify-center py-4">
        {children}
      </div>
    </main>
  );
};

export default Main;
