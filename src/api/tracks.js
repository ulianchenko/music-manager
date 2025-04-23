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
} = {}) => {
  const res = await API.get("/tracks", {
    params: { page, search, genre, artist },
  });
  return res.data;
};

export const createTrack = (data) => API.post("/tracks", data);
export const updateTrack = (id, data) => API.put(`/tracks/${id}`, data);
export const deleteTrack = (id) => API.delete(`/tracks/${id}`);
export const uploadTrackFile = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post(`/tracks/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
