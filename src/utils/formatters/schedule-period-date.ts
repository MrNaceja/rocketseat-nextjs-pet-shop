export function formatSchedulePeriodDate(date: Date) {
    return new Intl.DateTimeFormat('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
