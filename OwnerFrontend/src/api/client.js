import axios from "axios";

const client = axios.create({
  baseURL: "https://shift-bite-backend.onrender.com/api",
});

client.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default client;
