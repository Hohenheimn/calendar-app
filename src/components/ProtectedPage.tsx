import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user-token"]);
  const token = cookies?.["user-token"];
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export default ProtectedPage;
