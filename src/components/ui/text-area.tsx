import { cn } from '@/utils/cn';
import { ComponentProps, useId } from 'react';

export function TextArea({
    className,
    children: label,
    id,
    rows = 6,
    ...props
}: ComponentProps<'textarea'>) {
    const _id = useId();

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && (
                <label
                    htmlFor={_id + id}
                    className="typo-label-medium text-content-primary"
                >
                    {label}
                </label>
            )}
            <textarea
                {...props}
                id={_id + id}
                rows={rows}
                className={`
                        resize-none
                        rounded-lg border border-border-primary
                        hover:border-border-secondary
                        focus-visible:border-border-brand
                        focus:outline-none

                        placeholder:typo-label-large placeholder:font-normal placeholder:text-content-secondary
                        typo-label-large font-normal text-content-primary
                    `}
            />
        </div>
    );
}
