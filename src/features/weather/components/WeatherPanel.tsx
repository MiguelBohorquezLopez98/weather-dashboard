import { useMemo } from 'react';
import { useGeocodeSelectedCity } from '../hooks/useGeocodeSelectedCity';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import bannerWeather from '../../../assets/banner-weather.jpg';
import { Card } from '@/components/ui/card';

type Props = {
    cityName: string;
    countryIso: string;
};

export function WeatherPanel({ cityName, countryIso }: Props) {
    // Obtener coordenadas de la ciudad seleccionada
    const geo = useGeocodeSelectedCity(cityName || undefined, countryIso || undefined);

    const coords = useMemo(() => {
        const results = geo.data?.results ?? [];
        if (!results.length) return null;

        const exact = results.find(
            (r) => r.name.toLowerCase() === cityName.toLowerCase(),
        );

        const best = exact ?? results[0];

        return {
            lat: best.latitude,
            lon: best.longitude,
            label: `${best.name}${best.admin1 ? `, ${best.admin1}` : ''}`,
        };
    }, [geo.data, cityName]);

    // Forecast: traer clima solo si hay coords
    const weather = useCurrentWeather(coords?.lat, coords?.lon);

    if (!cityName) {
        return <div className='bg-amber-50 rounded-2xl p-8 text-lg'>Select a city to fetch coordinates and weather.</div>;
    }

    return (
        <div style={{ marginTop: 12 }}>
            {/* Estado de geocoding */}
            {geo.isFetching && <div className='bg-amber-50 rounded-2xl p-8 text-lg'>Geocoding city (getting coordinates)...</div>}
            {geo.isError && <div className='bg-amber-50 rounded-2xl p-8 text-lg'>Failed to geocode the selected city.</div>}
            {geo.isSuccess && !coords && <div className='bg-amber-50 rounded-2xl p-8 text-lg'>No coordinates found for this city.</div>}

            {/* Panel de clima */}
            {coords && (
                <Card className="relative mx-auto w-full pt-0 bg-amber-50 rounded-2xl p-8 text-lg">
                    <div className="absolute inset-0 z-30" />
                    <img
                        src={bannerWeather}
                        alt="Weather"
                        className="relative z-20 w-full object-cover rounded"
                    />

                    {weather.isFetching && <div className="mt-4">Loading weather...</div>}
                    {weather.isError && <div className="mt-4">Failed to load weather.</div>}

                    {weather.data?.current && (
                        <div className="mt-8">
                            <h2 className="text-2xl text-center font-semibold">Current Weather</h2>
                            <div className="mt-6 space-y-2">
                                <div className='font-semibold'>Temperature: {weather.data.current.temperature_2m} °C</div>
                                {typeof weather.data.current.wind_speed_10m === 'number' && (
                                    <div className='font-semibold'>Wind: {weather.data.current.wind_speed_10m} km/h</div>
                                )}
                            </div>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}