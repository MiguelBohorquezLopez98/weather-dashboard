import { useMemo } from 'react';
import { useGeocodeSelectedCity } from '../hooks/useGeocodeSelectedCity';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { useDailyForecast7 } from '../hooks/useDailyForecast7';
import bannerWeather from '../../../assets/banner-weather.jpg';
import { Card } from '@/components/ui/card';

type Props = {
    cityName: string;
    countryIso: string;
};

function formatDay(dateStr: string) {
    const d = new Date(`${dateStr}T00:00:00`);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    }).format(d);
}

export function WeatherPanel({ cityName, countryIso }: Props) {
    // Obtener coordenadas de la ciudad seleccionada
    const geo = useGeocodeSelectedCity(cityName || undefined, countryIso || undefined);

    const coords = useMemo(() => {
        const results = geo.data?.results ?? [];
        if (!results.length) return null;

        const exact = results.find((r) => r.name.toLowerCase() === cityName.toLowerCase());
        const best = exact ?? results[0];

        return {
            lat: best.latitude,
            lon: best.longitude,
            label: `${best.name}${best.admin1 ? `, ${best.admin1}` : ''}`,
        };
    }, [geo.data, cityName]);

    // Current weather
    const weather = useCurrentWeather(coords?.lat, coords?.lon);

    // 7-day forecast
    const forecast7 = useDailyForecast7(coords?.lat, coords?.lon);

    const dailyRows = useMemo(() => {
        const d = forecast7.data?.daily;
        if (!d) return [];
        return d.time.map((date, i) => ({
            date,
            max: d.temperature_2m_max[i],
            min: d.temperature_2m_min[i],
        }));
    }, [forecast7.data]);

    if (!cityName) {
        return (
            <div className="bg-amber-50 rounded-2xl p-8 text-lg">
                Select a city to fetch coordinates and weather.
            </div>
        );
    }

    return (
        <div className="mt-3">
            {/* Estado de geocoding */}
            {geo.isFetching && (
                <div className="bg-amber-50 rounded-2xl p-8 text-lg">
                    Geocoding city (getting coordinates)...
                </div>
            )}
            {geo.isError && (
                <div className="bg-amber-50 rounded-2xl p-8 text-lg">
                    Failed to geocode the selected city.
                </div>
            )}
            {geo.isSuccess && !coords && (
                <div className="bg-amber-50 rounded-2xl p-8 text-lg">
                    No coordinates found for this city.
                </div>
            )}

            {/* Panel de clima */}
            {coords && (
                <Card className="relative mx-auto w-full overflow-hidden rounded-2xl border-0 bg-amber-50 p-0">
                    {/* Banner */}
                    <div className="relative h-44 w-full">
                        <img
                            src={bannerWeather}
                            alt="Weather"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="relative z-10 flex h-full items-end p-6">
                            <div className="text-white">
                                <div className="text-xl font-semibold">{coords.label}</div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 text-lg">
                        {weather.isFetching && <div>Loading current weather...</div>}
                        {weather.isError && <div>Failed to load current weather.</div>}

                        {weather.data?.current && (
                            <div className="mt-2">
                                <h2 className="text-2xl text-center font-semibold">Current Weather</h2>
                                <div className="mt-6 space-y-2">
                                    <div className="font-semibold">
                                        Temperature: {weather.data.current.temperature_2m} °C
                                    </div>
                                    {typeof weather.data.current.wind_speed_10m === 'number' && (
                                        <div className="font-semibold">
                                            Wind: {weather.data.current.wind_speed_10m} km/h
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 7-day forecast */}
                        <div className="mt-10">
                            <h3 className="text-xl font-semibold text-center">7-Day Forecast</h3>

                            {forecast7.isFetching && <div className="mt-4">Loading 7-day forecast...</div>}
                            {forecast7.isError && <div className="mt-4">Failed to load 7-day forecast.</div>}

                            {dailyRows.length > 0 && (
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {dailyRows.map((r) => (
                                        <div key={r.date} className="rounded-xl bg-white/70 p-4 backdrop-blur">
                                            <div className="font-semibold">{formatDay(r.date)}</div>
                                            <div className="mt-2 flex justify-between">
                                                <span>Max</span>
                                                <span>{Math.round(r.max)} °C</span>
                                            </div>
                                            <div className="mt-1 flex justify-between">
                                                <span>Min</span>
                                                <span>{Math.round(r.min)} °C</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!forecast7.isFetching && !forecast7.isError && dailyRows.length === 0 && (
                                <div className="mt-4">No forecast data available.</div>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}