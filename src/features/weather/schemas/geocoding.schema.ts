import { z } from 'zod';

export const GeoResultSchema = z.object({
    id: z.number(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    country: z.string().optional(),
    country_code: z.string().optional(),
    admin1: z.string().optional(),
});

export const GeocodingResponseSchema = z.object({
    results: z.array(GeoResultSchema).optional(),
});

export type GeoResult = z.infer<typeof GeoResultSchema>;