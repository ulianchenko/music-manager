import { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import { useTracks } from "../hooks/useTracks";
import { useGenres } from "../hooks/useGenres";
import Filters from "../components/Filters";
import TrackListItem from "../components/TrackListItem";
import Pagination from "../components/Pagination";
import { debounce } from "lodash";
import { deleteTrack, updateTrack } from "../api/tracks";
import CreateTrackModal from "../modals/CreateTrackModal";

const TrackListPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [page, setPage] = useState(1);
  const [allArtists, setAllArtists] = useState([]);
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");
  const [tracks, setTracks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleUpdate = async (id, updatedTrackData) => {
    try {
      const updatedTrack = await updateTrack(id, updatedTrackData);
      setTracks((prev) =>
        prev.map((track) => (track.id === updatedTrack.id ? updatedTrack : track))
      );
    } catch (error) {
      console.error("Error updating track:", error);
      alert("Failed to update track. Please try again.");
    }
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

  const handleCreate = (newTrack) => {
    setTracks((prev) => [newTrack, ...prev]);
  };

  if (isTracksLoading || isGenresLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h2">Music tracks</Typography>
        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
          Create Track
        </Button>
      </Box>

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

      <CreateTrackModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </Container>
  );
};

export default TrackListPage;
