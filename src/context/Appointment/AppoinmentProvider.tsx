import React from "react";

import { AppointmentType } from "../../components/AppointmentCard";
import { AppointmentContext } from "./AppointmentContext";

const AppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<AppointmentType>({
      name: "",
      date: "",
      status: "pending",
      id: 0,
    });
  return (
    <AppointmentContext.Provider
      value={[selectedAppointment, setSelectedAppointment]}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
