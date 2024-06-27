import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLeftNav from "../components/DashboardLeftNav";
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
