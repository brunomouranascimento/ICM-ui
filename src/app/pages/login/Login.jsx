import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Paper
} from '../../components/core/@material-ui/MaterialUI';

import { translate } from '../../translate/translate';
import { validEmail } from '../../utils/util';

import { loginService } from './Login.service';
import { authService } from '../../authentication/authService';

import logoICM from '../../../assets/images/logo_icm.png';

import Notify from '../../components/core/notify/Notify';

import styles from './Login.module.scss';

export default function Login(props) {
  const [formLogin, setFormLogin] = useState({
    email: null,
    password: null
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackDuration, setSnackDuration] = useState(3000);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loginService.logout();
  });

  const notify = (open, snackDuration, severity, message) => {
    setOpen(open);
    setSnackDuration(snackDuration);
    setSeverity(severity);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const login = e => {
    const { email, password } = formLogin;
    setLoggingIn(true);
    e.preventDefault();
    if (!email) {
      notify(true, 3000, 'error', 'Digite um usuário.');
      setLoggingIn(false);
      return;
    }
    if (!password) {
      notify(true, 3000, 'error', 'Digite uma senha.');
      setLoggingIn(false);
      return;
    }
    if (!email.match(validEmail)) {
      notify(true, 3000, 'error', 'Digite um e-mail válido.');
      setLoggingIn(false);
      return;
    }

    if (email && password) {
      loginService
        .login({
          email,
          password
        })
        .then(response => {
          const { token, data } = response;
          authService.setToken(token);
          authService.setUser(data.name);
          props.history.push('/');
        })
        .catch(error => {
          notify(true, 3000, 'error', translate(error.response.data.message));
          setOpen(true);
          setLoggingIn(false);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
          <form className={styles.form} autoComplete="off">
            <TextField
              error={formLogin.email === ''}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              size="small"
              onChange={e =>
                setFormLogin({ ...formLogin, email: e.target.value })
              }
              disabled={loggingIn}
            />
            <TextField
              error={formLogin.password === ''}
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
              onChange={e =>
                setFormLogin({ ...formLogin, password: e.target.value })
              }
              disabled={loggingIn}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={login}
              disabled={loggingIn}
            >
              {loggingIn ? 'VERIFICANDO DADOS DE ACESSO' : 'ENTRAR'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {'Cadastre-se'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
      <Notify
        open={open}
        snackDuration={snackDuration}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </Container>
  );
}
