import { NewAppointmentDialog } from '@/components/new-appointment-dialog';
import { PeriodCard } from '@/components/period-card';
import { PeriodDateFilter } from '@/components/period-date-filter';
import { Button } from '@/components/ui/button';
import { PeriodTimes, PeriodTimesName } from '@/constants/period-times';
import { Appointment } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { parseDateDDMMYYYY } from '@/utils/parsers/parse-date-dd-mm-yyyy';
import Image from 'next/image';

type HomePageProps = PageProps<'/'> & {
    searchParams: Promise<{ period: string }>;
};
export default async function HomePage({ searchParams }: HomePageProps) {
    const { period } = await searchParams;
    const periodDateFiltered = parseDateDDMMYYYY(period);

    const appointments = await prisma.appointment.findMany({
        where: {
            scheduleAt: {
                gte: periodDateFiltered,
            },
        },
        orderBy: {
            scheduleAt: 'asc',
        },
    });
    const {
        morning: morningAppointments,
        afternoon: afternoonAppointments,
        night: nightAppointments,
    } = appointments.reduce(
        (periodAppointments, appointment) => {
            const appointmentPeriod = appointment.scheduleAt.getHours();

            for (const [periodName, [periods]] of Object.entries(PeriodTimes)) {
                const [periodStarts, periodEnds] = periods;
                if (
                    appointmentPeriod >= periodStarts &&
                    appointmentPeriod < periodEnds
                ) {
                    periodAppointments[periodName as PeriodTimesName].push(
                        appointment
                    );
                    break;
                }
            }

            return periodAppointments;
        },
        {
            [PeriodTimesName.MORNING]: [],
            [PeriodTimesName.AFTERNOON]: [],
            [PeriodTimesName.NIGHT]: [],
        } as Record<PeriodTimesName, Appointment[]>
    );

    return (
        <div className="h-screen overflow-hidden space-y-2">
            <figure className="bg-background-tertiary px-5 py-3 rounded-br-xl flex items-center gap-2 w-fit">
                <Image
                    src="/icon.svg"
                    alt=""
                    height={20}
                    width={20}
                    className="size-5 aspect-square"
                    priority
                />
                <figcaption className="uppercase text-content-brand typo-label-large">
                    Petshop
                </figcaption>
            </figure>

            <main className="container gap-8 grid grid-cols-[auto,minmax(0,1fr)] size-full max-sm:p-5 max-sm:pb-40 pb-24">
                <header className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="typo-title text-content-primary">
                            Sua agenda
                        </h2>
                        <p className="typo-paragraph-medium text-content-secondary">
                            Aqui você pode ver todos os clientes e serviços
                            agendados para hoje.
                        </p>
                    </div>

                    <PeriodDateFilter />
                </header>

                <div className="space-y-3 overflow-y-auto h-full">
                    <PeriodCard
                        periodName={PeriodTimesName.MORNING}
                        appointments={morningAppointments}
                    />
                    <PeriodCard
                        periodName={PeriodTimesName.AFTERNOON}
                        appointments={afternoonAppointments}
                    />
                    <PeriodCard
                        periodName={PeriodTimesName.NIGHT}
                        appointments={nightAppointments}
                    />
                </div>
            </main>
            <NewAppointmentDialog>
                <Button className="fixed bottom-8 right-8 shadow-cta">
                    Novo agendamento
                </Button>
            </NewAppointmentDialog>
        </div>
    );
}
