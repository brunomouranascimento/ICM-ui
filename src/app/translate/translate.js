export const translate = term => {
  if (term === 'Invalid user/password.')
    return 'Usuário e/ou senha incorretos.';
  if (term === 'User not found.') return 'Usuário não encontrado.';
  if (term === 'User already exists.') return 'E-mail já cadastrado.';
  if (term === 'User created, confirmation e-mail sended.')
    return 'Usuário criado com sucesso. Enviamos um e-mail confirmando seu cadastro.';
  if (term === 'Token sent by email.')
    return 'Enviamos um e-mail para redefinir sua senha.';
  if (term === 'Password updated.') return 'Senha alterada com sucesso.';
  if (term === 'Invalid token.') return 'Token inválido.';
  if (term === 'Token expired, generate a new one.') return 'Token expirado.';
  return term;
};
