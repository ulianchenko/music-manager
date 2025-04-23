import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const TrackListItem = ({ track }) => {
  const { title, artist, album, genres = [], coverImage } = track;

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        alignItems: "center",
        transition: "0.3s",
        cursor: "pointer",
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

      <CardContent sx={{ flex: 1 }}>
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
  );
};

export default TrackListItem;
