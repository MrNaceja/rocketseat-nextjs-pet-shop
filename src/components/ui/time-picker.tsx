import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { cn } from '@/utils/cn';
import { ChevronDown, ClockIcon } from 'lucide-react';
import { ComponentProps, useId } from 'react';
import { FieldError } from 'react-hook-form';

const generateTimeOptions = (): string[] => {
    const times = [];

    for (let hour = 9; hour <= 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 21 && minute > 0) break;
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            times.push(timeString);
        }
    }

    return times;
};

const TIME_OPTIONS = generateTimeOptions();

type TimePickerProps = ComponentProps<typeof Select.Root> & {
    error?: FieldError;
    value?: string;
    onChange?: (value?: string) => void;
    className?: string;
    id?: string;
    placeholder?: string;
};
export function TimePicker({
    onChange,
    children: label,
    id,
    className,
    placeholder = 'Selecione...',
    error,
    ...props
}: TimePickerProps) {
    const _id = useId();

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && <Label htmlFor={_id + id}>{label}</Label>}
            <Select.Root {...props} onValueChange={onChange}>
                <Select.Trigger
                    className={`
                        rounded-lg border border-border-primary !p-3  
                        hover:border-border-secondary !bg-background-tertiary
                        flex items-center relative gap-2 flex-1 w-full text-start
                    `}
                >
                    <ClockIcon className="size-6 text-content-brand fill-accent-brand-light/25" />
                    <Select.Value
                        className="text-content-secondary flex-1 typo-paragraph-medium"
                        placeholder={placeholder}
                    />
                    <ChevronDown className="size-5 text-content-primary" />
                </Select.Trigger>
                <Select.Content>
                    {TIME_OPTIONS.map((option) => (
                        <Select.Item key={option} value={option}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            {error && (
                <p className="typo-paragraph-small text-destructive">
                    {error.message}
                </p>
            )}
        </div>
    );
}
