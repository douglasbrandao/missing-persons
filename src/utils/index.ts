export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}