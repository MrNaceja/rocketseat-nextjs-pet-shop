import z4 from 'zod/v4';

const envSchema = z4.object({
    DATABASE_URL: z4
        .url()
        .default(
            'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public'
        ),
});

export type Env = z4.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
