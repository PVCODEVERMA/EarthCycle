import axios from "../utils/axios"; // your axios instance

export const registerUser = (data) => axios.post("/register", data);

export const loginUser = (data) => axios.post("/login", data);
