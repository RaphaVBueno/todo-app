export type Usuario = {
  id: number
  email: string
  name: string
  username: string
  birthDate: string
  role: Role
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
