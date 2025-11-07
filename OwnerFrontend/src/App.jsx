import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkAuth } from "./features/authState/authSlice";
import SignUp, { action as signUpAction } from "./components/Signup";
import LogIn, { action as logInAction } from "./components/Login";
import LogedIn from "./components/LogedIn";
import ErrorPage from "./components/ErrorPage";
import { action as logOutAction } from "./components/Logout";
import Dashboard from "./components/Dashboard";
import { RestaurantsList } from "./features/restaurants/restaurantsList";
import { AddRestaurantForm } from "./features/restaurants/addRestaurantForm";
import { SingleRestaurantPage } from "./features/restaurants/singleRestaurantPage";
import { EditRestaurantForm } from "./features/restaurants/editRestaurantForm";
import { RolesList } from "./features/roles/rolesList";
import { EmployeesList } from "./features/employees/employeesList";
import { AddNewEmployee } from "./features/employees/AddNewEmployee";
import { EditEmployee } from "./features/employees/editEmployee";
import { VerifyEmail } from "./components/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { EditShift } from "./features/shifts/editShift";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogedIn></LogedIn>,
      loader: checkAuth,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <Dashboard></Dashboard>,
        },
        {
          path: "/restaurants",
          element: <RestaurantsList></RestaurantsList>,
        },
        {
          path: "/restaurants/:id",
          element: <SingleRestaurantPage></SingleRestaurantPage>,
        },
        {
          path: "/addrestaurants",
          element: <AddRestaurantForm></AddRestaurantForm>,
        },
        {
          path: "/editRestaurant/:id",
          element: <EditRestaurantForm></EditRestaurantForm>,
        },
        {
          path: "/roles",
          element: <RolesList></RolesList>,
        },

        {
          path: "/employees",
          element: <EmployeesList></EmployeesList>,
        },
        {
          path: "/addNewEmployee",
          element: <AddNewEmployee />,
        },
        {
          path: "/editEmployee/:id",
          element: <EditEmployee />,
        },
        {
          path: "/editShift/:id",
          element: <EditShift />,
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUp></SignUp>,
      action: signUpAction,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LogIn></LogIn>,
      action: logInAction,
      errorElement: <ErrorPage />,
    },
    {
      path: "/logout",
      action: logOutAction,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail></VerifyEmail>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
