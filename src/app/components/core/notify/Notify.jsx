import React from 'react';

import { Snackbar, MuiAlert } from '../@material-ui/MaterialUI';

export default function Notify(props) {
  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.snackDuration}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
