import { Form, Link, NavLink } from "react-router-dom";
import logo from "../../../public/Logo.svg";
import { ChartBarIcon } from "@heroicons/react/24/solid";
const Sidebar = ({ isOpen }) => {
  return (
    <>
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out transform mt-[56px] lg:mt-[0px] 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <div className="p-4 border-b border-[#2222222e]">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "LinkActive flex items-center gap-2"
                : "Link flex items-center gap-2 duration-100 transform ease-in"
            }
          >
            <ChartBarIcon className="w-5 h-5"></ChartBarIcon>
            <p>Dashboard</p>
          </NavLink>

          <Form action="/logout" method="POST">
            <button className="btnPrimary mt-4">LOGOUT</button>
          </Form>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
