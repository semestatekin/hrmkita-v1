import React from "react";
import { Navigate } from "react-router-dom";
import { useEmployeeAuth } from "@/contexts/EmployeeAuthContext";

interface EmployeePrivateRouteProps {
  children: React.ReactNode;
}

export const EmployeePrivateRoute: React.FC<EmployeePrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useEmployeeAuth();

  if (!isAuthenticated) {
    return <Navigate to="/employee-login" replace />;
  }

  return <>{children}</>;
};