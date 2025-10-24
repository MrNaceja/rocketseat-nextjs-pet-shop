'use server';

import { PERIOD_TIMES_FORMATTED, PeriodTimes } from '@/constants/period-times';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z4 from 'zod/v4';

const createAppointmentSchema = z4.object({
    tutor: z4
        .string()
        .min(3, 'Minimo de 3 caracteres')
        .nonempty('Nome do tutor é obrigatório'),
    pet: z4
        .string()
        .min(3, 'Minimo de 3 caracteres')
        .nonempty('Nome do pet é obrigatório'),
    phone: z4.string().nonempty('Telefone de contato é obrigatório'),
    service: z4.string().nonempty('Serviço é obrigatório'),
    scheduleAt: z4.date().nonoptional('A data do agendamento é obrigatória'),
});

export async function createAppointment(
    payload: z4.infer<typeof createAppointmentSchema>
) {
    const appointmentPayload = createAppointmentSchema.parse(payload);

    const hour = appointmentPayload.scheduleAt.getHours();

    let isPeriodValid = false;
    for (const [periods] of Object.values(PeriodTimes)) {
        const [periodStarts, periodEnds] = periods;
        if (hour >= periodStarts && hour < periodEnds) {
            isPeriodValid = true;
            break;
        }
    }

    if (!isPeriodValid) {
        throw new Error(
            `Agendamento só pode ser realizado nos períodos ${PERIOD_TIMES_FORMATTED}`
        );
    }

    const existentAppointmentOnSchedule = await prisma.appointment.findFirst({
        where: {
            scheduleAt: appointmentPayload.scheduleAt,
        },
    });

    if (!!existentAppointmentOnSchedule) {
        throw new Error('Este horário já esta reservado');
    }

    await prisma.appointment.create({
        data: {
            ...appointmentPayload,
        },
    });

    revalidatePath('/');
}
