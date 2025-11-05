import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, selectAllRoles } from "../features/roles/rolesSlice";
import {
  fetchEmployees,
  selectAllEmployees,
} from "../features/employees/employeesSlice";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { eachDayOfInterval, format, isSameDay } from "date-fns";
import Modal from "./Modal";
import {
  createShift,
  resetShiftsStatus,
  selectAllShifts,
} from "../features/shifts/shiftsSlice";
import { fetchShifts } from "../features/shifts/shiftsSlice";
import { Link } from "react-router-dom";
import ShiftItem from "../features/shifts/ShiftItem";
const Schedule = ({ id }) => {
  const [firstDay, setFirstDay] = useState(new Date());
  const [lastDay, setLastDay] = useState(new Date());
  const [roleName, setRoleName] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const daysInWeek = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    const start = new Date(today);
    start.setDate(today.getDate() - diffToMonday);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    setFirstDay(start);
    setLastDay(end);
  }, []);

  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const rolesStatus = useSelector((state) => state.roles.status);
  const error = useSelector((state) => state.roles.error);

  const employees = useSelector(selectAllEmployees);
  const employeesStatus = useSelector((state) => state.employees.status);

  console.log(employees);

  const shifts = useSelector(selectAllShifts);
  const shiftsStatus = useSelector((state) => state.shifts.status);

  useEffect(() => {
    if (shiftsStatus === "idle") {
      dispatch(fetchShifts());
    }
  }, [shiftsStatus, dispatch]);

  useEffect(() => {
    if (rolesStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  if (rolesStatus === "failed") return <p>{error}</p>;

  useEffect(() => {
    if (employeesStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employeesStatus, dispatch]);

  const getPrevWeek = () => {
    setFirstDay((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });

    setLastDay((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };
  const getNextWeek = () => {
    setFirstDay((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });

    setLastDay((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const defineShift = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;
    const restaurantId = id;
    const employeeId = form.employee.value;

    console.log(startTime, endTime, restaurantId, employeeId, selectedDate);

    const newShift = {
      restaurant: restaurantId,
      employee: employeeId,
      startTime: startTime,
      endTime: endTime,
      date: selectedDate,
    };

    dispatch(createShift(newShift))
      .unwrap()
      .then(() => {
        dispatch(resetShiftsStatus());
      })
      .catch(() => {
        dispatch(resetShiftsStatus());
      });
    form.reset();
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex gap-4 w-full justify-start pb-4">
        <ArrowLeftIcon
          onClick={() => getPrevWeek()}
          className="w-5 hover:cursor-pointer"
        />
        <h3>
          {format(firstDay, "dd-MMM")} - {format(lastDay, "dd-MMM")}
        </h3>
        <ArrowRightIcon
          onClick={() => getNextWeek()}
          className="w-5 hover:cursor-pointer"
        />
      </div>
      <div className="w-full overflow-x-scroll lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[1350px] ">
        <table className="min-w-[1500px]">
          <thead>
            <tr>
              <th className="bg-white text-left pl-2">Roles</th>
              {weekdays.map((day) => {
                return (
                  <th
                    key={day}
                    className="bg-lightGray border border-lightGray font-normal py-2 "
                  >
                    {day}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id} className="bg-white border border-lightGray">
                <td className="pl-2 max-w-10">{role.name}</td>
                {daysInWeek.map((day) => {
                  const dayShifts = shifts.filter(
                    (shift) =>
                      isSameDay(new Date(shift.date), day) &&
                      shift.restaurant === id &&
                      shift.employee.role === role._id
                  );
                  return (
                    <td
                      className=" border border-lightGray max-w-20 px-4 duration-200 transform-all py-4"
                      key={day}
                    >
                      {dayShifts.length > 0 ? (
                        <div className="space-y-3">
                          {dayShifts.map((shift) => (
                            <ShiftItem
                              key={shift._id}
                              shift={shift}
                            ></ShiftItem>
                          ))}
                          <div
                            onClick={() => {
                              setSelectedDate(day);
                              setOpen(true);
                              setRoleName(role.name);
                            }}
                            className="bg-gray-50 flex flex-col items-center justify-center py-10 hover:bg-gray-100 hover:cursor-pointer"
                          >
                            <p className="text-center">Add more shifts</p>
                            <PlusCircleIcon className="w-10 text-gray-300"></PlusCircleIcon>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setSelectedDate(day);
                            setOpen(true);
                            setRoleName(role.name);
                          }}
                          className="bg-gray-50 flex justify-center py-10 hover:bg-gray-100 hover:cursor-pointer"
                        >
                          <PlusCircleIcon className="w-10 text-gray-300"></PlusCircleIcon>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DEFINE NEW SHIFT MODAL */}
      <Modal open={open} close={() => setOpen(false)}>
        <h1 className="text-center">Define new shift</h1>
        <form onSubmit={defineShift} autoComplete="off" className="space-y-5">
          <div className="flex gap-2">
            <div>
              <label htmlFor="startTime">Start time:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="endTime">End time:</label>
              <input type="time" id="endTime" name="endTime" required></input>
            </div>
          </div>

          <div>
            <label htmlFor="employee">Choose employee:</label>
            <select
              id="employee"
              name="employee"
              required
              className="bg-white w-full px-4 py-4 border border-textDark rounded-sm"
            >
              {employees.map((employee) =>
                employee.role.name === roleName &&
                employee.restaurant._id === id ? (
                  <option key={employee._id} value={employee._id}>
                    {employee.name.charAt(0).toUpperCase()}
                    {employee.name.slice(1).toLowerCase()}{" "}
                    {employee.surname.charAt(0).toUpperCase(1)}
                    {employee.surname.slice(1).toLowerCase()}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <button className="btnPrimary">Define new shift</button>
        </form>
      </Modal>
    </div>
  );
};

export default Schedule;
