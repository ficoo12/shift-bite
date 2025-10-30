import { redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

import { store } from "../app/store";
import { loginEmployee } from "../features/auth/authSlice";

const LogIn = () => {
  return <LoginForm />;
};
export default LogIn;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const resultAction = await store.dispatch(loginEmployee(authData));

    if (loginEmployee.fulfilled.match(resultAction)) {
      return redirect("/");
    } else if (loginEmployee.rejected.match(resultAction)) {
      return { errors: { email: "Invalid email or password" } };
    }
  } catch (error) {
    console.error(error);
    throw new Response(
      JSON.stringify({ message: "Could not authenticate user." }),
      { status: 500 }
    );
  }
  throw new Response(
    JSON.stringify({ message: "Could not authenticate user." }),
    { status: 500 }
  );
}
