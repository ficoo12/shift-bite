import { redirect } from "react-router-dom";
import { store } from "../app/store";
import { logoutEmployee } from "../features/auth/authSlice";

export async function action() {
  await store.dispatch(logoutEmployee()).unwrap;

  return redirect("/login");
}
