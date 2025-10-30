import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const AddFirstRestaurant = () => {
  return (
    <Link
      to="/addrestaurants"
      className="bg-white max-w-60 min-h-60 flex justify-center items-center shadow rounded-md lg:min-w-60 flex-col hover:bg-secondary-500 transform-all duration-200 ease-in hover:cursor-pointer"
    >
      <PlusIcon className="w-10"></PlusIcon>
      <p>Create first restaurant</p>
    </Link>
  );
};
