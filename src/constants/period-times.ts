import { type IconName } from 'lucide-react/dynamic';

export enum PeriodTimesName {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    NIGHT = 'night',
}

export const PeriodTimes: Record<
    PeriodTimesName,
    [[number, number], IconName, string]
> = {
    morning: [[9, 12], 'sun-dim', 'Manhã'],
    afternoon: [[13, 18], 'cloud-sun', 'Tarde'],
    night: [[19, 21], 'moon-star', 'Noite'],
} as const;

export type PeriodTimesType = typeof PeriodTimes;
export type PeridoTimesMeta = PeriodTimesType[PeriodTimesName];

export const PERIOD_TIMES_FORMATTED = Object.values(PeriodTimes)
    .reduce((formatted, [periods]) => {
        const [periodStarts, periodEnds] = periods;

        return [...formatted, `${periodStarts}h e ${periodEnds}h`];
    }, [] as string[])
    .join(' ou ');
