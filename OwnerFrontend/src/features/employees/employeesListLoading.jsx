export const EmployeesListLoading = () => {
  let tableRows = [];
  for (let i = 0; i < 5; i++) {
    tableRows.push(
      <tr key={i}>
        <td className="tdEmployee">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
        <td className="tdEmployee">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
        <td className="tdEmployee">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
        <td className="tdEmployee">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
        <td className="tdEmployee">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
        <td className="space-x-3 tdEmployee flex ">
          <div className="h-3 w-20 animate-pulse bg-gray-300"></div>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table className="tableEmployee">
        <thead>
          <tr>
            <th className="thEmployee">Employee full name</th>
            <th className="thEmployee">Role</th>
            <th className="thEmployee">Email</th>
            <th className="thEmployee">Phone</th>
            <th className="thEmployee">Restaurant</th>
            <th className="thEmployee">Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};
