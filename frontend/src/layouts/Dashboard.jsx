import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Dashboard;
