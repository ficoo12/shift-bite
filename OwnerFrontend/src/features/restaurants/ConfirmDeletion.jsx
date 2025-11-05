import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteRestaurant, resetRestaurantStatus } from "./restaurantsSlice";
import { resetEmployeesStatu } from "../employees/employeesSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import generateWord from "../../../helperFunction/GenerateWord";
import { useEffect, useState } from "react";

export const ConfirmDeletion = ({ modal, close, restaurantId }) => {
  if (!modal) return null;
  const [randomWord, setRandomWord] = useState(null);
  const [typedWord, setTypedWord] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setRandomWord(generateWord());
  }, []);

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (randomWord.props.children === typedWord) {
      dispatch(deleteRestaurant(restaurantId));
      dispatch(resetRestaurantStatus());
      dispatch(resetEmployeesStatu());
      close();
    } else {
      setMessage("You entered wrong word");
    }
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
            className="bg-white max-w-fit fixed top-[50%] left-[50%] translate-x-[-40%] translate-y-[-50%] z-50 rounded-sm"
          >
            <XMarkIcon
              onClick={close}
              className="w-5 absolute top-3 left-3 hover:bg-gray-200 rounded-sm duration-200 transition-all cursor-pointer"
            ></XMarkIcon>
            <div className="rounded-sm shadow px-10 py-10 space-y-4">
              <h1 className="text-center uppercase">Important!</h1>
              <p className="text-center max-w-sm">
                This action will delete restaurant and all employees related to
                this restaurant <b>permanently!</b> Type this random generated
                word to proceede with this action.<br></br>
              </p>
              <p className="text-center">Word: {randomWord}</p>
              <input
                autoComplete="off"
                placeholder="type word here..."
                value={typedWord}
                onChange={(e) => setTypedWord(e.target.value)}
              ></input>
              <p className="text-red-500">{message}</p>
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
