import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { createRole } from "./rolesSlice";
export const AddNewRole = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.roleName.value;

    const newRole = {
      name,
    };

    dispatch(createRole(newRole));
    form.reset();
  };

  return (
    <section className="max-w-2xl">
      <form
        className="card px-5 py-5 space-y-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div>
          <label>Define new Role:</label>
          <input type="text" id="roleName" name="roleName" required></input>
        </div>
        <button className="btnPrimary">Save role</button>
      </form>
    </section>
  );
};
