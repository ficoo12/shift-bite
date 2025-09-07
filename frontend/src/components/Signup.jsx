import { redirect } from "react-router-dom";
import axios from "axios";
import SingUpFrom from "./SingupForm";

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

  const link = "http://localhost:8080/api/users";

  const response = await axios.post(link, authData);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return { message: "Could not authenticate user." }, { status: 500 };
  }

  const responseData = await response;
  const accessToken = responseData.access_token;
  const refreshToken = responseData.refresh_token;

  const accessTokenDuration = new Date();
  const refreshTokenDuration = new Date();
  accessTokenDuration.setMinutes(accessToken.getMinutes() + 5);
  refreshTokenDuration.setMinutes(refreshToken.getHours() + 120);
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem(
    "access_token_duration",
    accessTokenDuration.toISOString()
  );
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem(
    "access_token_duration",
    accessTokenDuration.toISOString()
  );
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("refresh_token_duration", refreshTokenDuration);

  return redirect("/");
}
