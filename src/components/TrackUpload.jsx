import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Input,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadTrackFile } from "../api/tracks";

const MAX_FILE_SIZE_MB = 10;
const SUPPORTED_TYPES = ["audio/mpeg", "audio/wav"];

const TrackUpload = ({ trackId, initialUrl, onUpload }) => {
  const [audioUrl, setAudioUrl] = useState(initialUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return setError("Unsupported file type. Only MP3 and WAV are allowed.");
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return setError(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const updatedTrack = await uploadTrackFile(trackId, formData);
      const newAudioUrl = updatedTrack.audioFile;

      setAudioUrl(newAudioUrl);
      onUpload?.(newAudioUrl);

    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setAudioUrl("");
    setError("");
    onUpload?.("");
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Upload Audio File</Typography>
      <Stack direction="row" spacing={2} alignItems="center" mt={1}>
        <label htmlFor="upload-audio">
          <Input
            type="file"
            accept="audio/*"
            id="upload-audio"
            sx={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadFileIcon />}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Choose File"}
          </Button>
        </label>
        {audioUrl && (
          <IconButton onClick={handleRemove} color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}
      {audioUrl && (
        <Box mt={2}>
          <audio controls src={audioUrl} style={{ width: "100%" }} />
        </Box>
      )}
    </Box>
  );
};

export default TrackUpload;
