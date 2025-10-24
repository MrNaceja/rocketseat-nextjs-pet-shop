export function parseDateDDMMYYYY(s?: string | null) {
    if (!s) return undefined;
    const parts = s.split(/[\/\-\.]/);
    if (parts.length !== 3) return undefined;

    const [dd, mm, yyyy] = parts;
    const day = parseInt(dd, 10);
    const month = parseInt(mm, 10) - 1;
    const year = parseInt(yyyy, 10);

    if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year))
        return undefined;

    const d = new Date(year, month, day);
    // valida que não houve overflow (ex.: 32/01 -> mês seguinte)
    if (
        d.getFullYear() !== year ||
        d.getMonth() !== month ||
        d.getDate() !== day
    )
        return undefined;

    return d;
}
