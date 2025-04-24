import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTrackModal from "../modals/EditTrackModal";

const TrackListItem = ({ track, onUpdate, onDelete }) => {
  const { id, title, artist, album, genres = [], coverImage } = track;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this track?")) {
      onDelete(id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedTrack) => {
    onUpdate(id, updatedTrack);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          mb: 2,
          alignItems: "center",
          transition: "0.3s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.01)",
          },
        }}
      >
        {coverImage ? (
          <CardMedia
            component="img"
            image={coverImage}
            alt={title}
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              width: 200,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f0f0f0",
            }}
          >
            <MusicNoteIcon fontSize="large" color="disabled" />
          </Box>
        )}

        <CardContent sx={{ flex: 1, position: "relative" }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ mb: 1 }}
          >
            <IconButton onClick={handleEditClick} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick} size="small">
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>

          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {artist}
          </Typography>
          {album && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Album: {album}
            </Typography>
          )}
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {genres.map((genre, index) => (
              <Chip key={index} label={genre} variant="outlined" size="small" />
            ))}
          </Box>
        </CardContent>
      </Card>

      <EditTrackModal
        open={isModalOpen}
        onClose={handleModalClose}
        track={track}
        onSave={handleSave}
      />
    </>
  );
};

export default TrackListItem;
