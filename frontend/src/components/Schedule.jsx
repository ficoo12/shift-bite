import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, selectAllRoles } from "../features/roles/rolesSlice";
import { useEffect } from "react";

const Schedule = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectAllRoles);
  const rolesStatus = useSelector((state) => state.roles.status);
  const error = useSelector((state) => state.roles.error);

  useEffect(() => {
    if (rolesStatus === "idle") {
      dispatch(fetchRoles());
    }
  }, [rolesStatus, dispatch]);

  if (rolesStatus === "failed") return <p>{error}</p>;
  const renderRoles = roles.map((role) => <p>{role.name}</p>);
  return (
    <>
      <div id="container">
        <div id="header">
          <div id="monthDisplay"></div>
          <div>
            <button id="backButton">Back</button>
            <button id="nextButton">Next</button>
          </div>
        </div>

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar"></div>
      </div>

      <div id="newEventModal">
        <h2>New Event</h2>

        <input id="eventTitleInput" placeholder="Event Title" />

        <button id="saveButton">Save</button>
        <button id="cancelButton">Cancel</button>
      </div>

      <div id="deleteEventModal">
        <h2>Event</h2>

        <p id="eventText"></p>

        <button id="deleteButton">Delete</button>
        <button id="closeButton">Close</button>
      </div>
    </>
  );
};

export default Schedule;
