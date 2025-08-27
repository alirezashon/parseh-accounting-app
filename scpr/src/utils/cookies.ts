export const getCookieByKey = (key: string): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export const setCookieByKey = (key: string, value: string, days = 30) => {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; path=/; expires=${expires}`
}
