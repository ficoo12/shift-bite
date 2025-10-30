import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const CreateFirstEmployee = () => {
  return (
    <tr>
      <td>
        <Link
          to="/addNewEmployee"
          className="bg-white  flex gap-5 justify-center items-center shadow rounded-md lg:min-w-60 hover:bg-secondary-500 transform-all duration-200 ease-in hover:cursor-pointer mt-5 ml-3 mb-5"
        >
          <PlusIcon className="w-7"></PlusIcon>
          <p>Create first employee</p>
        </Link>
      </td>
    </tr>
  );
};
