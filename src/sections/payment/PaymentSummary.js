// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Stack } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// components
// import Label from '../../components/Label';
import NextLink from 'next/link';
import Iconify from '../../components/Iconify';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';


// ----------------------------------------------------------------------

const RootStyle = styled('div')((
  { theme }
  ) => ({
  padding: theme.spacing(5),
  // backgroundColor: theme.palette.background.neutral,
  // borderRadius: Number(theme.shape.borderRadius) * 2,
  // maxHeight: '90%',
  // maxWidth: '90%'
}));

// ----------------------------------------------------------------------
PaymentSummary.propTypes = {
  invoice: PropTypes.object
};

const longText = `
The Service charge covers ₦50 CBN Stamp duty charge and a Switching cost 
(cost of moving money between cards/accounts) as well as for the ease of 
making online transactions possible. Thanks for understanding.
`;

export default function PaymentSummary(
  // {invoice}
  ) {

    const printReceipt = () =>  {
      window.print();
    }
  return (
    <RootStyle>


<Stack direction={{ xs: 'column', sm: 'row', display: 'flex'  }}  >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%', margin: 'auto'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px', justifyContent : 'center',
    alignItems : 'center'}}>
            Token
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "24px", fontWeight: "900", justifyContent : 'center',
    alignItems : 'center'}}>
        4225 4240 3600 2052 0585
        </Typography>
    </Box>

    </Stack>
<Stack spacing={6} sx={{ml: '20px', mt:'20px'}}>
<Stack direction={{ xs: 'column', sm: 'row', display: 'flex', 
// justifyContent: 'space-around' 
}} spacing={'10%'}>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Disco
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
            AEDC
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Units
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
            680.62
        </Typography>
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Meter Type
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
            Prepaid
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Purchase Date
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
            July 3rd, 2023 - 7:15 PM
        </Typography>
    </Box>
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Transaction ID
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
            63392
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
Transaction Reference  
        </Typography>
        {/* <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip> */}
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        64a3103db26e9
        </Typography>
       
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Cost Of Electricity
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        ₦ 46,157.50
        {/* ₦ {new Intl.NumberFormat().format(amount)}.00  */}
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
VAT 
        </Typography>
        {/* <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip> */}
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        ₦ 3,742.50
        {/* ₦ {new Intl.NumberFormat().format(amount)}.00  */}
        </Typography>
       
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Discount
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        ₦ 0.00
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
        Service Charge
        </Typography>
        <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip>
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        ₦ 100.00
        </Typography>
       
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Amount Paid
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        ₦ 50,000.00
        {/* ₦ {new Intl.NumberFormat().format(amount)}.00  */}
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
        Payment Method
        </Typography>
        {/* <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip> */}
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        Paystack
        </Typography>
       
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
            Name On Meter
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        Mohammed Balogun
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px'}}>
        Phone
        </Typography>
        {/* <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip> */}
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700"}}>
        09065148875
        </Typography>
       
    </Box>
    </Stack>
    
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }}  >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%', margin: 'auto'}}>
        <Typography sx={{ display: "flex", fontSize: "12px", fontWeight: "300", mb:'5px', justifyContent : 'center',
    alignItems : 'center'}}>
            Address on Meter
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", justifyContent : 'center',
    alignItems : 'center'}}>
        75 Herbert McCauly Way
        </Typography>
    </Box>

    </Stack>
    
    <Stack alignItems="center" spacing={1}>
<Stack direction="row" alignItems="center" spacing={1.5}>
  <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
  <Typography variant="subtitle2">Secure credit card payment</Typography>
</Stack>
<Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
  This is a secure 128-bit SSL encrypted payment
</Typography>
</Stack>

    

</Stack>
       <Box sx={{ display: 'flex', m: 3 }}>
       <NextLink href='/' passHref>
            <Button color="inherit" onClick={''}  sx={{ mr: 1 }}>
              Back Home
            </Button>
            </NextLink>
            <Box sx={{ flexGrow: 1 }} />
        
            <Button variant="contained" type="submit" 
            onClick={printReceipt}
            // loading={isSubmitting}
            >
              Print Receipt
            </Button>
          </Box>

    </RootStyle>
  );
}

{/* <Stack alignItems="center" spacing={1}>
<Stack direction="row" alignItems="center" spacing={1.5}>
  <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
  <Typography variant="subtitle2">Secure credit card payment</Typography>
</Stack>
<Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
  This is a secure 128-bit SSL encrypted payment
</Typography>
</Stack> */}
