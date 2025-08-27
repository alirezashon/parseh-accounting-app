export const isNumeric = (value: string) => /^\d*$/.test(value)
export const useAddCommasToNumber = (value: number) => {
  const numberValue = value?.toString().replace(/\D/g, '')
  return numberValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
