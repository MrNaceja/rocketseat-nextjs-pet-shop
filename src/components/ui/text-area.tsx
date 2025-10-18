import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import { ComponentProps, useId } from 'react';
import { FieldError } from 'react-hook-form';

type TextAreaProps = ComponentProps<'textarea'> & {
    error?: FieldError;
};
export function TextArea({
    className,
    children: label,
    id,
    rows = 6,
    error,
    ...props
}: TextAreaProps) {
    const _id = useId();

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && <Label htmlFor={_id + id}>{label}</Label>}
            <textarea
                {...props}
                id={_id + id}
                rows={rows}
                className={`
                        resize-none p-3
                        rounded-lg border border-border-primary
                        hover:border-border-secondary

                        placeholder:typo-label-large placeholder:font-normal placeholder:text-content-secondary
                        typo-label-large font-normal text-content-primary
                    `}
            />
            {error && (
                <p className="typo-paragraph-small text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    );
}
