import { useContext } from "react";

import { AppointmentContext } from "../../../context/Appointment/AppointmentContext";
import AppointmentForm from "../../../form/appointmentForm";

const AppointmentDetailPage = () => {
  const [selectedAppointment] = useContext(AppointmentContext);
  return (
    <AppointmentForm
      formDefaultValue={{
        name: selectedAppointment.name,
        status: selectedAppointment.status,
        date: selectedAppointment.date,
      }}
      id={selectedAppointment.id}
    />
  );
};

export default AppointmentDetailPage;
