export const translate = term => {
  if (term === 'Invalid user/password.')
    return 'Usuário e/ou senha incorretos.';
  if (term === 'User not found.') return 'Usuário não encontrado.';
  if (term === 'User already exists.') return 'E-mail já cadastrado.';
  if (term === 'User created, confirmation e-mail sended.')
    return 'Usuário criado com sucesso. Enviamos um e-mail confirmando seu cadastro.';
};
