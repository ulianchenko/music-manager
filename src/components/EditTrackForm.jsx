import React, { useState } from "react";
import { TextField, Button, Box, Chip, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { updateTrack } from "../api/tracks";
import { useGenres } from "../hooks/useGenres";

const EditTrackForm = ({ track, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: track.title || "",
    artist: track.artist || "",
    album: track.album || "",
    genres: track.genres || [],
    coverImage: track.coverImage || "",
  });

  const { data: availableGenres = [] } = useGenres();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGenre = (genre) => {
    if (!formData.genres.includes(genre)) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genre],
      }));
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genreToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTrack = await updateTrack(track.id, formData);
      onSave(updatedTrack);
    } catch (error) {
      console.error("Error updating track:", error);
      alert("Failed to update track. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Album"
          name="album"
          value={formData.album}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Cover Image URL"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          fullWidth
        />

        <Box>
          <Box sx={{ mb: 1, fontWeight: "bold" }}>Current Genres:</Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {formData.genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onDelete={() => handleRemoveGenre(genre)}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Box sx={{ mb: 1, fontWeight: "bold" }}>Add Genres:</Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {availableGenres
              .filter((g) => !formData.genres.includes(g))
              .map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  icon={<AddIcon />}
                  onClick={() => handleAddGenre(genre)}
                  variant="outlined"
                />
              ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditTrackForm;