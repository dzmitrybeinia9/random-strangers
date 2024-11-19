import axios from 'axios';
import { TeamData } from '../types';

const BASE_URL = 'https://beo.mzgb.net/api/rating';

interface RatingResponse {
  rating: TeamData[];
}

export const ratingService = {
  fetchRating: async (params: string = ''): Promise<RatingResponse> => {
    const response = await axios.get(`${BASE_URL}${params}`);
    return response.data;
  },

  fetchClassicRating: () => 
    ratingService.fetchRating('?sort=points&limit=500'),

  fetchMusicRating: () => 
    ratingService.fetchRating('?page=rating-music&sort=points&limit=500'),
}; 