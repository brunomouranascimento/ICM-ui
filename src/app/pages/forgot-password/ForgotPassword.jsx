import React, { useState } from 'react';
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

import { forgotPasswordService } from './ForgotPasssword.service';

import logoICM from '../../../assets/images/logo_icm.png';

import Notify from '../../components/core/notify/Notify';

import styles from './ForgotPassword.module.scss';

export default function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [resetingPassword, setResetingPassword] = useState(false);
  const [resetedPassword, setResetedPassword] = useState(false);
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

  const resetPassword = e => {
    setResetingPassword(true);
    e.preventDefault();

    if (!email) {
      notify(true, 3000, 'error', 'Digite seu e-mail.');
      setResetingPassword(false);
      return;
    }
    if (!email.match(validEmail)) {
      notify(true, 3000, 'error', 'Digite um e-mail válido.');
      setResetingPassword(false);
      return;
    }

    forgotPasswordService
      .forgotPassword({
        email
      })
      .then(response => {
        const { message } = response;
        notify(true, 6000, 'success', translate(message));
        setOpen(true);
        setResetingPassword(false);
        setResetedPassword(true);
      })
      .catch(error => {
        notify(true, 3000, 'error', translate(error.response.data.message));
        setResetingPassword(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm" className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
          <form className={styles.form} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={email === ''}
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="E-mail"
                  size="small"
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                  disabled={resetingPassword || resetedPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={resetPassword}
              disabled={resetingPassword || resetedPassword}
            >
              {resetingPassword
                ? 'VERIFICANDO USUÁRIO...'
                : resetedPassword
                ? 'SUCESSO!'
                : 'RESETAR SENHA'}
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
