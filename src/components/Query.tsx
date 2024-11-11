import App from "./App";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://beo.mzgb.net/api/rating'

const Query = () => {
    // const formattedDate = format(new Date(dataUpdatedAt), 'dd.MM.yyyy HH:mm:ss');

    //load data for classic rating
    const { isError: isError1, isLoading: isLoading1, data: classicData } = useQuery({
        queryKey: ['ratingData'],
        queryFn: () => axios(`${BASE_URL}?limit=500`).then((res) => res.data.rating),
    })

    //load data for music rating
    const { isError: isError2, isLoading: isLoading2, data: musicData } = useQuery({
        queryKey: ['musicRatingData'],
        queryFn: () =>
            axios(`${BASE_URL}?page=rating-music&sort=season_points&limit=500`).then((res) => res.data.rating),
    })

    // console.log('Response 1:', classicData)
    // console.log('Response 2:', musicData)

    if (isLoading1 || isLoading2) {
        return <div>Loading...</div>;
    }

    if (isError1 || !classicData || isError2 || !musicData) {
        return <div>Error</div>;
    }

    return (
        <App classicResponse={classicData} musicResponse={musicData} />
    )
};

export default Query;