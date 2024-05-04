import { createBrowserRouter } from "react-router-dom";

import ProtectedPage from "./components/ProtectedPage";
import AppointmentPage from "./pages/appointment";
import AppointmentDetailPage from "./pages/appointment/appointmentDetail";
import CreateAppointmentPage from "./pages/appointment/create";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
  },
  {
    path: "/appointment",
    element: (
      <ProtectedPage>
        <AppointmentPage />
      </ProtectedPage>
    ),
    children: [
      {
        path: "/appointment/create",
        element: (
          <ProtectedPage>
            <CreateAppointmentPage />
          </ProtectedPage>
        ),
      },
      {
        path: "/appointment/:id",
        element: (
          <ProtectedPage>
            <AppointmentDetailPage />
          </ProtectedPage>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
