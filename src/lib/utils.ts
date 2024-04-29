import type { Cookie } from './types'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function parseCookie(cookie: Cookie) {
  const { name, value, expires, expire, ...attributes } = cookie

  const attr = (name: string, value: any) => (name && value ? `${name}=${value};` : '')

  return `document.cookie = '
    ${attr(name, value)}
    ${attr('Expires', expire ? 'Thu, 01 Jan 1970 00:00:01 GMT' : expires?.toUTCString())}
    ${Object.entries(attributes)
      .map(([key, value]) => attr(capitalize(key), value))
      .join('\n\t')}
';`.replace(/^\s*\n/gm, '')
}

export function stripCookieString(cookie: string) {
  return cookie.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '').replace(/;(?=[^;\s|'])/g, '; ')
}

export async function copyString(options: {
  text: string
  onSuccess?: () => void
  onError?: () => void
}) {
  const { text, onSuccess, onError } = options
  // Failsafe for incompatiable browsers - Copying fails first time for specific browsers
  let retry = 0

  if (retry < 3) {
    try {
      await navigator.clipboard.writeText(text)
      if (onSuccess) onSuccess()
    } catch (error) {
      copyString(options)
      retry++
    }
    return
  }
  if (onError) onError()
}
