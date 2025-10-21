import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { ComponentProps, useId } from 'react';
import { FieldError } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

type TextFieldProps = ComponentProps<typeof IMaskInput> & {
    leadingIcon?: IconName;
    error?: FieldError;
};
export function TextField({
    leadingIcon,
    className,
    children: label,
    id,
    error,
    ...props
}: TextFieldProps) {
    const _id = useId();

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && <Label htmlFor={_id + id}>{label}</Label>}

            <span className="flex relative">
                {leadingIcon && (
                    <DynamicIcon
                        name={leadingIcon}
                        className="absolute top-[50%] translate-y-[-50%] left-3 size-6 text-content-brand fill-accent-brand-light/25"
                    />
                )}

                <IMaskInput
                    {...props}
                    className={cn(
                        `
                        rounded-lg border border-border-primary p-3  
                        hover:border-border-secondary  
                        flex flex-1 items-center relative    
                    `,
                        leadingIcon && 'pl-10'
                    )}
                    id={_id + id}
                />
            </span>
            {error && (
                <p className="typo-paragraph-small text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    );
}
