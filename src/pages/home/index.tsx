import { useEffect, useState } from "react";

import { format } from "date-fns";

import { useCookies } from "react-cookie";

import AppointmentCard, {
  AppointmentType,
} from "../../components/AppointmentCard";
import Button from "../../components/Button";
import Calendar from "../../components/calendar";
import Select from "../../components/Select";
import { useFetch } from "../../hooks/api";

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Canceled",
    value: "canceled",
  },
];

const HomePage = () => {
  const today = new Date();
  const [_, __, removeCookie] = useCookies(["user-token"]);
  const [appointmentList, setAppointmentList] = useState<AppointmentType[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: appointmentsCalendar } = useFetch(
    "/api/appointment",
    ["apointments-list"],
    true
  );

  useEffect(() => {
    if (selectedStatus === "all") {
      let filterAppointment = appointmentsCalendar?.filter(
        (appointment: AppointmentType) => appointment.date === selectedDate
      );
      setAppointmentList(filterAppointment);
    } else {
      let filterAppointment = appointmentsCalendar?.filter(
        (appointment: AppointmentType) =>
          appointment.date === selectedDate &&
          appointment.status === selectedStatus
      );
      setAppointmentList(filterAppointment);
    }
  }, [appointmentsCalendar, selectedDate, selectedStatus]);

  const logoutHandler = async () => {
    await removeCookie("user-token");
  };
  return (
    <section className=" w-full p-5 md:p-10">
      <Button appearance="primary" onClick={logoutHandler} className=" mb-5">
        Log Out
      </Button>
      <div className=" flex flex-wrap justify-between items-center mb-5 gap-5">
        <h1 className=" font-bold text-3xl text-secondary-500">
          <span className=" text-primary-500 whitespace-nowrap">CALENDAR</span>{" "}
          APP
        </h1>
        <div className=" flex items-center gap-2">
          <p className=" whitespace-nowrap">Filter By Status:</p>
          <Select
            selectOptions={filterOptions}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
          />
        </div>
      </div>
      <div className=" w-full flex justify-end my-5">
        <Button appearance="primary" type="link" href="/appointment/create">
          ADD APPOINTMENT
        </Button>
      </div>

      <div className=" flex flex-wrap items-start gap-5">
        <div className=" w-full md:w-2/4">
          <Calendar
            selectedDate={selectedDate}
            appointmentsDate={appointmentsCalendar?.map(
              (item: AppointmentType) => item.date
            )}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>

        <ul className=" flex-1  gap-5 grid grid-col-1 lg:grid-cols-2">
          {appointmentList?.map(
            (appointment: AppointmentType, index: number) => (
              <AppointmentCard key={index} appointment={appointment} />
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
