import '@/config/env';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Pet Shop',
    description: 'Agendamento de Pet Shop Next',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <Toaster
                theme="dark"
                position="top-right"
                className="toaster group"
                style={
                    {
                        '--normal-bg': 'var(--color-background-secondary)',
                        '--normal-text': 'var(--color-accent-paragraph)',
                        '--normal-border': 'var(--color-border-primary)',
                    } as React.CSSProperties
                }
            />
            <body className={`${inter.variable}`}>{children}</body>
        </html>
    );
}
