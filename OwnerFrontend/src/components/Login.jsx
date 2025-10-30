import { redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

import { loginUser } from "../features/authState/authSlice";
import { store } from "../app/store";

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
    const resultAction = await store.dispatch(loginUser(authData));

    if (loginUser.fulfilled.match(resultAction)) {
      return redirect("/");
    } else if (loginUser.rejected.match(resultAction)) {
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
