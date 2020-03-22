import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Paper,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { translate } from '../../translate/translate';

import { loginService } from './Login.service';
import { authService } from '../../authentication/authService';

import logoICM from '../../../assets/images/logo_icm.png';

import styles from './Login.module.scss';

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loginService.logout();
  });

  const login = e => {
    setLoggingIn(true);
    e.preventDefault();
    if (!email) {
      setErrorMessage('Digite um usuário.');
      setOpen(true);
    }
    if (email && !password) {
      setErrorMessage('Digite uma senha.');
      setOpen(true);
    }

    if (email && password) {
      loginService
        .login({
          email,
          password
        })
        .then(response => {
          console.log(response);
          const { token, data } = response;
          authService.setToken(token);
          authService.setUser(data.name);
          props.history.push('/');
        })
        .catch(error => {
          console.log(error.response.data);
          setErrorMessage(translate(error.response.data.message));
          setOpen(true);
        });
    }
    setLoggingIn(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
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
              disabled={loggingIn}
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
                <Link href="#" variant="body2">
                  {'Cadastre-se'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
