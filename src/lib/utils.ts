import { DEFAULT_COOKIE } from './constants'
import type { Cookie } from './types'
import { isNil, merge } from 'lodash'

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

type CookieOptions = {
  strip: boolean
  prefix: string
  semiColon: boolean
}

const defaultOptions: CookieOptions = {
  prefix: '',
  strip: false,
  semiColon: true
}

function cookieAttribute(name: string, value?: any) {
  if (!name || isNil(value) || value === '' || value === false) return ''
  if (value === true) return `${name};`
  return `${name}=${value};`
}
export function cookieToString(cookie: Cookie, options?: Partial<CookieOptions>) {
  const { name, value, expires, expire, ...rest } = cookie
  options = { ...defaultOptions, ...options }

  let string = `${options.prefix || ''}'
    ${cookieAttribute(name, value)}
    ${cookieAttribute('Expires', expire ? 'Thu, 01 Jan 1970 00:00:01 GMT' : (typeof expires === 'string' ? new Date(expires) : expires)?.toUTCString())}
    ${Object.entries(rest)
      .map(([key, value]) => cookieAttribute(capitalize(key), value))
      .join('\n\t')}
'${options.semiColon ? ';' : ''}`.replace(/^\s*\n/gm, '')

  // Strip extra spaces, tabs, newlines and multiple semicolons
  if (options.strip)
    string = string.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, '').replace(/;(?=[^;\s|'])/g, '; ')

  return string
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

export function parseCookieString(cookie: string): Cookie {
  const attributes = cookie
    .replace(/document\.*cookie\s*=|'/g, '')
    .split(';')
    .map((c) => c.trim())
    .filter(Boolean)

  let nameValue = false

  return attributes.reduce((acc, c): Cookie => {
    let [key, value] = c.split('=') as [string, any]
    key = key.toLowerCase()

    if (isValidDate(value)) value = new Date(value)
    else if (value === 'true') value = true
    else if (value === 'false') value = false
    else if (!isNaN(value)) value = Number(value)

    if (key in DEFAULT_COOKIE) {
      acc[key] = value
    } else if (!nameValue) {
      nameValue = true
      acc.name = key
      acc.value = value
    }
    return acc
  }, {} as any)
}

export function isValidDate(string: string): boolean {
  const date = new Date(string)
  return !isNaN(date.getTime())
}
