import { useContext, useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import imgBuilding from "../../assets/building.jpg";
import Button from "../../components/Button";
import ControllerField from "../../components/ControllerField";
import { PromptMessageContext } from "../../context/PromptMessage/PromptMessageContext";
import { usePost } from "../../hooks/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [_, setMessage] = useContext(PromptMessageContext);
  const [cookies, setCookie] = useCookies(["user-token"]);
  const token = cookies?.["user-token"];

  const [error, setError] = useState("");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSuccess = (data: any) => {
    setCookie("user-token", data?.data?.user?.id);
    navigate("/");
  };
  const onError = (error: any) => {
    setMessage({
      message: error?.response?.data,
      type: "error",
      toggle: true,
    });
  };

  const { mutate: login, isPending: loggingIn } = usePost(
    "/login",
    onSuccess,
    onError
  );

  const submitHandler = (data: { email: string; password: string }) => {
    setError("");
    login(data);
  };

  return (
    <section className="flex w-full bg-white">
      <aside className="h-screen flex-1 bg-primary-500 fixed md:relative">
        <img
          src={imgBuilding}
          className=" w-full h-full object-cover"
          alt="building"
        />
      </aside>
      <article className=" bg-[#f5f5f58b] relative z-10 w-full md:w-[55%] flex text-center flex-col justify-center items-center gap-10">
        <h1 className=" text-2xl md:text-3xl font-bold">
          <span className=" text-primary-500">MULTISYS</span> CALENDAR{" "}
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className=" space-y-5 w-11/12 max-w-[30rem]"
        >
          <ControllerField
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"email"}
            placeholder={"Email"}
            type={"email"}
          />
          <ControllerField
            control={control}
            errors={errors}
            rules={{ required: "required" }}
            name={"password"}
            placeholder={"Password"}
            type={"password"}
          />

          {error && <p className=" text-red-500">{error}</p>}

          <Button
            type="submit"
            appearance={"primary"}
            loading={loggingIn}
            className=" w-full py-3 text-lg"
          >
            LOGIN
          </Button>
        </form>
      </article>
    </section>
  );
};

export default LoginPage;
