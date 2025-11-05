import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { employee, loading } = useSelector((state) => state.auth);

  const [firstDay, setFirstDay] = useState(new Date());
  const [lastDay, setLastDay] = useState(new Date());
  const [dayOfWeek, setDayOfWeek] = useState(new Date());
  let hoursArr = [];
  let sum = 0;

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;

    console.log(dayOfWeek);

    setDayOfWeek(dayOfWeek);

    const start = new Date(today);
    start.setDate(today.getDate() - diffToMonday);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    setFirstDay(start);
    setLastDay(end);
  }, []);

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

  if (loading) return <p>Loading...</p>;

  const renderShifts = employee?.shifts?.map((shift) => {
    const date = new Date(shift.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const currentActive = new Date(shift.date).getDay();

    const day = new Date(shift.date).toLocaleDateString("en-GB", {
      weekday: "short",
    });
    const shiftTime = new Date(shift.date).setHours(0, 0, 0, 0);
    const startTime = new Date(firstDay).setHours(0, 0, 0, 0);
    const endTime = new Date(lastDay).setHours(23, 59, 59, 999);

    if (shiftTime >= startTime && shiftTime <= endTime) {
      const shiftHourss =
        Number(shift.endTime.slice(0, 2)) - Number(shift.startTime.slice(1, 2));

      hoursArr.push(shiftHourss);
      sum = hoursArr.reduce((total, current) => {
        return total + current;
      }, 0);

      return (
        <div
          key={shift._id}
          className={` w-fit px-20 py-10 rounded-sm mt-5 shadow-sm ${
            currentActive === dayOfWeek ? "bg-secondary-500 " : "bg-white"
          }`}
        >
          <p>
            <b>
              {day}: {shift.startTime} - {shift.endTime}
            </b>
          </p>
        </div>
      );
    }
  });

  if (!renderShifts) return <p>Your schedule is empty.</p>;
  return (
    <div>
      <div className="lg:flex lg:justify-between w-full ">
        <h2>Hello {employee?.name}, here is your schedule:</h2>
        <div className="flex gap-4 justify-start pb-4 items-center">
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
      </div>

      <div className="lg:flex lg:flex-wrap lg: gap-x-4">{renderShifts}</div>
      <div className="mt-5 space-y-4 lg:flex justify-between items-center">
        <p>Total hours this week: {sum}</p>
        <button className="btnManageState">Export schedule</button>
      </div>
    </div>
  );
}
