"use client";

import { useState } from "react";
import InputSpacing from "./components/InputSpacing";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Main from "./layouts/Main";
import Title from "./components/Title";

export default function Home() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("01");
  const [seconds, setSeconds] = useState("00");

  const handleHoursChange = (e) => {
    let value = e.target.value.trim();

    if (value === "") {
      setHours("00");
      return;
    }

    if (/^\d{1,2}$/.test(value)) {
      if (value > 24) {
        setHours("23");
      } else {
        setHours(value);
      }
    } else {
      setHours("00");
    }
  };

  const handleMinutesChange = (e) => {
    let value = e.target.value.trim();

    if (value === "") {
      setMinutes("01");
      return;
    }

    if (/^\d{1,2}$/.test(value)) {
      if (value > 59) {
        setMinutes("59");
      } else {
        setMinutes(value);
      }
    } else {
      setMinutes("00");
    }
  };

  const handleSecondsChange = (e) => {
    let value = e.target.value.trim();

    if (value === "") {
      setSeconds("00");
      return;
    }

    if (/^\d{1,2}$/.test(value)) {
      if (value > 59) {
        setSeconds("59");
      } else {
        setSeconds(value);
      }
    } else {
      setSeconds("00");
    }
  };

  return (
    <Main className="min-h-full">
      <Title>Timer</Title>
      <div className="border rounded grid grid-flow-col gap-5 text-center auto-cols-max mt-5 bg-base-200 px-4 py-2">
        <div className="flex flex-col items-center w-40">
          <Input value={hours} onChange={handleHoursChange} />
        </div>
        <InputSpacing />
        <div className="flex flex-col items-center w-40">
          <Input value={minutes} onChange={handleMinutesChange} />
        </div>
        <InputSpacing />
        <div className="flex flex-col items-center w-40">
          <Input value={seconds} onChange={handleSecondsChange} />
        </div>
      </div>
      <div className="mt-4">
        <Button variant="success">Add timer</Button>
      </div>
    </Main>
  );
}
