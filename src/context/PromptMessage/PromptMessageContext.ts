import { createContext } from "react";

import { PromptMessageType } from "./PromptMessageProvider";

export const PromptMessageContext = createContext<
  [PromptMessageType, Function]
>([
  {
    message: "",
    description: "",
    type: "success",
    toggle: false,
  },
  () => {},
]);
