"use client";

import { useState } from "react";
import InputSpacing from "./components/InputSpacing";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Main from "./layouts/Main";
import Title from "./components/Title";
import Legend from "./components/Legend";
import useTimerStore from "./hooks/useTimerStore";
import Timer from "./components/timer/Timer";
import useTimerInterval from "./hooks/useTimerInterval";
import useHydrateTimers from "./hooks/useHydrateTimers";

export default function Home() {
  useHydrateTimers();
  useTimerInterval();

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
          [type]: "00",
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

  const { addTimer, timers } = useTimerStore();

  const handleAddTimer = () => {
    const ms =
      parseInt(time.hours, 10) * 3600000 +
      parseInt(time.minutes, 10) * 60000 +
      parseInt(time.seconds, 10) * 1000;

    if (ms < 1000) {
      alert("Timer must be at least 1 seconds");
      return;
    }

    addTimer(ms);
  };

  return (
    <Main className="min-h-full">
      <Title>AppleTimer</Title>
      <Legend>hr : min : sec</Legend>
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
        <Button variant="success" onClick={handleAddTimer}>
          Add timer
        </Button>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        {timers.map((timer) => (
          <Timer key={timer.id} propsId={timer.id} />
        ))}
      </div>
    </Main>
  );
}
