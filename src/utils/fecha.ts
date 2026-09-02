const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export const fechaLarga = (d: Date) =>
  d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export const fechaCorta = (d: Date) => ({
  dia: d.getDate(),
  mes: meses[d.getMonth()],
  año: d.getFullYear(),
});

export const iso = (d: Date) => d.toISOString().slice(0, 10);

export const euros = (n: number) =>
  n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 });
