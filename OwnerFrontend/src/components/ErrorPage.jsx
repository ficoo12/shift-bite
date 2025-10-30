import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error("Error caught by ErrorPage:", error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
      <p className="mt-2 text-gray-700">Something went wrong.</p>
      <p className="mt-1 text-sm text-gray-500">
        {error.status && <strong>Status:</strong>} {error.status}
      </p>
      <p className="mt-1 text-gray-500">
        {error.statusText || error.message || "Unknown error"}
      </p>
    </div>
  );
}
