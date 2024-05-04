import React from "react";

type ProtectedRouteType = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  return <>{children}</>;
};

export default ProtectedRoute;
