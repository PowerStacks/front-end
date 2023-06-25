import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// import axios from 'axios';

// ----------------------------------------------------------------------

export default function RegisterMerchantForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    // reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // console.log({ data });
    // reset();
    // try {
    //   console.log( {email: data.email,
    //       password: data.password,
    //       display_name: `${data.firstName} ${data.lastName}`,
    //       is_merchant: true,
    //       is_admin: false,})
    //   const res = await axios.post(
    //     'http://104.236.193.32:8000/user/CreateUser',
    //     {
    //       email: data.email,
    //       password: data.password,
    //       display_name: `${data.firstName} ${data.lastName}`,
    //       is_merchant: true,
    //       is_admin: false,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    //   reset();
    //   if (isMountedRef.current) {
    //     setError('afterSubmit', { ...error, message: error.message });
    //   }
    // }
    try {
      await register({
        email: data.email,
        password: data.password,
        // returnSecureToken: true
        display_name: `${data.firstName} ${data.lastName}`,
        is_merchant: true,
        is_admin: false,
      });
      console.log({
        email: data.email,
        password: data.password,
        display_name: `${data.firstName} ${data.lastName}`,
        is_merchant: true,
        is_admin: false,
      });
    } catch (error) {
      // console.error(error);
      console.log(error);
      // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.error });
        console.log(setError);
        console.log(error.message);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            // onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            // type="text"
            // value={firstName}
            label="First name"
          />
          <RHFTextField
            name="lastName"
            // onChange={(e) => setLastName(e.target.value)}
            type="text"
            // placeholder="Last name"
            // value={lastName}
            label="Last name"
          />
        </Stack>

        <RHFTextField
          name="email"
          // onChange={(e) => setEmail(e.target.value)}
          // type="email"
          // value={email}
          label="Email Address"
        />

        <RHFTextField
          name="password"
          label="Password"
          // onChange={(e) => setPassword(e.target.value)}
          // value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
