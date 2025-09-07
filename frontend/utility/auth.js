import axios from "axios";
import { redirect } from "react-router-dom";

async function getNewAccessToken(token) {
  const link = "http://localhost:8080/api/refresh-token";
  try {
    const response = await axios.post(link, { refresh_token: token });

    const responseData = response.data;
    const accessToken = responseData.access_token;
    const refreshToken = responseData.refresh_token;

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

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);

    localStorage.removeItem("access_token");
    localStorage.removeItem("access_token_duration");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_token_duration");

    return null;
  }
}

function getAccessTokenDuretion() {
  const storedAccessTokenDuretion = localStorage.getItem(
    "access_token_duration"
  );
  const currentDateObject = new Date();
  const storedAccessTokenDateObject = new Date(storedAccessTokenDuretion);

  return storedAccessTokenDateObject.getTime() - currentDateObject.getTime();
}

function getRefreshTokenDuretion() {
  const storedRefreshTokenDuretion = localStorage.getItem(
    "refresh_token_duration"
  );
  const currentDateObject = new Date();
  const storedRefreshTokenDateObject = new Date(storedRefreshTokenDuretion);

  return storedRefreshTokenDateObject.getTime() - currentDateObject.getTime();
}

export function tokenLoader() {
  const accessToken = localStorage.getItem("access_token");
  const accessTokenDuration = getAccessTokenDuretion();
  const refreshToken = localStorage.getItem("refresh_token");
  const refreshTokenDuration = getRefreshTokenDuretion();

  // console.log(accessToken, accessTokenDuration, refreshToken, refreshTokenDuration);

  if ((!accessToken && !refreshToken) || accessToken === "undefined")
    return null;

  if (accessTokenDuration < 0 && refreshTokenDuration < 0) return "EXPIRED";
  else if (refreshToken && accessTokenDuration < 0 && refreshTokenDuration > 0)
    return getNewAccessToken(refreshToken);

  return accessToken;
}

export function checkLoginLoader() {
  return !tokenLoader() ? redirect("/login") : null;
}
