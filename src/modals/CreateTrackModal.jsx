import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrackForm from "../components/TrackForm";
import { createTrack } from "../api/tracks";

const CreateTrackModal = ({ open, onClose, onCreate }) => {
  const handleSubmit = async (data) => {
    try {
      const newTrack = await createTrack(data);
      onCreate(newTrack);
      onClose();
    } catch (error) {
      console.error("Failed to create track:", error);
      alert("Failed to create track. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Create New Track
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TrackForm
          initialValues={{
            title: "",
            artist: "",
            album: "",
            genres: [],
            coverImage: "",
          }}
          onSave={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTrackModal;
