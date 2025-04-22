import { useQuery } from "@tanstack/react-query";
import { fetchTracks } from "../api/tracks";

const TrackListPage = () => {
  const { data: tracks, isLoading } = useQuery(["tracks"], fetchTracks);

  if (isLoading) return <div data-testid="loading-tracks">Loading...</div>;

  return (
    <div>
      <h1 data-testid="tracks-header">Tracks</h1>
      <button data-testid="create-track-button">Create Track</button>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} data-testid={`track-item-${track.id}`}>
            <div data-testid={`track-item-${track.id}-title`}>{track.title}</div>
            <div data-testid={`track-item-${track.id}-artist`}>{track.artist}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackListPage;
