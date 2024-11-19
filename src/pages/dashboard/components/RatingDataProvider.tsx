import { FC } from 'react';
import { useRatingData } from '../hooks/useRatingData';
import { Loading } from '../../../components/ui/loading';
import { Error } from '../../../components/ui/error';
import DashboardPage from '..';

export const RatingDataProvider: FC = () => {
  const { classicData, musicData, isLoading, isError } = useRatingData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !classicData || !musicData) {
    return <Error />;
  }

  return <DashboardPage classicResponse={classicData} musicResponse={musicData} />;
}; 