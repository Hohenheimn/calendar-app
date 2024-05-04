import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";

import Button from "../../components/Button";
import ControllerField from "../../components/ControllerField";
import { PromptMessageContext } from "../../context/PromptMessage/PromptMessageContext";
import { useDelete, usePost, usePut } from "../../hooks/api";
import appointmentSchema from "./schema";

type formType = z.infer<typeof appointmentSchema>;

type PropType = {
  formDefaultValue: formType;
  id?: number;
};

const AppointmentForm = ({ formDefaultValue, id }: PropType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, setMessage] = useContext(PromptMessageContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<formType>({
    defaultValues: formDefaultValue,
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    reset(formDefaultValue);
  }, [formDefaultValue]);

  const onSuccess = () => {
    if (!id) {
      reset();
    }
    queryClient.invalidateQueries({ queryKey: ["apointments-list"] });
    setMessage({
      message: `Appointment ${id ? "Updated" : "created"} successfully`,
      description:
        "You can check your appointments in your dashboard and Sidebar",
      type: "success",
      toggle: true,
    });
  };

  const onError = () => {
    setMessage({
      message: "Something went wrong",
      description: "Please try again later",
      type: "error",
      toggle: true,
    });
  };

  const { mutate: addAppointment, isPending: addLoading } = usePost(
    "/appointment",
    onSuccess,
    onError
  );

  const { mutate: UpdateAppointment, isPending: updateLoading } = usePut(
    `/appointment/${id}`,
    onSuccess,
    onError
  );

  const { mutate: deleteAppointment, isPending: deleteLoading } = useDelete(
    `/appointment/${id}`,
    () => {
      setMessage({
        message: "Appointment deleted successfully ",
        description: "You will be redirect to dashboard",
        type: "success",
        toggle: true,
      });
      navigate("/");
    },
    onError
  );

  const submitHandler = (data: formType) => {
    if (id) {
      UpdateAppointment(data);
    } else {
      addAppointment(data);
    }
  };

  return (
    <section className="flex w-full">
      <article className=" w-full flex flex-col gap-5">
        <div className=" flex flex-wrap justify-between items-center gap-2">
          <h1 className=" text-primary-500 font-bold text-3xl">
            <span className=" text-secondary-500">{id ? "UPDATE" : "ADD"}</span>{" "}
            APPOINTMENT
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className=" space-y-5 w-full"
        >
          <ControllerField
            control={control}
            errors={errors}
            name={"name"}
            label={"Name"}
            type={"text"}
          />
          <ControllerField
            control={control}
            errors={errors}
            name={"date"}
            label={"Date"}
            type={"date"}
          />

          <ControllerField
            control={control}
            errors={errors}
            name={"status"}
            label={"Status"}
            type={"select"}
            selectOptions={[
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
            ]}
          />

          <div className=" flex w-full justify-end gap-5">
            {id && (
              <Button
                type="button"
                appearance={"primary"}
                loading={deleteLoading}
                className=" text-lg flex items-center gap-2"
                onClick={() => deleteAppointment()}
              >
                <RiDeleteBin6Line /> DELETE
              </Button>
            )}
            <Button
              type="submit"
              appearance={"primary"}
              loading={addLoading || updateLoading}
              className=" text-lg flex items-center gap-2"
            >
              {id ? (
                <>
                  <MdOutlineModeEdit />
                  UPDATE
                </>
              ) : (
                <>
                  <IoIosAddCircleOutline />
                  ADD
                </>
              )}
            </Button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default AppointmentForm;
