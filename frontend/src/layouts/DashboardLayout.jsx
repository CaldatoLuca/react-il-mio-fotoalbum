import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/superadmin/DashboardHeader";
import DashboardLeftNav from "../components/superadmin/DashboardLeftNav";
export default () => {
  return (
    <>
      <DashboardHeader></DashboardHeader>
      <div className="flex">
        <DashboardLeftNav></DashboardLeftNav>
        <div className="bg-neutral-200 text-neutral-800 flex-grow p-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
