import { useQuery } from '@tanstack/react-query';
import { geocodeSelectedCity } from '../api/geocoding';

export function useGeocodeSelectedCity(city?: string, countryCode?: string) {
    return useQuery({
        queryKey: ['geocode', { city, countryCode }],
        queryFn: ({ signal }) =>
            geocodeSelectedCity({ city: city!, countryCode: countryCode!, signal }),
        enabled: !!city && !!countryCode,
        staleTime: 1000 * 60 * 60, // 1 hora (geocoding no cambia)
    });
}