import {
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container
} from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '../inputs/FormInput';

import { loginSchema } from '../../utils/validationSchemas';

import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../store/thunks/userThunk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../errors/Snackbar';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [navigate, token]);

  // 👇 Submit Handler
  const onSubmitHandler = values => {
    dispatch(loginUser(values));
  };

  // 👇 The object returned from useForm Hook
  const methods = useForm({
    resolver: zodResolver(loginSchema)
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }}>
            <FormInput
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormInput
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </FormProvider>
      </Box>
      <SnackbarComponent />
    </Container>
  );
};

export default Login;