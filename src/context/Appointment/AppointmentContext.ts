import { createContext } from "react";

import { AppointmentType } from "../../components/AppointmentCard";

export const AppointmentContext = createContext<[AppointmentType, Function]>([
  {
    name: "",
    date: "",
    status: "pending",
    id: 0,
  },
  () => {},
]);
