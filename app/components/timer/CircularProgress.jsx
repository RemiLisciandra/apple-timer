"use client";

import { useEffect, useRef } from "react";

export const CircularProgress = ({
  className = "",
  timeLeft,
  duration,
  width = 180,
  radiusRatio = 0.9,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const radius = (width / 2) * radiusRatio;
    const center = width / 2;

    context.clearRect(0, 0, width, width);

    context.beginPath();
    context.arc(center, center, radius, 0, 2 * Math.PI);
    context.fillStyle = "#2d2d2d";
    context.fill();

    const progress = (timeLeft / duration) * 2 * Math.PI;

    context.beginPath();
    context.arc(center, center, radius, -Math.PI / 2, -Math.PI / 2 + progress);
    context.lineWidth = 10;
    context.strokeStyle = "#f6d860";
    context.stroke();
  }, [timeLeft, duration, width, radiusRatio]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width={width} height={width}></canvas>
    </div>
  );
};

export default CircularProgress;
