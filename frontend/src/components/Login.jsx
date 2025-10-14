import { redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from "axios";

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
    const link = "http://localhost:8080/api/login";

    const response = await axios.post(link, authData);

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const user = response.data.user;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    const accessTokenDuration = new Date();
    accessTokenDuration.setMinutes(accessTokenDuration.getMinutes() + 5);

    const refreshTokenDuration = new Date();
    refreshTokenDuration.setHours(refreshTokenDuration.getHours() + 120);

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem(
      "access_token_duration",
      accessTokenDuration.toISOString()
    );
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem(
      "refresh_token_duration",
      refreshTokenDuration.toISOString()
    );

    return redirect("/");
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 422 || error.response.status === 401)
    ) {
      return { errors: { email: "Invalid email or password" } };
    }
  }
  throw new Response(
    JSON.stringify({ message: "Could not authenticate user." }),
    { status: 500 }
  );
}
