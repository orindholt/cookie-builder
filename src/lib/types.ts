export interface Cookie {
  name: string
  value: string
  domain: string
  path: string
  expires?: Date
  maxAge: number | null
  httpOnly: boolean
  secure: boolean
  sameSite: 'Strict' | 'Lax' | 'None'
}
