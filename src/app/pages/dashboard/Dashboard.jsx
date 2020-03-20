import React from 'react';

// import { Container } from './styles';

export default function Dashboard() {
  const name = localStorage.getItem('@ICM-User');

  return (
    <div>
      <h1>Olá {name}, seja bem vindo!</h1>
      <br />
    </div>
  );
}
