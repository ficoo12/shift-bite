export const RolesLoading = () => {
  let rolesSkeletons = [];
  for (let i = 0; i <= 3; i++) {
    rolesSkeletons.push(
      <div
        className="bg-gray-300 max-w-60 min-h-60 flex justify-center items-center shadow rounded-md lg:min-w-60 animate-pulse"
        key={i}
      ></div>
    );
  }
  return <div className="flex gap-5 mt-5">{rolesSkeletons}</div>;
};
