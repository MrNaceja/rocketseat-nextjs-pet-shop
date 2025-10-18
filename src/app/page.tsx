import { NewAppointmentDialog } from '@/components/new-appointment-dialog';
import { PeriodCard } from '@/components/period-card';
import { Button } from '@/components/ui/button';
import { PeriodTimesName } from '@/constants/period-times';
import Image from 'next/image';

export default function HomePage() {
    return (
        <section className="h-screen overflow-hidden space-y-2">
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
                </header>

                <div className="space-y-3 overflow-y-auto h-full">
                    <PeriodCard periodName={PeriodTimesName.MORNING} />
                    <PeriodCard periodName={PeriodTimesName.AFTERNOON} />
                    <PeriodCard periodName={PeriodTimesName.NIGHT} />
                </div>
            </main>
            <NewAppointmentDialog>
                <Button className="fixed bottom-8 right-8 shadow-cta">
                    Novo agendamento
                </Button>
            </NewAppointmentDialog>
        </section>
    );
}
