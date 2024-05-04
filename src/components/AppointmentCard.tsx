import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { AppointmentContext } from "../context/Appointment/AppointmentContext";
import { formatDate } from "../helpers/dateHelper";

export type AppointmentType = {
  name: string;
  date: string;
  status: "pending" | "completed" | "canceled";
  id?: number;
};

type PropsType = {
  appointment: AppointmentType;
};

const AppointmentCard = ({ appointment }: PropsType) => {
  const [_, setSelectedAppointment] = useContext(AppointmentContext);
  const navigate = useNavigate();
  const statusStyle = {
    pending: {
      text: "text-blue-500 group-hover:text-white",
      bg: "hover:bg-blue-500",
      heading: "bg-blue-500",
    },
    completed: {
      text: "text-green-500 group-hover:text-white",
      bg: "hover:bg-green-500",
      heading: "bg-green-500",
    },
    canceled: {
      text: "text-red-500 group-hover:text-white",
      bg: "hover:bg-red-500",
      heading: "bg-red-500",
    },
  };
  return (
    <li
      onClick={() => {
        navigate(`/appointment/${appointment.id}`);
        setSelectedAppointment({
          name: appointment.name,
          date: appointment.date,
          status: appointment.status,
          id: appointment.id,
        });
      }}
      className={twMerge(
        "group shadow-lg duration-200 cursor-pointer w-full border flex flex-col justify-between",
        `${statusStyle[appointment.status].bg}`
      )}
    >
      <h2
        className={twMerge(
          "font-bold text-white text-lg md:text-2xl  py-2 px-5",
          `${statusStyle[appointment.status].heading}`
        )}
      >
        {appointment.name}
      </h2>
      <div className=" flex flex-wrap gap-2 justify-between items-end w-full p-5">
        <h1 className=" text-gray-400 group-hover:text-white">
          Status:{" "}
          <span
            className={twMerge(
              "uppercase font-bold",
              `${statusStyle[appointment.status].text}`
            )}
          >
            {appointment.status}
          </span>
        </h1>
        <p className=" font-bold text-secondary-500">
          {formatDate(appointment.date)}
        </p>
      </div>
    </li>
  );
};

export default AppointmentCard;
