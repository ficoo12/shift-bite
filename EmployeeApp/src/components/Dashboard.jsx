import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const employee = useSelector((state) => state.auth.employee);
  console.log(employee);

  const renderShifts = employee.shifts.map((shift) => {
    const date = new Date(shift.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const day = new Date(shift.date).toLocaleDateString("en-GB", {
      weekday: "short",
    });

    return (
      <div>
        <p>
          {day}: {shift.startTime} - {shift.endTime}
        </p>
      </div>
    );
  });

  return (
    <div>
      Hello {employee?.name} here is your schedule: {renderShifts}
    </div>
  );
}
