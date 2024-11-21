export type Fields = {
  email: string
  password: string
  name: string
  birthDate: string
  username: string
  confirmPassword: string
}

export const validations = {
  email: {
    required: 'O e-mail é obrigatório',
    pattern: {
      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Insira um e-mail válido',
    },
  },
  password: {
    required: 'Insira um senha',
    minLength: {
      value: 6,
      message: 'A senha deve ter pelo menos 6 caracteres',
    },
  },
  name: {
    required: 'Insira um nome',
  },
  username: {
    required: 'Insira um nome de usuário',
  },
  birthDate: {
    required: 'Insira uma data de nascimento',
  },
}

export const passwordValidation = (password: string) => {
  return {
    confirmPassword: {
      required: 'Confirme sua senha',
      validate: (value: string) =>
        value === password || 'As senhas não coincidem',
    },
  }
}
