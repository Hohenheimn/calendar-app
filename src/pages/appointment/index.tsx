import { useContext, useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { CgMenuGridR } from "react-icons/cg";

import { IoMdArrowBack } from "react-icons/io";

import { Outlet, useNavigate, useParams } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { AppointmentType } from "../../components/AppointmentCard";
import Button from "../../components/Button";
import { AppointmentContext } from "../../context/Appointment/AppointmentContext";
import { useFetch } from "../../hooks/api";

const AppointmentPage = () => {
  const [_, __, removeCookie] = useCookies(["user-token"]);
  const [showSideBar, setShowSideBar] = useState(true);
  const { data: appointments } = useFetch(
    "/api/appointment",
    ["apointments-list"],
    true
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSideBar(true);
      } else {
        setShowSideBar(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutHandler = async () => {
    await removeCookie("user-token");
  };

  return (
    <section className=" flex w-full">
      <aside
        className={twMerge(
          " z-50 duration-200 items-start flex flex-col w-full max-w-[20rem] py-5 bg-[#f1f5f9] fixed h-screen md:relative",
          showSideBar && "left-0",
          !showSideBar && "-left-[20rem]"
        )}
      >
        <Button
          appearance={"primary"}
          className={twMerge(
            `absolute inline-block md:hidden`,
            showSideBar && "left-unset right-5",
            !showSideBar && "left-[102%] right-unset"
          )}
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        >
          <CgMenuGridR />
        </Button>
        <Button
          appearance={"default"}
          type="link"
          className=" mb-5 ml-5 bg-secondary-500"
          href="/"
        >
          <IoMdArrowBack />
        </Button>
        <ul className=" w-full ">
          <MenuItem
            appointment={{
              id: undefined,
              name: "",
              date: "",
              status: "pending",
            }}
            label={"ADD APPOINTMENT"}
          />
          <li className="px-5 py-3 text-xl border-b-2 text-primary-500 cursor-pointer font-bold">
            Appointments
          </li>
          {appointments?.map((appointment: AppointmentType, index: number) => (
            <MenuItem
              key={index}
              appointment={appointment}
              label={appointment.name}
            />
          ))}
        </ul>
        <div className=" w-full flex flex-1 justify-center items-end mt-5">
          <Button appearance="primary" onClick={logoutHandler}>
            Log Out
          </Button>
        </div>
      </aside>

      <main className=" flex-1 p-5 pt-20">
        <Outlet />
      </main>
    </section>
  );
};

export default AppointmentPage;

type MenuItemPropType = {
  appointment: AppointmentType;
  label: string;
};

const MenuItem = ({ appointment, label }: MenuItemPropType) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [_, setSelectedAppointment] = useContext(AppointmentContext);
  return (
    <li
      onClick={() => {
        navigate(`/appointment/${appointment.id ? appointment.id : "create"}`);
        setSelectedAppointment({
          name: appointment.name,
          date: appointment.date,
          status: appointment.status,
          id: appointment.id,
        });
      }}
      className={`${
        params.id === appointment?.id?.toString() && "bg-primary-500 text-white"
      } px-5 py-3 hover:bg-secondary-500 duration-200 cursor-pointer font-bold`}
    >
      {label}
    </li>
  );
};
