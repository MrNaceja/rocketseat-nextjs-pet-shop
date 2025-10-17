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
