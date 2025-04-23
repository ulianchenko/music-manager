import axios from "axios";

const API = axios.create({
  // baseURL: 'http://0.0.0.0:8000/api',
  baseURL: "https://music-manager-api-0eya.onrender.com/api",
});

export const fetchTracks = async ({
  page = 1,
  search = "",
  genre = "",
  artist = "",
  sort = "",
  order = "",
} = {}) => {
  const res = await API.get("/tracks", {
    params: { page, search, genre, artist, sort, order },
  });
  return res.data;
};
