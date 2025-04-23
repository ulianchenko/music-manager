import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const TrackListItem = ({ track }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {track.title}
        </Typography>
        <Typography color="text.secondary">Artist: {track.artist}</Typography>
        <Typography color="text.secondary">Genre: {track.genre}</Typography>
        <Typography color="text.secondary">
          Duration: {track.duration}
        </Typography>
      </CardContent>
      <CardActions>
        <Box ml="auto">
          <Button size="small" variant="contained">
            Play
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default TrackListItem;
