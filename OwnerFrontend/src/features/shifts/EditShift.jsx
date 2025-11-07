import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editShift, resetShiftsStatus, selectSingleShift } from "./shiftsSlice";

export default function EditShift() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shift = useSelector((state) => selectSingleShift(state, id));

  console.log(shift);

  const handleChange = (e) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const startTime = elements.startTime.value;
    const endTime = elements.endTime.value;

    dispatch(editShift({ _id: shift._id, startTime, endTime }));

    dispatch(resetShiftsStatus());

    navigate(`/restaurants/${shift.restaurant}`);
  };
  return (
    <>
      <h1>Edit shift</h1>
      <div className="card py-10 px-10 max-w-xl">
        <form onSubmit={handleChange} autoComplete="off" className="space-y-5">
          <div className="flex gap-2">
            <div>
              <label htmlFor="startTime">Start time:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
                defaultValue={shift.startTime}
              ></input>
            </div>
            <div>
              <label htmlFor="endTime">End time:</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                required
                defaultValue={shift.endTime}
              ></input>
            </div>
          </div>

          <button className="btnPrimary ">Change time</button>
        </form>
      </div>
    </>
  );
}
