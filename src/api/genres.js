import axios from "axios";

const API = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: "https://music-manager-api-0eya.onrender.com/api",
});

export const fetchGenres = async () => {
  const res = await API.get("/genres");
  return res.data;
};
