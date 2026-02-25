import { useQuery } from '@tanstack/react-query';
import { getDailyForecast7 } from '../api/forecast';

export function useDailyForecast7(lat?: number, lon?: number) {
    return useQuery({
        queryKey: ['forecast7', { lat, lon }],
        queryFn: ({ signal }) =>
            getDailyForecast7({ latitude: lat!, longitude: lon!, signal }),
        enabled: typeof lat === 'number' && typeof lon === 'number',
        staleTime: 1000 * 60 * 10,
    });
}