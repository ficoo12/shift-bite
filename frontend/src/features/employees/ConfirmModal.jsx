import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteEmployee, employeeRemoved } from "./employeesSlice";

export const ConfirmModal = ({ modal, close, employeeId }) => {
  if (!modal) return null;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(employeeRemoved(employeeId));
    dispatch(deleteEmployee(employeeId));
    close();
  };

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-50"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white max-w-fit fixed top-[50%] left-[50%] translate-x-[-40%] translate-y-[-50%] z-50"
          >
            <div className="rounded-sm shadow px-10 py-10 space-y-4">
              <h1 className="text-center">Are you sure?</h1>
              <p className="text-center max-w-sm">
                Are you sure you want to delete employee. You will not be able
                to add he/she to the schedule anymore and all data about this
                employee will dissapear from the database.
              </p>
              <div className="flex justify-center gap-5">
                <button className="btnDelete" onClick={handleDelete}>
                  Continue
                </button>
                <button className="btnManageState" onClick={close}>
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
