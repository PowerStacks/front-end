import * as Yup from 'yup';
// import { useState } from 'react';
// next
// import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../../routes/paths';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
// import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import { getAuth, getIdToken } from 'firebase/auth';

// ----------------------------------------------------------------------

export default function RechargeForm() {
  // const { login } = useAuth();
  let { user } = useAuth();

  const isMountedRef = useIsMountedRef();

  // const [showPassword, setShowPassword] = useState(false);

  const RechargeSchema = Yup.object().shape({
    meterNumber: Yup.string().required('Meter Number is required'),
    amount: Yup.string().required('An amount is required'),
    phone: Yup.string().required('Phone Number is required'),
    // email: Yup.string().email('Email must be a valid email').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    meterNumber: '123456',
    // password: 'demo1234',
    // remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(RechargeSchema),
    defaultValues,
  });

  const {
    // reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const auth = getAuth();
  const { currentUser } = auth;

  const onSubmit = async (data) => {
    try {
      const token = await getIdToken(currentUser, true);
      console.log(token);
      console.log(user);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        '/pay',
        {
          email: user.email,
          amount: Number(data.amount) * 100,
          meter_number: Number(data.meterNumber),
          Customer_contact: Number (data.phone),
        },
        { headers }
      );
      const { authorization_url } = response.data;
      // console.log(register);
      console.log(response);
      console.log(authorization_url);
      window.location.replace(authorization_url);
      // await login(data.amount, data.meterNumber, data.phone );
    } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="meterNumber" label="Meter Number" />
        <RHFTextField name="amount" label="Amount" />
        <RHFTextField name="phone" label="Phone Number" />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
        Purchase
      </LoadingButton>
    </FormProvider>
  );
}
