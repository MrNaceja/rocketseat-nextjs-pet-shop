import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover } from '@/components/ui/popover';
import { cn } from '@/utils/cn';
import { CalendarDaysIcon, ChevronDown } from 'lucide-react';
import { ComponentProps, PropsWithChildren, useId, useState } from 'react';
import { FieldError } from 'react-hook-form';

type DatePickerProps = ComponentProps<typeof Calendar> &
    PropsWithChildren & {
        error?: FieldError;
        value?: Date;
        onChange?: (value?: Date) => void;
        placeholder?: string;
    };
export function DatePicker({
    children: label,
    className,
    id,
    error,
    value,
    onChange,
    placeholder = 'Selecione...',
    ...props
}: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const _id = useId();

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && <Label htmlFor={_id + id}>{label}</Label>}

            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Trigger
                    className={`
                        rounded-lg border border-border-primary p-3  
                        hover:border-border-secondary  
                        flex items-center relative gap-2 w-full text-start 
                    `}
                >
                    <CalendarDaysIcon className="size-6 text-content-brand fill-accent-brand-light/25" />
                    <span className="text-content-secondary flex-1 typo-paragraph-medium">
                        {value ? value.toLocaleDateString() : placeholder}
                    </span>
                    <ChevronDown className="size-5 text-content-primary" />
                </Popover.Trigger>
                <Popover.Modal
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        {...props}
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setOpen(false);
                            onChange?.(date);
                        }}
                    />
                </Popover.Modal>
            </Popover.Root>
            {error && (
                <p className="typo-paragraph-small text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    );
}
