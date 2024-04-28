import type { Cookie, SameSite } from './types'

export const SAME_SITE_OPTIONS: SameSite[] = ['Lax', 'Strict', 'None']

export const DEFAULT_COOKIE: Cookie = {
  name: '',
  path: '/',
  value: '',
  domain: '',
  expires: null,
  maxAge: null,
  secure: false,
  httpOnly: false,
  sameSite: SAME_SITE_OPTIONS[0]
}
