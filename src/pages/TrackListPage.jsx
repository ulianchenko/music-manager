import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useTracks } from "../hooks/useTracks";
import { useGenres } from "../hooks/useGenres";
import Filters from "../components/Filters";
import TrackListItem from "../components/TrackListItem";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";

const TrackListPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [page, setPage] = useState(1);
  const [allArtists, setAllArtists] = useState([]);

  const { data: genres, isLoading: isGenresLoading } = useGenres();

  const { data: trackData, isLoading: isTracksLoading } = useTracks({
    search,
    genre,
    artist,
    page,
    allArtists,
    setAllArtists,
  });

  const handleSearchChange = debounce((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  useEffect(() => {
    return () => {
      handleSearchChange.cancel();
    };
  }, []);

  if (isTracksLoading || isGenresLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Tracks</Typography>

      <Filters
        searchValue={search}
        genreValue={genre}
        artistValue={artist}
        genreOptions={genres}
        artistOptions={allArtists}
        onSearchChange={handleSearchChange}
        onGenreChange={(value) => {
          setGenre(value);
          setPage(1);
        }}
        onArtistChange={(value) => {
          setArtist(value);
          setPage(1);
        }}
      />

      <Grid container direction="column" spacing={2}>
        {trackData?.data.map((track) => (
          <Grid key={track.id}>
            <TrackListItem track={track} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        page={trackData?.meta.page}
        totalPages={trackData?.meta.totalPages}
        onPageChange={setPage}
      />
    </Container>
  );
};

export default TrackListPage