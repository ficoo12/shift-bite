import { Bars2Icon } from "@heroicons/react/24/solid";
import imgUser from "../../../public/userImg.png";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="px-6 py-[11.5px] flex items-center justify-between bg-white border-b border-[#2222222e]">
      <Bars2Icon
        className="w-5 z-50 lg:hidden"
        onClick={toggleSidebar}
      ></Bars2Icon>

      <div className="flex w-full justify-end">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome, {user.name}</p>
          <img className="w-10" src={imgUser}></img>
        </div>
      </div>
    </header>
  );
};

export default Header;
