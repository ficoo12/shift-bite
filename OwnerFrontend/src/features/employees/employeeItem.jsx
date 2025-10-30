import { Link } from "react-router-dom";

const EmployeeItem = ({ employee, setModal }) => {
  return (
    <tr key={employee._id}>
      <td className="tdEmployee">
        {employee.name.charAt(0).toUpperCase()}
        {employee.name.slice(1)} {employee.surname.charAt(0).toUpperCase()}
        {employee.surname.slice(1)}
      </td>
      <td className="tdEmployee">{employee.role.name}</td>
      <td className="tdEmployee">{employee.email}</td>
      <td className="tdEmployee">{employee.phone}</td>
      <td className="tdEmployee">{employee.restaurant.name}</td>
      <td className="space-x-3 tdEmployee">
        <Link
          to={`/editEmployee/${employee._id}`}
          className="font-bold text-stateManage hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={setModal}
          className="font-bold text-primary-500 hover:underline hover:cursor-pointer"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
export default EmployeeItem;
