// import { m } from 'framer-motion';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, InputAdornment, IconButton, InputLabel } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { MotionContainer, 
  // varFade
 } from '../../components/animate';
import HeroImg from '../../../public/images/heroImg.webp';
// import Image from 'next/image';
import OutlinedInput from '@mui/material/OutlinedInput';
// import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
// import Fingerprint from '@mui/icons-material/Fingerprint';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import { useContext } from 'react';
import {NumberContext} from '../../contexts/PhoneNumberContext'

// ----------------------------------------------------------------------

// let stringImage = HeroImg as unknown as string;

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  // backgroundColor: theme.palette.grey[500],
  backgroundImage: `url(${HeroImg.src})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle: any = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));


// ----------------------------------------------------------------------

export default function HomeHero() {

   
  const {phoneNumber, setPhoneNumber} = useContext(NumberContext);
    
  // const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <MotionContainer animate={undefined}>
      <RootStyle>
        
        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
          <ContentStyle sx={{display: 'flex'}}>
            {/* <m.div variants={varFade().inRight}> */}
              <Typography variant="h1" sx={{ color: 'common.black' }}>
                Pay for your <br />
                <Typography variant="h1" sx={{ color: '#e8da1a' }}>
                  {' '}
                  electricity
                </Typography>{' '}
                today <br /> with
                <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                  &nbsp;Powerstack
                </Typography>
              </Typography>
            {/* </m.div> */}

            {/* <m.div variants={varFade().inRight}> */}
              <Typography variant="h4" sx={{ color: 'common.black' }}>
                The most convenient way to sort your light bills
              </Typography>
            {/* </m.div> */}

            

            {/* <m.div variants={varFade().inRight}> */}
              <NextLink href={PATH_AUTH.register} passHref>
                <Button
                  size="large"
                  variant="contained"
                  // startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} sx={undefined} />}
                >
                  Get Started
                </Button>
              </NextLink>
            {/* </m.div> */}

          
          </ContentStyle>

          <ContentStyle sx={{ display: 'flex',  textAlign: 'center', mt:6, alignContent: 'end',
    flexWrap: 'wrap' }}>
 {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>   */}
        <Box sx={{backdropFilter: 'blur(8px)', width: '70%', height: '50%',  'borderRadius': '25px',
  border: '1px solid #217d50', display: 'flex',
  alignSelf: 'center', mt: '15%', p: '5%',  justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h4" gutterBottom>
         Buy with your number
        </Typography>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Phone Number</InputLabel>
          
          <OutlinedInput sx={{mb: '15%'}}
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
          autoFocus
          color="success"
            id="outlined-adornment-password"
            // type={showPassword ? 'text' : 'password'}
            startAdornment={<InputAdornment position="start">  <IconButton
            // aria-label="toggle password visibility"
            edge="end"
          >
             <PhonelinkLockIcon />
          </IconButton></InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="proceed"
                  edge="end"
                >
                   <ArrowForwardIcon />
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
            label="Phone Number"
          />
        </FormControl>
        <NextLink href='/recharge' passHref>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} sx={undefined} />}
                >
                  BUY NOW
                </Button>
              </NextLink>
        </Box>
        
      </ContentStyle> 
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}

 