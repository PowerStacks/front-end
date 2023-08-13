/* eslint-disable no-useless-escape */
import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import {useAuth} from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import axios from 'axios';

// ----------------------------------------------------------------------

export default function RegisterForm() {
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
    
    try {
      await register(
        // data.email, data.password, data.firstName, data.lastName
        {email: data.email,
          password: data.password,
          // returnSecureToken: true
          username: `${data.firstName} ${data.lastName}`,
          userType: 'REGULAR'
          // is_merchant: false,
          // is_admin: false,
        }
        );
        //  console.log({
        //   email: data.email,
        //   password: data.password,
        //   username: `${data.firstName} ${data.lastName}`,
        //   userType: 'REGULAR'
        //  });
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

  const handleSignUp = async (data, event) => {
    event.preventDefault();
    try {
      // let username = `${data.firstName}_${data.lastName}`;
      let username = `${data.email}`;
      // await signUp(username, password, email);
      await signUp(username, data.password, data.email)
      console.log('Sign Up  was successful!');
      // Handle successful sign-up, e.g., display success message, redirect to a verification page, etc.
    } catch (error) {
      console.error('Sign Up error:', error);
      if (error.message.includes('pattern')) {
        setError('afterSubmit', { ...error, message: 'No spacekeys allowed. Please input a valid username' });
        console.log(setError);
      console.log(error.message);
      } else {
        setError('afterSubmit', { ...error, message: error.message });
        console.log(setError);
        console.log(error.message);
      }
     
      // Handle sign-up error, display an error message, etc.
    }
  };

  const signUp = async (username, password, email) => {
    const poolData = {
      UserPoolId: 'us-east-1_OMTYcoMVD', // Replace with your Cognito User Pool ID
      ClientId: '2mcd4823p6bn53od41df1uonog', // Replace with your Cognito App Client ID
    };

    const userPool = new CognitoUserPool(poolData);
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({Name: 'custom:UserType', Value: 'MERCHANT'}),
      // Add any other user attributes you want to set during sign-up
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(username, password, attributeList, null, (error, result) => {
        if (error) {
          console.error('Error signing up:', error);
          reject(error);
        } else {
          console.log('Sign-up result:', result);
          resolve(result.user);
        }
      });
    });
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleSignUp)}>
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
