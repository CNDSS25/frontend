export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'de-DE'
) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}
