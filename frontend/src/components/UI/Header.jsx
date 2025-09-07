import { Bars2Icon } from "@heroicons/react/24/solid";
const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <Bars2Icon
        className="w-5 z-50 lg:hidden"
        onClick={toggleSidebar}
      ></Bars2Icon>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Admin</span>
      </div>
    </header>
  );
};

export default Header;
