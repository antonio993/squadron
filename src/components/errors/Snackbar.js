import { Stack, Snackbar } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const error = useSelector(state => state.connector.errorMsg) || useSelector(state => state.user.errorMsg);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    error && setOpen(true);
  }, [error]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarComponent;