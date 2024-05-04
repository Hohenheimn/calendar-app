import React from "react";

import AppointmentProvider from "./Appointment/AppoinmentProvider";
import PromptMessageProvider from "./PromptMessage/PromptMessageProvider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PromptMessageProvider>
      <AppointmentProvider>{children}</AppointmentProvider>
    </PromptMessageProvider>
  );
};

export default ContextProviders;
