import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Auth from "./components/Auth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import BankDetailsScreen from "./screens/BankDetailsScreen.jsx";
import AcademicDetails from "./screens/forms/AcademicDetails.jsx";
import StaffDetails from "./screens/forms/StaffDetailPage.jsx";
import StudentDetails from "./screens/forms/StudentDetails.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import NotFoundPage from "./screens/results/404/NotFoundPage.jsx";
import UnderConstruction from "./screens/results/construction/PageConstruction.jsx";
import Loading from "./screens/results/loading/Loading.jsx";
import Success from "./screens/results/success/Success.jsx";
import Unauthorized from "./screens/results/unauthorized/Unauthorized.jsx";
import SuperAdminRegisterPage from "./screens/SuperAdminRegisterScreen.jsx";
import BankDetailTable from "./screens/tables/BankDetailTable.jsx";
import StudentDetailTable from "./screens/tables/StudentDetailTable.jsx";
import store from "./store";
import { userRoles } from "./utils/constants/roles.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<SuperAdminRegisterPage />} />

      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />}>
          {/* Get Home Page Based On User Roles */}
          <Route index={true} path="/" element={<HomeScreen />} />
        </Route>

        {/* Results Routes */}
        <Route path="/results" element={<Dashboard />}>
          <Route path="underconstruction" element={<UnderConstruction />} />
          <Route path="loading" element={<Loading />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="success" element={<Success />} />
        </Route>
      </Route>

      <Route path="" element={<Dashboard />}>
        {/* RBA : STAFF, ADMIN, SUPERADMIN */}
        <Route
          element={
            <Auth
              allowedRoles={[
                userRoles.staff,
                userRoles.admin,
                userRoles.superadmin,
              ]}
            />
          }
        >
          <Route path="/bank-details-table" element={<BankDetailTable />} />
          <Route
            path="/student-detail-table"
            element={<StudentDetailTable />}
          />
        </Route>

        {/* RBA : STUDENT, STAFF, ADMIN */}
        <Route
          element={
            <Auth
              allowedRoles={[
                userRoles.student,
                userRoles.staff,
                userRoles.admin,
              ]}
            />
          }
        >
          <Route path="/bank-detail" element={<BankDetailsScreen />} />
        </Route>

        {/* RBA : ONLY STUDENT */}
        <Route element={<Auth allowedRoles={[userRoles.student]} />}>
          <Route path="/student-detail" element={<StudentDetails />} />
          <Route path="/academic-detail" element={<AcademicDetails />} />
        </Route>

        {/* RBA : ONLY STAFF */}
        <Route element={<Auth allowedRoles={[userRoles.staff]} />}>
          <Route path="/staff-detail" element={<StaffDetails />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);
