import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { createRole } from "./rolesSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
export const AddNewRole = ({ open, close }) => {
  if (open === false) return null;
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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            id="overlay"
            className="fixed bg-black top-0 left-0 bottom-0 min-w-screen opacity-80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
          >
            <form
              className="card px-8 py-8 space-y-4 relative"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div
                className="flex hover:bg-gray-100 gap-2 py-3 px-2 rounded-sm max-w-fit absolute top-2 left-2 hover:cursor-pointer transform-all duration-300"
                onClick={close}
              >
                <XMarkIcon className="w-5"></XMarkIcon>
              </div>
              <div>
                <label>Define new Role:</label>
                <input
                  type="text"
                  id="roleName"
                  name="roleName"
                  required
                  placeholder="Grill master"
                ></input>
              </div>
              <button className="btnPrimary">Save role</button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
