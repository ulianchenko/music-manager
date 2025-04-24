import {
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Filters = ({
  searchValue,
  genreValue,
  artistValue,
  genreOptions = [],
  artistOptions = [],
  sort,
  order,
  onSearchChange,
  onGenreChange,
  onArtistChange,
  onSortChange,
  onOrderChange,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Search"
          fullWidth
          defaultValue={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          inputProps={{ "data-testid": "search-input" }}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreValue}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
            inputProps={{ "data-testid": "filter-genre" }}
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
            inputProps={{ "data-testid": "filter-artist" }}
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

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sort}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="artist">Artist</MenuItem>
            <MenuItem value="album">Album</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Order</InputLabel>
          <Select
            value={order}
            label="Order"
            onChange={(e) => onOrderChange(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
