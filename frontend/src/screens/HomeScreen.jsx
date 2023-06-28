import { useSelector } from "react-redux";
import { userRoles } from "../utils/constants/roles";
import AdminHomeScreen from "./home/AdminHomeScreen";
import StaffHomeScreen from "./home/StaffHomeScreen";
import StudentHomeScreen from "./home/StudentHomeScreen";
import SuperAdminHomeScreen from "./home/SuperAdminHomeScreen";
import Unauthorized from "./results/unauthorized/Unauthorized";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const getHomeScreenByRole = (role) => {
    switch (role) {
      case userRoles.student:
        return <StudentHomeScreen />;
      case userRoles.staff:
        return <StaffHomeScreen />;
      case userRoles.admin:
        return <AdminHomeScreen />;
      case userRoles.superadmin:
        return <SuperAdminHomeScreen />;
      default:
        return <Unauthorized />;
    }
  };
  const homeScreen = getHomeScreenByRole(userInfo?.role);
  return homeScreen;
};

export default HomeScreen;
