"use client";

import { cva } from "class-variance-authority";

const buttonVariant = cva("btn", {
  variants: {
    variant: { success: "btn-success" },
  },
  defaultVariants: {
    variant: "success",
  },
});

export const Button = ({
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      className={buttonVariant({ variant })}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
