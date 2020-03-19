import React from 'react';

// import { Container } from './styles';

export default function Dashboard() {
  const name = localStorage.getItem('@ICM-User');

  return (
    <div>
      <h1>Olá {name}, seja bem vinda!</h1>
      <br />
      <h1>Te amo, rs!</h1>
    </div>
  );
}
