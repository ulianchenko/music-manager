import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Chip, Stack, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGenres } from "../hooks/useGenres";

const trackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  album: z.string().optional(),
  genres: z.array(z.string()).min(1, "At least one genre required"),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

const TrackForm = ({ initialValues = {}, onSave, onCancel }) => {
  const { data: availableGenres = [], isLoading: genresLoading } = useGenres();
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
      coverImage: "",
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const genres = getValues("genres");

  const handleAddGenre = (genre) => {
    const current = getValues("genres");
    if (!current.includes(genre)) {
      const updated = [...current, genre];
      setValue("genres", updated, { shouldValidate: true });
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    const updated = getValues("genres").filter((g) => g !== genreToRemove);
    setValue("genres", updated, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    onSave(data);
  };

  if (genresLoading) {
    return <Typography>Loading genres...</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }} data-testid="track-form">
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          inputProps={{ "data-testid": "input-title" }}
        />
        <TextField
          label="Artist"
          {...register("artist")}
          error={!!errors.artist}
          helperText={errors.artist?.message}
          fullWidth
          inputProps={{ "data-testid": "input-artist" }}
        />
        <TextField
          label="Album"
          {...register("album")}
          error={!!errors.album}
          helperText={errors.album?.message}
          fullWidth
          inputProps={{ "data-testid": "input-album" }}
        />
        <TextField
          label="Cover Image URL"
          {...register("coverImage")}
          onChange={(e) => {
            setImageError(false);
            setValue("coverImage", e.target.value, { shouldValidate: true });
          }}
          error={!!errors.coverImage}
          helperText={errors.coverImage?.message}
          fullWidth
          inputProps={{ "data-testid": "input-cover-image" }}
        />

        <Box>
          <Typography fontWeight="bold">Preview:</Typography>
          {getValues("coverImage") && !imageError ? (
            <Box
              component="img"
              src={getValues("coverImage")}
              onError={() => setImageError(true)}
              alt="Cover preview"
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: imageError ? "2px solid red" : "1px solid #ccc",
                borderRadius: 1,
              }}
            />
          ) : (
            <Box
              sx={{
                width: 120,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              <MusicNoteIcon fontSize="large" color="disabled" />
            </Box>
          )}
          {imageError && (
            <Typography color="error">Image failed to load.</Typography>
          )}
        </Box>

        <Box>
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            Current Genres:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onDelete={() => handleRemoveGenre(genre)}
              />
            ))}
          </Box>
          {errors.genres && (
            <Typography color="error" fontSize="0.875rem" mt={1}>
              {errors.genres.message}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            Add Genres:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {availableGenres
              .filter((g) => !genres.includes(g))
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
          <Button type="submit" variant="contained" data-testid="submit-button">
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default TrackForm;
