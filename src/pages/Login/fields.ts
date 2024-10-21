export type Fields = {
  email: string
  password: string
}

export const validations = {
  email: {
    required: 'Email é obrigatório',
  },
  password: {
    required: 'Senha é obrigatório',
  },
}
