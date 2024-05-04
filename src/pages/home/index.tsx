import { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import AppointmentCard, {
  AppointmentType,
} from "../../components/AppointmentCard";
import Button from "../../components/Button";
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
  const [_, __, removeCookie] = useCookies(["user-token"]);
  const [filter, setFilter] = useState("all");
  const [appointmentList, setAppointmentList] = useState<AppointmentType[]>([]);
  const { data: appointments } = useFetch(
    "/appointment",
    ["apointments-list", filter],
    true
  );

  useEffect(() => {
    const filterAppointment = appointments?.filter(
      (appointment: AppointmentType) => appointment.status === filter
    );
    if (filter === "all") {
      setAppointmentList(appointments);
    } else {
      setAppointmentList(filterAppointment);
    }
  }, [appointments, filter]);

  const logoutHandler = async () => {
    await removeCookie("user-token");
  };
  return (
    <section className=" w-full p-5 md:p-10">
      <div className=" flex flex-wrap justify-between items-center mb-5 gap-5">
        <h1 className=" font-bold text-3xl text-secondary-500">
          <span className=" text-primary-500 whitespace-nowrap">CALENDAR</span>{" "}
          APP
        </h1>
        <div className=" flex items-center gap-2">
          <p className=" whitespace-nowrap">Filter By Status:</p>
          <Select
            selectOptions={filterOptions}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {appointmentList?.map((appointment: AppointmentType, index: number) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))}
      </ul>
      <div className=" w-full flex justify-end mt-5">
        <Button appearance="primary" type="link" href="/appointment/create">
          ADD APPOINTMENT
        </Button>
      </div>
      <div className=" w-full flex justify-end mt-5">
        <Button appearance="primary" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
