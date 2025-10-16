import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'pgdata/**',
            'src/generated/prisma/**',
            'build/**',
            'next-env.d.ts',
        ],
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            indent: ['error', 4],
        },
    },
];

export default eslintConfig;
