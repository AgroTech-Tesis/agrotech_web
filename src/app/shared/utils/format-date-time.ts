export function formatDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString('es-ES');
}
