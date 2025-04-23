import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api/genres";

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });
};