import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import AuthLayout from "./layouts/AuthLayout";
import ViewData from "./pages/ViewData";
import ProgressForm from "./pages/ProgressForm";
import OneRepMaxForm from "./pages/OneRepMaxForm";
import OrmData from "./pages/OrmData";
import ProgressDetails from "./pages/ProgressDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/addNew",
        element: <ProgressForm />,
      },
      {
        path: "/addORM",
        element: <OneRepMaxForm />,
      },
      {
        path: "/view",
        element: <ViewData />,
      },
      {
        path: "/progress/:id",
        element: <ProgressDetails />,
      },
      {
        path: "/viewORM",
        element: <OrmData />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
