'use client';

import { deleteAppointment } from '@/app/actions/appointment';
import { ConfirmDeleteAppointmentDialog } from '@/components/confirm-delete-appointment-dialog';
import { Button } from '@/components/ui/button';
import { PeriodTimes, PeriodTimesName } from '@/constants/period-times';
import { Appointment } from '@/generated/prisma';
import { formatSchedulePeriodDate } from '@/utils/formatters/schedule-period-date';
import { ListX } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ComponentProps } from 'react';

type PeriodCardProps = ComponentProps<'section'> & {
    periodName: PeriodTimesName;
    appointments: Appointment[];
};
export function PeriodCard({
    periodName,
    appointments,
    ...props
}: PeriodCardProps) {
    const [periodRange, periodIcon, periodDescription] =
        PeriodTimes[periodName];
    const [periodStarts, periodEnds] = periodRange;

    const hasAppointments = appointments.length > 0;

    const withHandlerConfirmDeleteAppointment =
        (id: Appointment['id']) => async () => {
            await deleteAppointment(id);
        };

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
                    {String(periodStarts).padStart(2, '0')}h-
                    {String(periodEnds).padStart(2, '0')}h
                </span>
            </header>
            {hasAppointments ? (
                <ul className="min-h-32 divide-y divide-border-divisor p-5">
                    {appointments.map((appointment) => (
                        <li
                            key={appointment.id}
                            className="flex items-center gap-4 justify-between py-4 px-3 flex-wrap"
                        >
                            <div className="flex items-center gap-4">
                                <time
                                    dateTime={appointment.scheduleAt.toISOString()}
                                    className="typo-label-medium text-content-primary"
                                >
                                    {formatSchedulePeriodDate(
                                        appointment.scheduleAt
                                    )}
                                </time>
                                <h5 className="typo-paragraph-small text-content-secondary">
                                    <strong className="typo-label-small text-content-primary mr-1">
                                        {appointment.pet}
                                    </strong>
                                    / {appointment.tutor}
                                </h5>
                            </div>

                            <span className="typo-paragraph-small text-content-secondary">
                                {appointment.service}
                            </span>

                            <ConfirmDeleteAppointmentDialog
                                onConfirm={withHandlerConfirmDeleteAppointment(
                                    appointment.id
                                )}
                            >
                                <Button variant="link">
                                    Remover agendamento
                                </Button>
                            </ConfirmDeleteAppointmentDialog>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="size-full flex flex-col items-center justify-center gap-2 p-10 text-content-tertiary">
                    <ListX className="size-10" />
                    <p>Sem agendamentos para este período</p>
                </div>
            )}
        </section>
    );
}
