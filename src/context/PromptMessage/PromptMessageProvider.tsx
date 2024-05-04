import React from "react";

import { PromptMessageContext } from "./PromptMessageContext";

export type PromptMessageType = {
  message: string;
  description: string;
  type: "success" | "error";
  toggle: boolean;
};

const PromptMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = React.useState<PromptMessageType>({
    message: "",
    description: "",
    type: "success",
    toggle: false,
  });
  return (
    <PromptMessageContext.Provider value={[message, setMessage]}>
      {children}
    </PromptMessageContext.Provider>
  );
};

export default PromptMessageProvider;
