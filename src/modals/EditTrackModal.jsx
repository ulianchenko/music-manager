import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditTrackForm from "../components/EditTrackForm";

const EditTrackModal = ({ open, onClose, track, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Track</DialogTitle>
      <DialogContent>
        <EditTrackForm track={track} onSave={onSave} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditTrackModal;
