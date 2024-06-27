import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/superadmin/DashboardHeader";
import DashboardLeftNav from "../components/superadmin/DashboardLeftNav";
export default () => {
  return (
    <>
      <DashboardHeader></DashboardHeader>
      <div className="flex">
        <DashboardLeftNav></DashboardLeftNav>
        <Outlet></Outlet>
      </div>
    </>
  );
};
