import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '../api/forecast';

export function useCurrentWeather(lat?: number, lon?: number) {
    return useQuery({
        queryKey: ['weather', { lat, lon }],
        queryFn: ({ signal }) =>
            getCurrentWeather({ latitude: lat!, longitude: lon!, signal }),
        enabled: typeof lat === 'number' && typeof lon === 'number',
        staleTime: 1000 * 60 * 5,
    });
}