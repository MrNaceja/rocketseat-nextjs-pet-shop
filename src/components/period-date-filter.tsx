'use client';

import { DatePicker } from '@/components/ui/date-picker';
import { parseDateDDMMYYYY } from '@/utils/parsers/parse-date-dd-mm-yyyy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function PeriodDateFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentFilter = parseDateDDMMYYYY(searchParams.get('period'));

    const handleChangePeriodDateSelected = (value?: Date) => {
        const mutableSearchParams = new URLSearchParams(
            searchParams.toString()
        );
        if (!value) {
            mutableSearchParams.delete('period');
        } else {
            mutableSearchParams.set('period', value.toLocaleDateString());
        }

        router.push(`${pathname}?${mutableSearchParams.toString()}`);
    };

    return (
        <DatePicker
            className="hidden md:flex"
            value={currentFilter}
            onChange={handleChangePeriodDateSelected}
        />
    );
}
