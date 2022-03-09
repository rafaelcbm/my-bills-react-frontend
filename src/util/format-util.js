export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}

export function formatDate(date) {
  return new Date(Date.parse(date)).toLocaleDateString('pt-BR');
}
