import { useQuery } from '@tanstack/react-query';
import { ratingService } from '../../../lib/services/rating';

export const useRatingData = () => {
  const classicQuery = useQuery({
    queryKey: ['classicRating'],
    queryFn: ratingService.fetchClassicRating,
    select: (data) => data.rating,
  });

  const musicQuery = useQuery({
    queryKey: ['musicRating'],
    queryFn: ratingService.fetchMusicRating,
    select: (data) => data.rating,
  });

  return {
    classicData: classicQuery.data,
    musicData: musicQuery.data,
    isLoading: classicQuery.isLoading || musicQuery.isLoading,
    isError: classicQuery.isError || musicQuery.isError,
  };
}; 