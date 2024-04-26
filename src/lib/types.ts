export interface Cookie {
  name: string
  value: string
  domain: string
  path: string
  expires: Date
  httpOnly: boolean
  secure: boolean
  sameSite: 'Strict' | 'Lax' | 'None'
}
