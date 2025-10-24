import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const button = cva('transition-colors', {
    variants: {
        variant: {
            primary: `
                px-5 py-3 rounded-lg bg-content-brand hover:bg-background-highlights text-background-primary
                typo-label-large
            `,
            ghost: `
                px-5 py-3 rounded-lg bg-muted hover:bg-border-divisor text-foreground
                typo-label-large
            `,
            destructive: `
                px-5 py-3 rounded-lg bg-destructive hover:bg-destructive/80 text-destructive-foreground
                typo-label-large
            `,
            link: `
                text-content-tertiary hover:text-content-primary
                typo-paragraph-small hover:underline
            `,
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;
export function Button({ className, variant, ...props }: ButtonProps) {
    return <button {...props} className={button({ variant, className })} />;
}
