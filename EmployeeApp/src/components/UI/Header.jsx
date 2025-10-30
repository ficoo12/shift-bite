import { Bars2Icon } from "@heroicons/react/24/solid";

const Header = ({ toggleSidebar }) => {
  return (
    <header className=" px-6 py-[16px] flex items-center justify-between">
      <Bars2Icon
        className="w-5 z-50 lg:hidden"
        onClick={toggleSidebar}
      ></Bars2Icon>

      <div className="flex space-x-4 w-full justify-end">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome back</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
