import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useTracks } from "../hooks/useTracks";
import { useGenres } from "../hooks/useGenres";
import Filters from "../components/Filters";
import TrackListItem from "../components/TrackListItem";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";
import { deleteTrack } from "../api/tracks";

const TrackListPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [page, setPage] = useState(1);
  const [allArtists, setAllArtists] = useState([]);
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");
  const [tracks, setTracks] = useState([]);

  const { data: genres, isLoading: isGenresLoading } = useGenres();
  const { data: trackData, isLoading: isTracksLoading } = useTracks({
    search,
    genre,
    artist,
    page,
    allArtists,
    setAllArtists,
    sort,
    order,
  });

  useEffect(() => {
    if (trackData?.data) {
      setTracks(trackData.data);
    }
  }, [trackData]);

  const handleSearchChange = debounce((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  useEffect(() => {
    return () => {
      handleSearchChange.cancel();
    };
  }, []);

  const handleUpdate = (updatedTrack) => {
    setTracks((prev) =>
      prev.map((track) => (track.id === updatedTrack.id ? updatedTrack : track))
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrack(id);
      setTracks((prev) => prev.filter((track) => track.id !== id));
    } catch (error) {
      console.error("Failed to delete track", error);
      alert("Failed to delete track. Please try again.");
    }
  };

  if (isTracksLoading || isGenresLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Tracks
      </Typography>

      <Filters
        searchValue={search}
        genreValue={genre}
        artistValue={artist}
        genreOptions={genres}
        artistOptions={allArtists}
        onSearchChange={handleSearchChange}
        sort={sort}
        order={order}
        onGenreChange={(value) => {
          setGenre(value);
          setPage(1);
        }}
        onArtistChange={(value) => {
          setArtist(value);
          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
        onOrderChange={(value) => {
          setOrder(value);
          setPage(1);
        }}
      />

      <Grid container direction="column" spacing={2}>
        {tracks.map((track) => (
          <Grid key={track.id}>
            <TrackListItem
              track={track}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
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

export default TrackListPage;
