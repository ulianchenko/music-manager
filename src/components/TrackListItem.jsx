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
  Button,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import UploadIcon from "@mui/icons-material/UploadFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import EditTrackModal from "../modals/EditTrackModal";
import TrackUpload from "./TrackUpload";

const TrackListItem = ({ track, onUpdate, onDelete }) => {
  const {
    id,
    title,
    artist,
    album,
    genres = [],
    coverImage,
    audioFile,
  } = track;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

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

  const handleDeleteAudio = () => {
    if (window.confirm("Delete the audio file?")) {
      onUpdate(id, { ...track, audioFile: "" });
    }
  };

  const handleUploadComplete = (newAudioUrl) => {
    onUpdate(id, { ...track, audioFile: newAudioUrl });
    setShowUpload(false);
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
        data-testid={`track-item-${id}`}
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
              marginLeft: 2
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
            <IconButton onClick={handleEditClick} size="small" data-testid={`edit-track-${id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick} size="small" data-testid={`delete-track-${id}`}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>

          <Typography variant="h6" data-testid={`track-item-${id}-title`}>{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" data-testid={`track-item-${id}-artist`}>
            {artist}
          </Typography>
          {album && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} data-testid={`track-item-${id}-album`}>
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

          {/* 🎵 Audio section */}
          <Box mt={2}>
            {audioFile ? (
              <>
                {/* <audio controls src={audioFile} style={{ width: "100%" }} /> */}
                {/* For testing needs the source file for all tracks is test.mp3 in root folder*/}
                <audio controls src={"test.mp3"} style={{ width: "100%" }} data-testid={`audio-player-${id}`}/>
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteAudio}
                    color="error"
                    variant="outlined"
                  >
                    Delete track
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Button
                  startIcon={<UploadIcon />}
                  onClick={() => setShowUpload(true)}
                  variant="contained"
                  sx={{ mt: 2 }}
                  data-testid={`upload-track-${id}`}
                >
                  Upload track
                </Button>
                {showUpload && (
                  <Box mt={2}>
                    <TrackUpload
                      trackId={id}
                      initialUrl=""
                      onUpload={handleUploadComplete}
                    />
                  </Box>
                )}
              </>
            )}
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
