import { FC } from 'react';
import DashboardPage from "../pages/dashboard";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TeamData } from '../lib/types';

const BASE_URL = 'https://beo.mzgb.net/api/rating';

interface RatingResponse {
  rating: TeamData[];
}

const fetchRatingData = async (params: string = ''): Promise<RatingResponse> => {
  const response = await axios.get(`${BASE_URL}${params}`);
  return response.data;
};

const Query: FC = () => {
  const {
    data: classicData,
    isError: isClassicError,
    isLoading: isClassicLoading
  } = useQuery({
    queryKey: ['classicRating'],
    queryFn: () => fetchRatingData('?sort=points&limit=500'),
    select: (data) => data.rating,
  });

  const {
    data: musicData,
    isError: isMusicError,
    isLoading: isMusicLoading
  } = useQuery({
    queryKey: ['musicRating'],
    queryFn: () => fetchRatingData('?page=rating-music&sort=points&limit=500'),
    select: (data) => data.rating,
  });

  if (isClassicLoading || isMusicLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (isClassicError || isMusicError || !classicData || !musicData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  return <DashboardPage classicResponse={classicData} musicResponse={musicData} />;
};

export default Query;