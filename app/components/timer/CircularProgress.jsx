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
  const previousProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const radius = (width / 2) * radiusRatio;
    const center = width / 2;

    const currentProgress = (timeLeft / duration) * 2 * Math.PI;

    const animateProgress = (start, end) => {
      const startTime = performance.now();

      const draw = (now) => {
        const elapsedTime = now - startTime;
        const animationDuration = 300;
        const t = Math.min(elapsedTime / animationDuration, 1);

        const progress = start + (end - start) * t;

        context.clearRect(0, 0, width, width);

        context.beginPath();
        context.arc(center, center, radius, 0, 2 * Math.PI);
        context.fillStyle = "#2d2d2d";
        context.fill();

        context.beginPath();
        context.arc(
          center,
          center,
          radius,
          -Math.PI / 2,
          -Math.PI / 2 + progress
        );
        context.lineWidth = 10;
        context.strokeStyle = "#ed9619";
        context.stroke();

        if (t < 1) {
          requestAnimationFrame(draw);
        } else {
          previousProgressRef.current = end;
        }
      };

      requestAnimationFrame(draw);
    };

    animateProgress(previousProgressRef.current, currentProgress);
  }, [timeLeft, duration, width, radiusRatio]);

  return (
    <div className={className}>
      <canvas
        className="z-0"
        ref={canvasRef}
        width={width}
        height={width}
      ></canvas>
    </div>
  );
};

export default CircularProgress;
