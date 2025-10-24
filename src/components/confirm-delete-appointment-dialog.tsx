import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { PropsWithChildren } from 'react';

type ConfirmDeleteAppointmentDialogProps = PropsWithChildren & {
    onConfirm?: () => void;
};
export function ConfirmDeleteAppointmentDialog({
    children: trigger,
    onConfirm,
}: ConfirmDeleteAppointmentDialogProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>Confirmação</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body className="min-h-12">
                    <Dialog.Description>
                        Tem certeza que deseja deletar este agendamento?
                    </Dialog.Description>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.Dismissable asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </Dialog.Dismissable>
                    <Dialog.Dismissable asChild>
                        <Button variant="destructive" onClick={onConfirm}>
                            Sim, prosseguir
                        </Button>
                    </Dialog.Dismissable>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog.Root>
    );
}
