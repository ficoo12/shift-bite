import { redirect } from "react-router-dom";
import { logoutUser } from "../features/authState/authSlice";
import { store } from "../app/store";

export async function action() {
  await store.dispatch(logoutUser()).unwrap;

  return redirect("/login");
}
