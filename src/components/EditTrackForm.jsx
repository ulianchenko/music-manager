import React, { useState } from "react";
import { TextField, Button, Box, Chip } from "@mui/material";

const EditTrackForm = ({ track, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: track.title || "",
    artist: track.artist || "",
    album: track.album || "",
    genres: track.genres || [],
    coverImage: track.coverImage || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (e) => {
    const genres = e.target.value.split(",").map((g) => g.trim());
    setFormData((prev) => ({ ...prev, genres }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Artist"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Album"
        name="album"
        value={formData.album}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Genres (comma separated)"
        value={formData.genres.join(", ")}
        onChange={handleGenresChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Cover Image URL"
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditTrackForm;