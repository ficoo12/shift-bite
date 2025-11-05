import { redirect } from "react-router-dom";

import SingUpFrom from "./SingupForm";
import { signupUser } from "../features/authState/authSlice";
import { store } from "../app/store";

const SignUp = () => {
  return <SingUpFrom />;
};
export default SignUp;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    password: data.get("password"),
  };

  await store.dispatch(signupUser(authData));

  return redirect("/verify-email");
}
