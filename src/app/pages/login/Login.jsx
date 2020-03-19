import React, { useState, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  Paper
} from '@material-ui/core';

import { loginService } from './Login.service';
import { authService } from '../../authentication/authService';

import logoICM from '../../../assets/images/logo_icm.png';

import styles from './Login.module.scss';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loginService.logout();
  });

  const login = async e => {
    e.preventDefault();
    const response = await loginService.login({
      email,
      password
    });

    if (response.data) {
      const { token, data } = response;
      authService.setToken(token);
      authService.setUser(data.name);
      console.log(data);
      props.history.push('/');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <CssBaseline />
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
          {/* <Typography component="h1" variant="h5">
            Lista de Louvores
          </Typography> */}
          <form className={styles.form} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar e-mail"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={login}
            >
              ENTRAR
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Cadastre-se'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
