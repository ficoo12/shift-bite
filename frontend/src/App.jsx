import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkLoginLoader } from "../utility/auth";
import SignUp, { action as signUpAction } from "./components/Signup";
import LogIn, { action as logInAction } from "./components/Login";
import LogedIn from "./components/LogedIn";
import ErrorPage from "./components/ErrorPage";
import { action as logOutAction } from "./components/Logout";
import Dashboard from "./components/Dashboard";
import { RestaurantsList } from "./features/restaurants/restaurantsList";
import { AddRestaurantForm } from "./features/restaurants/addRestaurantForm";
import { SingleRestaurantPage } from "./features/restaurants/singleRestaurantPage";
import Schedule from "./components/schedule";
import EmployeeRequests from "./components/EmployeeRequests";
import { EditRestaurantForm } from "./features/restaurants/editRestaurantForm";
import { RolesList } from "./features/roles/rolesList";
import { EmployeesList } from "./features/employees/employeesList";
import { AddNewEmployee } from "./features/employees/AddNewEmployee";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogedIn></LogedIn>,
      loader: checkLoginLoader,
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
          path: "/schedule",
          element: <Schedule></Schedule>,
        },
        {
          path: "/employees",
          element: <EmployeesList></EmployeesList>,
        },
        {
          path: "/employeerequests",
          element: <EmployeeRequests></EmployeeRequests>,
        },
        {
          path: "/addNewEmployee",
          element: <AddNewEmployee />,
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
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
