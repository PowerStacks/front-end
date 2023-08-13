import { useState } from 'react';
// @mui
// import { styled } from '@mui/material/styles';
import {
  // Stack,
  Box,
  Button,
  Typography
} from '@mui/material';
// components
// import Image from '../../components/Image';
// import Iconify from '../../components/Iconify';
//
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SvgIcon from "@mui/material/SvgIcon";
// import PaymentNewCardForm from './PaymentNewCardForm';
import { usePaystackPayment } from 'react-paystack';
import { LoadingButton } from '@mui/lab';
// import * as Yup from 'yup';
import axios from '../../utils/axios';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// next
// import NextLink from 'next/link';
// form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

 const PaystackIcon = (props) => (
    <SvgIcon
      viewBox="0 0 612 602"
      fill="#0BA4DB"
      xmlns="http://www.w3.org/2000/svg"
      width="612"
      height="602"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
d="M548.416 0H31.792C14.306 0 0 14.333 0 31.852v57.333c0 17.519 14.306 31.852 31.792 31.852h515.034c17.486 0 31.792-14.333 31.792-31.852V31.852C580.208 14.333 565.901 0 548.416 0zM548.416 320.111H31.792C14.306 320.111 0 334.444 0 351.963v57.333c0 17.519 14.306 31.852 31.792 31.852h515.034c17.486 0 31.792-14.333 31.792-31.852v-57.333c1.59-17.519-12.717-31.852-30.202-31.852zM322.691 480.963H31.792C14.306 480.963 0 495.296 0 512.815v57.333C0 587.667 14.306 602 31.792 602h290.899c17.486 0 31.792-14.333 31.792-31.852v-57.333c0-17.519-14.306-31.852-31.792-31.852zM580.208 160.852H31.792C14.306 160.852 0 175.185 0 192.703v57.334c0 17.518 14.306 31.852 31.792 31.852h548.416c17.486 0 31.792-14.334 31.792-31.852v-57.334c0-17.518-14.306-31.851-31.792-31.851z"
        // fill="#45079A"
      />
    </SvgIcon>
  )



// ----------------------------------------------------------------------
PaymentMethods.propTypes = {
  setInvoice: PropTypes.func,
  invoice: PropTypes.object,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  amount: PropTypes.number,
  email: PropTypes.string,
  location: PropTypes.string,
  phone: PropTypes.string,
  meterNumber: PropTypes.number,
  meterType: PropTypes.string
};

export default function PaymentMethods(
  {
    // setInvoice, 
    invoice,
  amount, 
  email,   
  location,  
  phone, 
  meterNumber, 
  meterType, 
  handleNext, 
  handleBack}) {

  // const isMountedRef = useIsMountedRef();

  // const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const [error, setError] = useState(null)

  // Regular expression to check if string is email
const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

// String with email address
const str = "johndoe@example.com";

regexExp.test(str); // true

let confirmedEmail = regexExp.test(email) ? email : 'pay@powerstack.com'

  const config = {
    reference: (new Date()).getTime(),
    email: confirmedEmail,
    amount: Number(amount) * 100,
    publicKey: 'pk_test_f45807d93dea99c7825cc05782dd6caad37aa2d3',
    label: confirmedEmail,
    metadata: {
      custom_field:{
        consumer_id: '',
      email: confirmedEmail,
      amount: Number(amount) * 100,
      meter_number: Number(meterNumber),
      meter_type: meterType,
      location: location,
      Customer_contact: Number(phone),
      },
      
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
      const token = 12345
      // await getIdToken(currentUser, true);
      console.log(token);
      // console.log(user);
      // const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        'https://restcountries.com/v3.1/all'
        // `https://am3mmr7z3a.execute-api.us-east-2.amazonaws.com/Prod/
        // VerifyPayment?reference=${trxref}&meter_number=${meterNumber}&meter_type=${meterType}
        // &phone=${phone}&location=${location}&email=${confirmedEmail}`,

        // { headers }
      );
      // const { reference } = response.data;
      console.log(response);
      console.log(reference);
      console.log(response.data);
      // setInvoice(response.data.receipt[0])
      console.log(invoice)
      setLoading(false)
      handleNext()
      

      // window.location.replace(authorization_url);
      // await login(data.amount, data.meterNumber, data.phone );
    } catch (error) {
      console.log(error)
      setSpinLoader(false)
      setLoading(false)
      setError(error)
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
    setSpinLoader(false)
    console.log('closed')
    alert("Wait! You need this oil, don't go!!!!")
  }

  const PaystackHookExample = () => {
    
    const initializePayment = usePaystackPayment(config);
    
    return (

        <LoadingButton 
        endIcon={<PaystackIcon />}
        sx={{display: 'flex', alignItems: 'center', justifyContent:'center', textTransform: 'none', my:2}}
         size="large" onClick={() => { setSpinLoader(true)
          initializePayment(onSuccess, onClose)
        }} type="submit" variant="outlined" 
        loading={spinLoader}
         >Proceed with Paystack</LoadingButton>
        // /* <button onClick={() => {
          // initializePayment(onSuccess, onClose)
        // }}>Purchase</button> */}
    );
  };

  // const onSubmit = async () => {
  //   try { /* empty */ } catch (error) {
  //     console.error(error);
  //     // reset();
  //     if (isMountedRef.current) {
  //       setError('afterSubmit', { ...error, message: error.message });
  //     }
  //   }
  // };

  return (
    <Box sx={{p: 6, display:'flex', flexDirection:'column'}}>
      <Typography variant="subtitle1" sx={{ my: 2, fontSize:'20px', display: 'flex', alignItems: 'center', justifyContent:'center', color:'#217d50'}}>
          ₦ {new Intl.NumberFormat().format(amount)}.00 
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2,  display: 'flex', alignItems: 'center', justifyContent:'center'}}>
        Payment Method
      </Typography>
      {
      // invoice === null && 
      loading === true ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress  sx={{color: '#217d50'}}/>
      </Box> : 
      // <Container maxWidth={themeStretch ? false : 'lg'}>
      <>
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection:'column'}}>
  {error ?  <Alert sx={{display: 'flex', alignItems: 'center', justifyContent:'center', textTransform: 'none', my:2}} severity="error">{error}</Alert> : null }
  
<PaystackHookExample/>
</Box>
<Box sx={{ display: 'flex', m: 3 }}>
            <Button color="inherit" onClick={handleBack}  sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
        
          
          </Box>
          </>
// </Container> 
}
      
    </Box>
  );
}


{/* <RadioGroup value={method} onChange={handleChangeMethod}>
        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((option) => {
            const { value, title, icons } = option;

            const hasChildren = value === 'credit_card';

            const isSelected = method === value;

            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                  ...(hasChildren && { flexWrap: 'wrap' }),
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} />}
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{ py: 3, mx: 0 }}
                />
</Container> : invoice === null && loading === true ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress  sx={{color: '#217d50'}}/>
      </Box> : 
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ position: 'absolute', right: 20, top: 32 }}
                >
                  {icons.map((icon) => (
                    <Image key={icon} alt="logo card" src={icon} />
                  ))}
                  <PaystackHookExample />
                </Stack>

                {hasChildren && (
                  <Collapse in={method === 'credit_card'} sx={{ width: 1 }}>
                    <TextField select fullWidth label="Card" SelectProps={{ native: true }}>
                      {CARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <Button
                      size="small"
                      startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                      onClick={handleCollapseIn}
                      sx={{ my: 3 }}
                    >
                      Add new card
                    </Button>

                    <Collapse in={show}>
                      <PaymentNewCardForm onCancel={handleCollapseOut} />
                    </Collapse>
                  </Collapse>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup> */}