import React from "react";
import { useDispatch } from "react-redux";
import { deleteShift, resetShiftsStatus } from "./shiftsSlice";
import { Link } from "react-router-dom";
export default function ShiftItem({ shift }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteShift(id))
      .unwrap()
      .then(() => dispatch(resetShiftsStatus()))
      .catch(() => {
        dispatch(resetShiftsStatus());
      });
  };
  return (
    <div key={shift._id} className="space-y-4">
      <div className="bg-secondary-200 py-2 px-2 rounded-sm z-50 min-w-fit border-2 border-secondary-600">
        <h4 className="font-bold">
          {shift.employee.name} {shift.employee.surname}
        </h4>
        <p>
          {shift.startTime} - {shift.endTime}
        </p>
        <div className="flex flex-col gap-2 mt-2">
          <Link to={`/editShift/${shift._id}`} className="btnManageState">
            Edit Shift
          </Link>
          <button onClick={() => handleDelete(shift._id)} className="btnDelete">
            Delete Shift
          </button>
        </div>
      </div>
    </div>
  );
}
