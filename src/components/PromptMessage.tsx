import { useContext, useEffect } from "react";

import { twMerge } from "tailwind-merge";

import { PromptMessageContext } from "../context/PromptMessage/PromptMessageContext";

const PromptMessage = () => {
  const [message, setMessage] = useContext(PromptMessageContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        message: "",
        description: "",
        type: "success",
        toggle: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  });
  return (
    <div
      className={twMerge(
        ` text-white fixed right-3 top-3 bg-white border p-5`,
        message.type === "success" && "bg-green-500",
        message.type === "error" && "bg-red-500"
      )}
    >
      <h1 className=" text-lg font-bold">{message.message}</h1>
      <p>{message.description}</p>
    </div>
  );
};

export default PromptMessage;
