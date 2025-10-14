import { selectAllRoles, fetchRoles } from "./rolesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AddNewRole } from "./addNewRole";

export const RolesList = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const rolesStatus = useSelector((state) => state.roles.status);
  const error = useSelector((state) => state.roles.error);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (rolesStatus == "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  if (rolesStatus === "loading") return <p>Loading...</p>;
  if (rolesStatus === "failed") return <p>{error}</p>;
  console.log(roles);

  const renderRoles = roles.map((role) => (
    <div
      className="bg-white max-w-60 min-h-60 flex justify-center items-center shadow rounded-md lg:min-w-60"
      key={role._id}
    >
      <h3 className="text-center">{role.name}</h3>
    </div>
  ));

  console.log(renderRoles);

  return (
    <section>
      <h1>Defined roles</h1>

      <div className="flex gap-5 mt-5">
        {renderRoles}
        <div
          onClick={() => setModal(true)}
          className="bg-white max-w-60 min-h-60 flex justify-center items-center shadow rounded-md lg:min-w-60 flex-col hover:bg-secondary-500 transform-all duration-200 ease-in hover:cursor-pointer"
        >
          <PlusIcon className="w-10"></PlusIcon>
          <p>Add role</p>
        </div>
      </div>
      <AddNewRole open={modal} close={() => setModal(false)}></AddNewRole>
    </section>
  );
};
