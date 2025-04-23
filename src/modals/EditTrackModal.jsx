import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditTrackForm from "../components/EditTrackForm";

const EditTrackModal = ({ open, onClose, track, onSave }) => {
  if (!track) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Track
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
        <EditTrackForm track={track} onSave={onSave} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTrackModal;
