import React, { useEffect, useState } from "react";
import EmpHead from "./HeaderComponent-Emp";
import ManagerHead from "./HeaderComp-Manager";
import AdminHead from "./HeaderComp-Admin";
import SuperAdminHead from "./HeaderComponent-SuperAdmin";

function Main() {
    const [type, setType] = useState("Employee");

    useEffect(() => {
      const type = localStorage.getItem("type");
      setType(type);
    }, []);
  switch (type) {
    case "Employee":
      return (
        <div>
          <EmpHead />
        </div>
      );

      case "Manager":
      return (
        <div>
          <ManagerHead />
        </div>
      );

      case "Admin":
      return (
        <div>
          <AdminHead />
        </div>
      );

      case "SuperAdmin":
      return (
        <div>
          <SuperAdminHead />
        </div>
      );

    default:
      return (
        <div>
          <EmpHead />
        </div>
      );
  }
}

export default Main;
