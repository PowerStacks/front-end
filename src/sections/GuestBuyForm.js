import * as Yup from 'yup';
// import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, 
    IconButton, InputAdornment, 
    Alert } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import { Box,  Button,  } from '@mui/material';
// hooks
// import {useAuth} from '../hooks/useAuth';
// import useIsMountedRef from '../hooks/useIsMountedRef';
// components
import Iconify from '../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect } from '../components/hook-form';

// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
// import axios from 'axios';

// ----------------------------------------------------------------------

GuestBuyForm.propTypes = {
    handleNext: PropTypes.func,
    setAmount: PropTypes.func,
setMeterNumber: PropTypes.func,
phoneNumber: PropTypes.number,
setPhoneNumber: PropTypes.func,
phone: PropTypes.number,
setPhone: PropTypes.func,
setMeterType: PropTypes.func,
setLocation: PropTypes.func,
setEmail: PropTypes.func,
  };

export default function GuestBuyForm(
    {handleNext, 
    setAmount, 
    setMeterNumber,
    phoneNumber,
    setPhoneNumber,
    phone,
    setPhone,
    setMeterType,
    setLocation,
    setEmail
}) {

//     const [meterType, setMeterType] = useState('');
//     const [location, setLocation] = useState('');

//   const handleChange = (event) => {
//     setMeterType(event.target.value);
//   };
//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const { register } = useAuth();

//   const isMountedRef = useIsMountedRef();

//   const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    meterNumber: Yup.number().transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .required('Meter Number is required'),
    meterType: Yup.string().required('Meter Type is required'),
    location: Yup.string().required('Location is required'),
    amount: Yup.number().transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .required('Amount is required'),
    phone: Yup.number().transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .required('Phone number is required'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    // meterNumber: '',
    phone: phone,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    // reset,
    // setError,
    handleSubmit,
    formState: { errors, 
        isSubmitting 
    },
  } = methods;

  const onSubmit = (data) => {

    console.log(
        data.meterNumber,
        data.meterType,
        data.amount,
        data.phone,
        data.location,
        data.email
    )
        setMeterNumber(data.meterNumber)
        setMeterType(data.meterType)
        setAmount(data.amount + 100)
        setPhone(data.phone)
        setPhoneNumber(data.phone)
        setLocation(data.location)
        setEmail(data.email)
        handleNext()

  }


  return (
    <FormProvider methods={methods} onSubmit={ 
        // handleNext
        // handleSubmit(handleNext)
        handleSubmit(onSubmit)
        }>
      <Stack spacing={6}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'10%'}>
          <RHFTextField
          sx={{ minWidth: '45%' }}
            // onChange={(e) => setFirstName(e.target.value)}
            name="meterNumber"
            // type="text"
            // value={firstName}
            label="Meter Number"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'mdi:home-electricity-outline'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />


<RHFSelect
          sx={{ minWidth: '45%' }}
          InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
            // onChange={(e) => setFirstName(e.target.value)}
            // name="meterNumber"
            // value={meterType}
          label="Meter Type"
          name='meterType'
        //   onChange={handleChange}
           
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'healthicons:electricity'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          >
         
          <MenuItem value={'Prepaid'}>Prepaid</MenuItem>
          <MenuItem value={'Postpaid'}>Postpaid</MenuItem>
        
          </RHFSelect>



{/* <Box sx={{ minWidth: '45%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Meter Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={meterType}
          label="Meter Type"
          name='meterType'
          onChange={handleChange}
    
        >
          <MenuItem value={'Prepaid'}>Prepaid</MenuItem>
          <MenuItem value={'Postpaid'}>Postpaid</MenuItem>

        </Select>
      </FormControl>
    </Box> */}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'10%'}>

        <RHFSelect
          sx={{ minWidth: '45%' }}
          InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
            // onChange={(e) => setFirstName(e.target.value)}
            // name="meterNumber"
          

        //   value={location}
          label="Location"
          name='location'
        //   onChange={handleLocationChange}
           
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'zondicons:location'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          >
                <MenuItem value="Abia">Abia</MenuItem>
    <MenuItem value="Adamawa">Adamawa</MenuItem>
    <MenuItem value="Akwa Ibom">Akwa Ibom</MenuItem>
    <MenuItem value="Anambra">Anambra</MenuItem>
    <MenuItem value="Bauchi">Bauchi</MenuItem>
    <MenuItem value="Bayelsa">Bayelsa</MenuItem>
    <MenuItem value="Benue">Benue</MenuItem>
    <MenuItem value="Borno">Borno</MenuItem>
    <MenuItem value="Cross River">Cross River</MenuItem>
    <MenuItem value="Delta">Delta</MenuItem>
    <MenuItem value="Ebonyi">Ebonyi</MenuItem>
    <MenuItem value="Edo">Edo</MenuItem>
    <MenuItem value="Ekiti">Ekiti</MenuItem>
    <MenuItem value="Enugu">Enugu</MenuItem>
    <MenuItem value="FCT">Federal Capital Territory</MenuItem>
    <MenuItem value="Gombe">Gombe</MenuItem>
    <MenuItem value="Imo">Imo</MenuItem>
    <MenuItem value="Jigawa">Jigawa</MenuItem>
    <MenuItem value="Kaduna">Kaduna</MenuItem>
    <MenuItem value="Kano">Kano</MenuItem>
    <MenuItem value="Katsina">Katsina</MenuItem>
    <MenuItem value="Kebbi">Kebbi</MenuItem>
    <MenuItem value="Kogi">Kogi</MenuItem>
    <MenuItem value="Kwara">Kwara</MenuItem>
    <MenuItem value="Lagos">Lagos</MenuItem>
    <MenuItem value="Nasarawa">Nasarawa</MenuItem>
    <MenuItem value="Niger">Niger</MenuItem>
    <MenuItem value="Ogun">Ogun</MenuItem>
    <MenuItem value="Ondo">Ondo</MenuItem>
    <MenuItem value="Osun">Osun</MenuItem>
    <MenuItem value="Oyo">Oyo</MenuItem>
    <MenuItem value="Plateau">Plateau</MenuItem>
    <MenuItem value="Rivers">Rivers</MenuItem>
    <MenuItem value="Sokoto">Sokoto</MenuItem>
    <MenuItem value="Taraba">Taraba</MenuItem>
    <MenuItem value="Yobe">Yobe</MenuItem>
    <MenuItem value="Zamfara">Zamfara</MenuItem>
         </RHFSelect>

    <RHFTextField
          sx={{ minWidth: '45%' }}
            // onChange={(e) => setFirstName(e.target.value)}
            name="amount"
            type="number"
            // value={firstName}
            label="Amount"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'tabler:currency-naira'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'10%'}>
          <RHFTextField
          sx={{ minWidth: '45%' }}
            // onChange={(e) => setPhoneNumber(e.target.value)}
            name="phone"
            type="number"
            value={phoneNumber}
            label="Phone Number"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'gridicons:phone'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />

<RHFTextField
          sx={{ minWidth: '45%' }}
            // onChange={(e) => setFirstName(e.target.value)}
            name="email"
            // type="text"
            // value={firstName}
            label="Email(optional)"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" >
                      <Iconify icon={
                        // 'eva:eye-fill'
                        'entypo:email'
                        } />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />


        </Stack>


        {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton> */}
      </Stack>
      <Box sx={{ display: 'flex', m: 3 }}>
            <Button color="inherit" disabled={true}  sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
        
            <Button variant="contained" type="submit" loading={isSubmitting}>
              Next
            </Button>
          </Box>
    </FormProvider>
  );
}
