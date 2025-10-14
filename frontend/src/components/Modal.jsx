import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, children, close }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
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
            className="rounded-sm fixed top-[50%] z-50 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[50px]"
          >
            <div>{children}</div>
            <div
              className="flex hover:bg-gray-100 gap-2 py-3 px-2 rounded-sm max-w-fit absolute top-2 left-2 hover:cursor-pointer transform-all duration-300"
              onClick={close}
            >
              <XMarkIcon className="w-5"></XMarkIcon>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
