import { z } from 'zod';

export const ForecastResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    current: z
        .object({
            temperature_2m: z.number(),
            wind_speed_10m: z.number().optional(),
        })
        .optional(),

    daily: z
        .object({
            time: z.array(z.string()),
            temperature_2m_max: z.array(z.number()),
            temperature_2m_min: z.array(z.number()),
        })
        .optional(),
});