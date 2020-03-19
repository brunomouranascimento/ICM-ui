import React from 'react';

import {
  useMediaQuery,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import Routes from './Routes';

import './scss/App.scss';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: red[900]
          },
          secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f'
          }
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
