import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  appearance: "primary" | "danger" | "default";
  loading?: boolean;
  type?: "submit" | "button" | "link";
  href?: string;
};
function Button({
  appearance,
  loading,
  type,
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const staticStyle =
    " inline-block duration-200 font-medium tracking-wider  px-5 py-2 3xl:px-8 3xl:py-4 text-base 3xl:text-lg rounded-lg shadow-md";
  return (
    <>
      {type !== "link" && (
        <button
          type={type}
          disabled={loading}
          className={twMerge(
            staticStyle,
            appearance === "primary" &&
              " bg-primary-500 hover:bg-primary-400 text-white",
            appearance === "default" && "bg-gray-100 hover:bg-gray-200",
            className
          )}
          {...props}
        >
          {loading ? "Loading..." : children}
        </button>
      )}

      {type === "link" && href && (
        <>
          <Link
            to={href}
            className={twMerge(
              staticStyle,
              appearance === "primary" &&
                " bg-primary-500 hover:bg-primary-400 text-white",
              appearance === "default" && "bg-gray-100 hover:bg-gray-200",
              className
            )}
          >
            {children}
          </Link>
        </>
      )}
    </>
  );
}

export default Button;
