'use client';

import { createAppointment } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog } from '@/components/ui/dialog';
import { TextArea } from '@/components/ui/text-area';
import { TextField } from '@/components/ui/text-field';
import { TimePicker } from '@/components/ui/time-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z4 from 'zod/v4';

const newAppointmentFormSchema = z4.object({
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
    scheduleDateAt: z4
        .date()
        .nonoptional('A data do agendamento é obrigatória'),
    scheduleTimeAt: z4.string().min(4, 'A hora do agendamento é obrigatória'),
});
type NewAppointmentFormValues = z4.infer<typeof newAppointmentFormSchema>;

export function NewAppointmentDialog({
    children: trigger,
    ...props
}: DialogProps) {
    const [open, setOpen] = useState(false);
    const newAppointmentForm = useForm({
        resolver: zodResolver(newAppointmentFormSchema),
        defaultValues: {
            pet: '',
            tutor: '',
            phone: '',
            service: '',
            scheduleDateAt: new Date(),
            scheduleTimeAt: '',
        },
    });

    const onSubmitCreateAppointment: SubmitHandler<
        NewAppointmentFormValues
    > = async (values) => {
        const [hour, minutes] = values.scheduleTimeAt.split(':');
        const { scheduleDateAt } = values;
        const scheduleAt = new Date(scheduleDateAt);
        scheduleAt.setHours(Number(hour), Number(minutes), 0, 0);
        console.log({
            scheduleAt,
            hour,
            minutes,
        });
        toast.promise(
            createAppointment({
                ...values,
                scheduleAt,
            }),
            {
                loading: 'Agendando...',
                success() {
                    setOpen(false);
                    return {
                        message: 'Agendamento realizado com sucesso!',
                    };
                },
                error(e) {
                    console.error(e);
                    return {
                        message: `Falha ao realizar o agendamento. ${(e as Error).message}`,
                    };
                },
            }
        );
    };

    const handleOpenStateChange = (open: boolean) => {
        if (!open) {
            // When closes dialog, reset form fields
            newAppointmentForm.reset();
        }
        setOpen(open);
    };

    return (
        <Dialog.Root
            {...props}
            onOpenChange={handleOpenStateChange}
            open={open}
        >
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Modal className="min-w-fit">
                <Dialog.Body asChild>
                    <form
                        onSubmit={newAppointmentForm.handleSubmit(
                            onSubmitCreateAppointment
                        )}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Agende um atendimento</Dialog.Title>
                            <Dialog.Description>
                                Preencha os dados do cliente para realizar o
                                agendamento
                            </Dialog.Description>
                        </Dialog.Header>
                        <Controller
                            control={newAppointmentForm.control}
                            name="tutor"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    leadingIcon="user"
                                    placeholder="Helena de Souza"
                                    error={
                                        newAppointmentForm.formState.errors
                                            .tutor
                                    }
                                >
                                    Nome do Tutor
                                </TextField>
                            )}
                        />
                        <Controller
                            control={newAppointmentForm.control}
                            name="pet"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    leadingIcon="paw-print"
                                    placeholder="Cheddar"
                                    error={
                                        newAppointmentForm.formState.errors.pet
                                    }
                                >
                                    Nome do Pet
                                </TextField>
                            )}
                        />

                        <Controller
                            control={newAppointmentForm.control}
                            name="phone"
                            render={({ field: { onChange, ...field } }) => (
                                <TextField
                                    {...field}
                                    leadingIcon="phone"
                                    placeholder="(00) 00000-0000"
                                    mask="(00) 00000-0000"
                                    error={
                                        newAppointmentForm.formState.errors
                                            .phone
                                    }
                                    onAccept={onChange}
                                >
                                    Telefone
                                </TextField>
                            )}
                        />
                        <TextArea
                            placeholder="Banho e tosa"
                            error={newAppointmentForm.formState.errors.service}
                            {...newAppointmentForm.register('service')}
                        >
                            Descrição do serviço
                        </TextArea>

                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                control={newAppointmentForm.control}
                                name="scheduleDateAt"
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        error={
                                            newAppointmentForm.formState.errors
                                                .scheduleDateAt
                                        }
                                        placeholder="--/--/----"
                                    >
                                        Data
                                    </DatePicker>
                                )}
                            />
                            <Controller
                                control={newAppointmentForm.control}
                                name="scheduleTimeAt"
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        error={
                                            newAppointmentForm.formState.errors
                                                .scheduleTimeAt
                                        }
                                        placeholder="--:--"
                                    >
                                        Hora
                                    </TimePicker>
                                )}
                            />
                        </div>

                        <Dialog.Footer>
                            {/* <Dialog.Dismissable asChild> */}
                            <Button
                                type="submit"
                                disabled={
                                    newAppointmentForm.formState.isSubmitting
                                }
                            >
                                {newAppointmentForm.formState.isSubmitting
                                    ? 'Agendando...'
                                    : 'Agendar'}
                            </Button>
                            {/* </Dialog.Dismissable> */}
                        </Dialog.Footer>
                    </form>
                </Dialog.Body>
            </Dialog.Modal>
        </Dialog.Root>
    );
}
