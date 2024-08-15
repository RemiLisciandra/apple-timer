"use client";

import { useState } from "react";
import InputSpacing from "./components/InputSpacing";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Main from "./layouts/Main";
import Title from "./components/Title";

export default function Home() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "01",
    seconds: "00",
  });

  const handleChange = (e, type) => {
    let value = e.target.value.trim();

    if (/^\d*$/.test(value)) {
      if (value === "") {
        setTime((prev) => ({
          ...prev,
          [type]: type === "minutes" ? "01" : "00",
        }));
      } else {
        const max = type === "hours" ? 23 : 59;
        setTime((prev) => ({
          ...prev,
          [type]: Math.min(parseInt(value, 10), max)
            .toString()
            .padStart(2, "0"),
        }));
      }
    }
  };

  const handleBlur = (type) => {
    if (time[type].length === 1) {
      setTime((prev) => ({
        ...prev,
        [type]: prev[type].padStart(2, "0"),
      }));
    }
  };

  return (
    <Main className="min-h-full">
      <Title>Timer</Title>
      <div className="flex justify-center pt-5">
        <p className="text-center text-neutral-content">hr : min : sec</p>
      </div>
      <div className="border rounded grid grid-flow-col gap-5 text-center auto-cols-max mt-5 bg-base-200 px-4 py-2">
        <div className="flex flex-col items-center w-40">
          <Input
            value={time.hours}
            onChange={(e) => handleChange(e, "hours")}
            onBlur={() => handleBlur("hours")}
          />
        </div>
        <InputSpacing />
        <div className="flex flex-col items-center w-40">
          <Input
            value={time.minutes}
            onChange={(e) => handleChange(e, "minutes")}
            onBlur={() => handleBlur("minutes")}
          />
        </div>
        <InputSpacing />
        <div className="flex flex-col items-center w-40">
          <Input
            value={time.seconds}
            onChange={(e) => handleChange(e, "seconds")}
            onBlur={() => handleBlur("seconds")}
          />
        </div>
      </div>
      <div className="mt-4">
        <Button variant="success">Add timer</Button>
      </div>
    </Main>
  );
}
