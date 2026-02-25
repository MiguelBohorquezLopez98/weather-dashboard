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

export async function getDailyForecast7(params: {
    latitude: number;
    longitude: number;
    signal?: AbortSignal;
}) {
    const { latitude, longitude, signal } = params;

    const qs = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),

        daily: 'temperature_2m_max,temperature_2m_min',
        forecast_days: '7',
        timezone: 'auto',
    });

    const url = `${FORECAST_URL}/forecast?${qs.toString()}`;
    const data = await httpGet<unknown>(url, signal);

    return ForecastResponseSchema.parse(data);
}