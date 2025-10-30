import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogedIn from "./components/LogedIn";
import { checkAuth } from "./features/auth/authSlice";
import ErrorPage from "../../OwnerFrontend/src/components/ErrorPage";
import Dashboard from "./components/Dashboard";
import LogIn, { action as logInAction } from "./components/Login";
import { action as logOutAction } from "./components/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogedIn></LogedIn>,
      loader: checkAuth,
      errorElement: <ErrorPage></ErrorPage>,
      children: [{ index: true, element: <Dashboard></Dashboard> }],
    },
    {
      path: "/login",
      element: <LogIn></LogIn>,
      action: logInAction,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/logout",
      action: logOutAction,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
