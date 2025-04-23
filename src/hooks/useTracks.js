import { useQuery } from "@tanstack/react-query";
import { fetchTracks } from "../api/tracks";

const getUniqueArtists = (tracks) => {
  if (!Array.isArray(tracks)) return [];
  const artists = tracks.map((track) => track.artist);
  return [...new Set(artists)];
};

export const useTracks = ({
  page,
  search,
  genre,
  artist,
  allArtists,
  setAllArtists,
  sort,
  order,
}) => {
  return useQuery({
    queryKey: ['tracks', { page, search, genre, artist, sort, order }],
    queryFn: () => fetchTracks({ page, search, genre, artist, sort, order }),
    keepPreviousData: true,
    select: (data) => {
      const trackData = Array.isArray(data?.data) ? data.data : [];

      if (page === 1 && !search && !genre && !artist && allArtists.length === 0) {
        const unique = getUniqueArtists(trackData);
        setAllArtists(unique);
      }

      return {
        ...data,
        data: trackData,
      };
    },
  });
};