import { Button } from '@/components/ui/button';
import { PeriodTimes, PeriodTimesName } from '@/constants/period-times';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ComponentProps } from 'react';

interface PeriodCardProps extends ComponentProps<'section'> {
    periodName: PeriodTimesName;
}
export function PeriodCard({ periodName, ...props }: PeriodCardProps) {
    const [periodRange, periodIcon, periodDescription] =
        PeriodTimes[periodName];
    const [periodStarts, periodEnds] = periodRange;

    return (
        <section
            {...props}
            className="bg-background-tertiary rounded-xl divide-y divide-border-divisor"
        >
            <header className="py-3 px-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <DynamicIcon
                        name={periodIcon}
                        className="size-8 text-content-brand fill-accent-brand-light"
                    />
                    <h2 className="typo-label-large text-content-primary">
                        {periodDescription}
                    </h2>
                </div>

                <span className="typo-label-large text-content-secondary">
                    {String(periodStarts).padStart(2, '0')}h
                    {String(periodEnds).padStart(2, '0')}h
                </span>
            </header>
            <ul className="min-h-32 divide-y divide-border-divisor p-5">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <li
                        key={`item-${idx}`}
                        className="flex items-center gap-4 justify-between py-4 px-3 flex-wrap"
                    >
                        <div className="flex items-center gap-4">
                            <time
                                datetime=""
                                className="typo-label-medium text-content-primary"
                            >
                                09:00
                            </time>
                            <h5 className="typo-paragraph-small text-content-secondary">
                                <strong className="typo-label-small text-content-primary mr-1">
                                    Pet Name
                                </strong>
                                / Tutor Name
                            </h5>
                        </div>

                        <span className="typo-paragraph-small text-content-secondary">
                            Atividade
                        </span>

                        <Button variant="link">Remover agendamento</Button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
