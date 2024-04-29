export type SameSite = 'Strict' | 'Lax' | 'None'

export interface Cookie {
  name: string
  value: string
  domain: string
  path: string
  expires: Date | null
  expire?: false
  maxAge: number | null
  httpOnly: boolean
  secure: boolean
  sameSite: SameSite
}
