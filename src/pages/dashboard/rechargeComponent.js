import * as Yup from 'yup';
import { useState } from 'react';
// next
// import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// import { PATH_AUTH } from '../../routes/paths';
// hooks
import { useAuth } from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
// import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import axios from '../../utils/axios';
import { getAuth, getIdToken } from 'firebase/auth';
import { usePaystackPayment } from 'react-paystack';
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
// import Invoice from '../../../invoice/details';
import { Container, Typography, Link } from '@mui/material';
import useSettings from '../../hooks/useSettings';
// import { PATH_DASHBOARD } from '../../routes/paths';
import NextLink from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// ----------------------------------------------------------------------

export default function RechargeForm() {
  // const { login } = useAuth();
  const { themeStretch } = useSettings();
  let { user } = useAuth();
  // console.log(user)

  const isMountedRef = useIsMountedRef();

  // const [showPassword, setShowPassword] = useState(false);

  const [amount, setAmount] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const RechargeSchema = Yup.object().shape({
    // meterNumber: Yup.string().required('Meter Number is required'),
    // amount: Yup.string().required('An amount is required'),
    // phone: Yup.string().required('Phone Number is required'),
    // email: Yup.string().email('Email must be a valid email').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    // meterNumber: '123456' || user.meter_number,
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
  // console.log(currentUser)

  const config = {
    reference: (new Date()).getTime(),
    email: currentUser.email,
    amount: Number(amount) * 100,
    publicKey: 'pk_test_f45807d93dea99c7825cc05782dd6caad37aa2d3',
    metadata: {
      consumer_id: currentUser.email,
      email: currentUser.email,
      amount: Number(amount) * 100,
      meter_number: Number(meterNumber),
      Customer_contact: Number(phone),
      // address: shippingInfo.address,
      // city: shippingInfo.city,
      // state: shippingInfo.state,
      // country: shippingInfo.country,
      // pinCode: shippingInfo.pinCode,
      // phoneNumber: shippingInfo.phoneNumber,
      // cartItems: JSON.stringify(cartItems)
    },
  };


  const fetch = async (reference) => {
    try {
      const { trxref } = reference;
      console.log(trxref);
      // console.log(metaData)
      const token = await getIdToken(currentUser, true);
      console.log(token);
      console.log(user);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `verifyPayment?trxref=${trxref}&meter_number=${meterNumber}&customer_contact=${phone}`,

        { headers }
      );
      // const { reference } = response.data;
      console.log(response);
      console.log(reference);
      setInvoice(response.data)
      setLoading(false)
      // window.location.replace(authorization_url);
      // await login(data.amount, data.meterNumber, data.phone );
    } catch (error) {
      console.log(error)
    }

  }


  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // try {
    setLoading(true)
    console.log(reference);
    fetch(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
    alert("Wait! You need this oil, don't go!!!!")
  }

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <LoadingButton fullWidth size="large" onClick={() => {
          initializePayment(onSuccess, onClose)
        }} type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>Purchase</LoadingButton>
        {/* <button onClick={() => {
          initializePayment(onSuccess, onClose)
        }}>Purchase</button> */}
      </div>
    );
  };

  const onSubmit = async () => {
    try { /* empty */ } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };



  return (

    <>
      {invoice ? <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Back To Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'Invoices',
            //   href: PATH_DASHBOARD.invoice.root,
            // },
            // { name: invoice?.invoiceNumber || '' },
          ]}
        /> */}
        <Typography variant="body2" align="left" sx={{ my: 2 }}>
          {/* Don’t have a meter?{' '} */}
          <NextLink href='/dashboard/app' passHref>
          <Link variant="subtitle2">
            Back To Dashboard
          </Link>
          </NextLink>
        </Typography>

        {/* <Invoice invoice={invoice} /> */}
      </Container> : invoice === null && loading === true ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress  sx={{color: '#217d50'}}/>
      </Box> : <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField name="meterNumber" label="Meter Number" value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)} />
          <RHFTextField name="amount" label="Amount" value={amount}
            onChange={(e) => setAmount(e.target.value)} />
          <RHFTextField name="phone" label="Phone Number" value={phone}
            onChange={(e) => setPhone(e.target.value)} />
        </Stack>



        {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
        Purchase
      </LoadingButton> */}
        {/* <PaystackHookExample /> */}
      </FormProvider>
      }
    </>
  );
}
