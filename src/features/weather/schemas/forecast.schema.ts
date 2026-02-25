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
});