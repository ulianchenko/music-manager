import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
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
  Checkbox,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/UploadFile";
import EditTrackModal from "../modals/EditTrackModal";
import TrackUpload from "./TrackUpload";

const TrackListItem = ({ track, onUpdate, onDelete, onSelect, isSelected }) => {
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

  const waveformRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioFile && waveformRef.current && audioRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ccc",
        progressColor: "#1976d2",
        height: 80,
        responsive: true,
        barWidth: 2,
        interact: false,
        backend: "MediaElement",
        mediaControls: false,
        media: audioRef.current,
      });

      return () => wavesurfer.destroy();
    }
  }, [audioFile]);

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

  const handleSelect = (e) => {
    onSelect(id, e.target.checked);
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
        <Box
          sx={{
            width: 200,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f0f0f0",
            marginLeft: 2,
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
            <MusicNoteIcon fontSize="large" color="disabled" />
          )}
        </Box>

        <CardContent sx={{ flex: 1, position: "relative" }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ mb: 1 }}
          >
            <Checkbox
              checked={isSelected}
              onChange={handleSelect}
              data-testid={`track-checkbox-${id}`}
            />
            <IconButton
              onClick={handleEditClick}
              size="small"
              data-testid={`edit-track-${id}`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDeleteClick}
              size="small"
              data-testid={`delete-track-${id}`}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>

          <Typography variant="h6" data-testid={`track-item-${id}-title`}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            data-testid={`track-item-${id}-artist`}
          >
            {artist}
          </Typography>
          {album && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
              data-testid={`track-item-${id}-album`}
            >
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
                <Box>
                  <Box
                    ref={waveformRef}
                    sx={{ width: "100%", height: "80px", mb: 1 }}
                    data-testid={`waveform-${id}`}
                  />
                  <audio
                    ref={audioRef}
                    controls
                    src={"test.mp3"}
                    style={{ width: "100%" }}
                    data-testid={`audio-player-${id}`}
                  />
                </Box>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteAudio}
                  color="error"
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Delete track
                </Button>
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
