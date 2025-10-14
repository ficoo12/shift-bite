import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, selectAllRoles } from "../features/roles/rolesSlice";
import {
  fetchEmployees,
  selectAllEmployees,
} from "../features/employees/employeesSlice";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { eachDayOfInterval, format, isSameDay } from "date-fns";
import Modal from "./Modal";
import { createShift, selectAllShifts } from "../features/shifts/shiftsSlice";
import { fetchShifts } from "../features/shifts/shiftsSlice";
const Schedule = ({ id }) => {
  const [firstDay, setFirstDay] = useState(new Date());
  const [lastDay, setLastDay] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const daysInWeek = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  useEffect(() => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);

    start.setDate(today.getDate() + 1 - today.getDay());

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

    dispatch(createShift(newShift));
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

      <table className="container">
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
              <td className="pl-2">{role.name}</td>
              {daysInWeek.map((day) => {
                const dayShifts = shifts.filter(
                  (shift) =>
                    isSameDay(new Date(shift.date), day) &&
                    shift.restaurant === id &&
                    shift.employee.role === role._id
                );
                return (
                  <td
                    onClick={() => {
                      setSelectedDate(day);
                      setOpen(true);
                    }}
                    className="bg-white  h-20 hover:bg-gray-300 hover:cursor-pointer  border border-lightGray max-w-20 lg:min-w-10 px-2 duration-200 transform-all"
                    key={day}
                  >
                    {dayShifts.length > 0 &&
                      dayShifts.map((shift) => (
                        <div
                          key={shift._id}
                          className="bg-secondary-500 py-2 px-2 rounded-xs"
                        >
                          <p>
                            {shift.employee.name} {shift.employee.surname}
                          </p>
                          <p>
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                      ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name.charAt(0).toUpperCase()}
                  {employee.name.slice(1).toLowerCase()}{" "}
                  {employee.surname.charAt(0).toUpperCase(1)}
                  {employee.surname.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <button className="btnPrimary ">Define new shift</button>
        </form>
      </Modal>
    </div>
  );
};

export default Schedule;
