import { selectAllRoles, fetchRoles } from "./rolesSlice";
import { AddNewRole } from "./addNewRole";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const RolesList = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const rolesStatus = useSelector((state) => state.roles.status);
  const error = useSelector((state) => state.roles.error);

  useEffect(() => {
    if (rolesStatus == "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  if (rolesStatus === "loading") return <p>Loading...</p>;
  if (rolesStatus === "failed") return <p>{error}</p>;
  console.log(roles);

  const renderRoles = roles.map((role) => (
    <div key={role._id}>
      <p>{role.name}</p>
    </div>
  ));

  console.log(renderRoles);

  return (
    <section>
      <AddNewRole></AddNewRole>
      <h1>Defined roles</h1>
      <div>{renderRoles}</div>
    </section>
  );
};
