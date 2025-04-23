import { TextField, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const Filters = ({
  searchValue,
  genreValue,
  artistValue,
  genreOptions = [],
  artistOptions = [],
  onSearchChange,
  onGenreChange,
  onArtistChange,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Search"
          fullWidth
          defaultValue={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreValue}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {genreOptions.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Artist</InputLabel>
          <Select
            value={artistValue}
            label="Artist"
            onChange={(e) => onArtistChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {artistOptions.map((artist, index) => (
              <MenuItem key={index} value={artist}>
                {artist || "All"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;