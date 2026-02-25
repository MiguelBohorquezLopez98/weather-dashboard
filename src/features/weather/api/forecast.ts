import { httpGet } from '../../../shared/lib/http';
import { ForecastResponseSchema } from '../schemas/forecast.schema';

const FORECAST_URL = import.meta.env.VITE_OPEN_METEO_FORECAST_URL;

export async function getCurrentWeather(params: {
    latitude: number;
    longitude: number;
    signal?: AbortSignal;
}) {
    const { latitude, longitude, signal } = params;

    const qs = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'temperature_2m,wind_speed_10m',
    });

    const url = `${FORECAST_URL}/forecast?${qs.toString()}`;
    const data = await httpGet<unknown>(url, signal);

    return ForecastResponseSchema.parse(data);
}