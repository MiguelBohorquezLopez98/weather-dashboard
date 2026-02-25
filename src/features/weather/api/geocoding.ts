import { httpGet } from '../../../shared/lib/http';
import { GeocodingResponseSchema } from '../schemas/geocoding.schema';

const GEO_URL = import.meta.env.VITE_OPEN_METEO_GEO_URL;

export async function geocodeSelectedCity(params: {
    city: string;
    countryCode: string; // ISO2, ej: "EC"
    signal?: AbortSignal;
}) {
    const { city, countryCode, signal } = params;

    const qs = new URLSearchParams({
        name: city,
        count: '10',
        language: 'es',
        format: 'json',
        country_code: countryCode,
    });

    const url = `${GEO_URL}/search?${qs.toString()}`;
    const data = await httpGet<unknown>(url, signal);

    return GeocodingResponseSchema.parse(data);
}