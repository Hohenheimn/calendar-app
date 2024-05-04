import AppointmentForm from "../../../form/appointmentForm";

const CreateAppointmentPage = () => {
  return (
    <AppointmentForm
      formDefaultValue={{
        name: "",
        status: "pending",
        date: "",
      }}
    />
  );
};

export default CreateAppointmentPage;
