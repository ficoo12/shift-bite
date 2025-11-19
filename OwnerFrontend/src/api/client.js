import axios from "axios";

const client = axios.create({
  baseURL: "https://shift-bite-backend.onrender.com",
  withCredentials: true,
});

export default client;
