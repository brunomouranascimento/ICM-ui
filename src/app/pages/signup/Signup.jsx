import React, { useState } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Visibility,
  VisibilityOff
} from '../../components/core/@material-ui/MaterialUI';

import { translate } from '../../translate/translate';
import { validEmail } from '../../utils/util';

import { signupService } from './Signup.service';

import logoICM from '../../../assets/images/logo_icm.png';

import Notify from '../../components/core/notify/Notify';

import styles from './Signup.module.scss';

export default function Signup(props) {
  const [formSignup, setFormSignup] = useState({
    name: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null
  });
  const [signingUp, setSigningUp] = useState(false);
  const [signedUp, setSignedgUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackDuration, setSnackDuration] = useState(3000);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

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

  const signup = e => {
    const { name, lastname, email, password, confirmPassword } = formSignup;
    setSigningUp(true);
    e.preventDefault();
    if (!name) {
      notify(true, 3000, 'error', 'Digite seu nome.');
      setSigningUp(false);
      return;
    }
    if (!lastname) {
      notify(true, 3000, 'error', 'Digite seu sobrenome.');
      setSigningUp(false);
      return;
    }
    if (!email) {
      notify(true, 3000, 'error', 'Digite seu e-mail.');
      setSigningUp(false);
      return;
    }
    if (!email.match(validEmail)) {
      notify(true, 3000, 'error', 'Digite um e-mail válido.');
      setSigningUp(false);
      return;
    }
    if (!password) {
      notify(true, 3000, 'error', 'Digite uma senha.');
      setSigningUp(false);
      return;
    }
    if (!confirmPassword) {
      notify(true, 3000, 'error', 'Confirme sua senha.');
      setSigningUp(false);
      return;
    }

    if (password !== confirmPassword) {
      notify(true, 3000, 'error', 'As senhas não coincidem.');
      setSigningUp(false);
      return;
    }

    signupService
      .signup({
        name: `${name} ${lastname}`,
        email,
        password
      })
      .then(response => {
        const { message } = response;
        notify(true, 6000, 'success', translate(message));
        setOpen(true);
        setSigningUp(false);
        setSignedgUp(true);
        setTimeout(() => {
          props.history.push('/login');
        }, 6500);
      })
      .catch(error => {
        notify(true, 3000, 'error', translate(error.response.data.message));
        setSigningUp(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm" className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
          <form className={styles.form} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formSignup.name === ''}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  size="small"
                  autoFocus
                  onChange={e =>
                    setFormSignup({ ...formSignup, name: e.target.value })
                  }
                  disabled={signingUp || signedUp}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  size="small"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e =>
                    setFormSignup({ ...formSignup, lastname: e.target.value })
                  }
                  disabled={signingUp || signedUp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  size="small"
                  name="email"
                  autoComplete="email"
                  onChange={e =>
                    setFormSignup({ ...formSignup, email: e.target.value })
                  }
                  disabled={signingUp || signedUp}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={e =>
                    setFormSignup({ ...formSignup, password: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={e => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  autoComplete="current-password"
                  disabled={signingUp || signedUp}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Repetir senha"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  onChange={e =>
                    setFormSignup({
                      ...formSignup,
                      confirmPassword: e.target.value
                    })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={e => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  autoComplete="current-password"
                  disabled={signingUp || signedUp}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={signup}
              disabled={signingUp || signedUp}
            >
              {signingUp
                ? 'REALIZANDO CADASTRO...'
                : signedUp
                ? 'SUCESSO!'
                : 'CADASTRAR'}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Já tem uma conta? Faça login
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
