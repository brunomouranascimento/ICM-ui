import React, { useState, useEffect } from 'react';
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
  VisibilityOff,
  Typography
} from '../../components/core/@material-ui/MaterialUI';

import { translate } from '../../translate/translate';

import { resetPasswordService } from './ResetPassword.service.js';

import logoICM from '../../../assets/images/logo_icm.png';

import Notify from '../../components/core/notify/Notify';

import styles from './ResetPassword.module.scss';

export default function ResetPassword(props) {
  const [validToken, setValidToken] = useState(false);
  const [formForgotPasssowrd, setFormForgotPasssowrd] = useState({
    password: '',
    confirmPassword: ''
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackDuration, setSnackDuration] = useState(3000);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const { token } = props.match.params;
      resetPasswordService
        .checkToken(token)
        .then(response => {
          if (response.validToken) setValidToken(true);
        })
        .catch(error => {});
    };

    checkToken();
  }, [props]);

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

  const updatePassword = e => {
    const { password, confirmPassword } = formForgotPasssowrd;
    setUpdatingPassword(true);
    e.preventDefault();

    if (!password) {
      notify(true, 3000, 'error', 'Digite uma senha.');
      setUpdatingPassword(false);
      return;
    }
    if (!confirmPassword) {
      notify(true, 3000, 'error', 'Confirme sua senha.');
      setUpdatingPassword(false);
      return;
    }

    if (password !== confirmPassword) {
      notify(true, 3000, 'error', 'As senhas não coincidem.');
      setUpdatingPassword(false);
      return;
    }
    resetPasswordService
      .resetPassword({
        password,
        token: props.match.params.token
      })
      .then(response => {
        const { message } = response;
        notify(true, 6000, 'success', translate(message));
        setOpen(true);
        setUpdatingPassword(false);
        setUpdatedPassword(true);
        setTimeout(() => {
          props.history.push('/login');
        }, 6500);
      })
      .catch(error => {
        notify(true, 3000, 'error', translate(error.response.data.message));
        setUpdatingPassword(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm" className={styles.container}>
      <Paper elevation={3}>
        <div className={styles.paper}>
          <img src={logoICM} alt="ICM logo" className={styles.logo} />
          <form className={styles.form} autoComplete="off">
            <Grid container spacing={2}>
              {validToken ? (
                <>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Nova senha"
                      size="small"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      onChange={e =>
                        setFormForgotPasssowrd({
                          ...formForgotPasssowrd,
                          password: e.target.value
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      autoComplete="current-password"
                      disabled={updatingPassword || updatedPassword}
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
                        setFormForgotPasssowrd({
                          ...formForgotPasssowrd,
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      autoComplete="current-password"
                      disabled={updatingPassword || updatedPassword}
                    />
                  </Grid>{' '}
                </>
              ) : (
                <Typography
                  className={styles.typography}
                  component="h1"
                  variant="h5"
                >
                  Token inválido
                </Typography>
              )}
            </Grid>
            {validToken && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
                onClick={updatePassword}
                disabled={updatingPassword || updatedPassword}
              >
                {updatingPassword
                  ? 'ALTERANDO SENHA...'
                  : updatedPassword
                  ? 'SUCESSO!'
                  : 'ALTERAR SENHA'}
              </Button>
            )}

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
