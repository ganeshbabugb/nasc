import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  return allowedRoles.find((role) => userInfo?.role === role) ? (
    <Outlet />
  ) : userInfo?.name ? (
    <Navigate to="/results/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Auth;
