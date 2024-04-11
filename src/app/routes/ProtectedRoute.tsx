import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../features/admin/component/AdminDashboard";
import UserDashboard from "../../features/users/components/UserDashboard";

const ProtectedRoute = (props: any) => {
  const { Component, Role } = props;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role_id");
  useEffect(() => {

    if (!token) {
      navigate("/login");
    } else if (Role.role === "AdminDashboard" && userRole !== "1") {
      navigate("/"); 
    } else if (Role.role === "UserDashboard" && userRole !== "2") {
      navigate("/"); 

    }
  }, []);

  return (
    <>
      {Role.role === "AdminDashboard" && userRole === "1" && <AdminDashboard />}
      {Role.role === "UserDashboard" && userRole === "2" && <UserDashboard />}
    </>
  );
};

export default ProtectedRoute;
