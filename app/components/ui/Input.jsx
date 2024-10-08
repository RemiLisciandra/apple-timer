"use client";

import { cva } from "class-variance-authority";

const inputVariant = cva(
  "text-8xl bg-inherit text-center w-40 focus:bg-accent focus:outline-none rounded"
);

export const Input = ({
  type = "text",
  name = "",
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <input
      className={inputVariant()}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default Input;
