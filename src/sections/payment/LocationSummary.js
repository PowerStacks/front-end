// @mui
import { styled } from '@mui/material/styles';
import { 
    // Switch, Divider,
     Typography, Stack } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// components
// import Label from '../../components/Label';
// import Iconify from '../../components/Iconify';
import { Box,  Button,  } from '@mui/material';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';

// ----------------------------------------------------------------------

const RootStyle = styled('div')((
    // { theme }
    ) => ({
//   padding: theme.spacing(5),
//   backgroundColor: theme.palette.background.neutral,
//   borderRadius: Number(theme.shape.borderRadius) * 2,
  // maxHeight: '90%',
  // maxWidth: '90%'
}));

// ----------------------------------------------------------------------

LocationSummary.propTypes = {
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    amount: PropTypes.number,
    phone: PropTypes.number
  };

  const longText = `
The Service charge covers ₦50 CBN Stamp duty charge and a Switching cost 
(cost of moving money between cards/accounts) as well as for the ease of 
making online transactions possible. Thanks for understanding.
`;

export default function LocationSummary({handleNext, handleBack, phone, amount}) {

  return (
    <RootStyle>

<Stack spacing={6} sx={{ml: '20px'}}>
<Stack direction={{ xs: 'column', sm: 'row', display: 'flex', 
// justifyContent: 'space-around' 
}} spacing={'10%'}>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
            Meter Number
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
            6289360715
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
Name on meter
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
            Mohammed Balogun
        </Typography>
    </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
            Meter Type
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
            Prepaid
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
Phone Number
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
            {phone}
        </Typography>
    </Box>
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }} spacing={'10%'} >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
            Address
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
            12 Herbert MacCauly Way, Ikoyi, Lagos
        </Typography>
    </Box>
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%'}}>
        <Box sx={{display: "flex"}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px'}}>
Service Charge      
        </Typography>
        <Tooltip sx={{ml:2}} title={longText}>
<HelpOutlinedIcon/>
        </Tooltip>
        </Box>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "300"}}>
        ₦ 100.00
        </Typography>
       
    </Box>
    </Stack>

    <Stack direction={{ xs: 'column', sm: 'row', display: 'flex',  }}  >
    <Box sx={{display: 'flex', flexDirection: "column", minWidth: '45%', margin: 'auto'}}>
        <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "700", mb:'5px', justifyContent : 'center',
    alignItems : 'center'}}>
            Total
        </Typography>
        <Typography sx={{ display: "flex", fontSize: "28px", fontWeight: "900", justifyContent : 'center',
    alignItems : 'center', color:'#217d50'}}>
        ₦ {new Intl.NumberFormat().format(amount)}.00
        </Typography>
    </Box>

    </Stack>

</Stack>
       <Box sx={{ display: 'flex', m: 3 }}>
            <Button color="inherit" onClick={handleBack}  sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
        
            <Button variant="contained" type="submit" 
            onClick={handleNext}
            // loading={isSubmitting}
            >
              Make Payment Of ₦ {new Intl.NumberFormat().format(amount)}.00
            </Button>
          </Box>

    </RootStyle>
  );
}
