import axios from "axios";

const API = axios.create({
  // baseURL: 'http://localhost:8000/api',
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

export const deleteTrack = async (id) => {
  return await API.delete(`/tracks/${id}`);
};

export const updateTrack = async (id, updatedData) => {
  const response = await API.put(`/tracks/${id}`, updatedData);
  return response.data;
};

export const createTrack = async (newTrackData) => {
  const response = await API.post("/tracks", newTrackData);
  return response.data;
};

export const uploadTrackFile = async (trackId, formData) => {
  const res = await API.post(`/tracks/${trackId}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const bulkDeleteTracks = async (ids) => {
  const res = await API.post("/tracks/delete", { ids });
  return res.data;
};
