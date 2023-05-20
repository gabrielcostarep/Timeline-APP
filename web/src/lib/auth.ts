import { cookies } from 'next/headers'
import decode from 'jwt-decode'

type User = Record<'sub' | 'name' | 'avatarUrl', string>

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: User = decode(token)

  return user
}
