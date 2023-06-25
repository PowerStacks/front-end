import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import PowerLogo from '../../public/images/logo-color-full.svg';
import PowerLogoNoText from '../../public/images/logo-color.svg';

// ----------------------------------------------------------------------
// new logo theme = #217d50
const Logo = forwardRef(({ disabledLink = false, noText=false,
   width = 150 ,
   height ,
  sx }, ref) => {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} sx={{ display: 'grid',
    justifyContent: 'center', cursor: 'pointer', ...sx }}>
      <Image sx={{margin:'auto'}} priority src={PowerLogo}  width={width} height={height} alt="Home Logo" />
    </Box>
  );
const logoNoText = (
  <Box ref={ref} sx={{ display: 'grid', justifyContent: 'center', cursor: 'pointer', ...sx }}>
    <Image sx={{ margin: '0 auto' }} priority src={PowerLogoNoText} width={width} height={height} alt="Home Logo" />
  </Box>
);

if (noText) {
  return <NextLink href="/">{logoNoText}</NextLink>;
}

  if (disabledLink) {
    return <>{logo}</>;
  }

  if (disabledLink && noText) {
    return <>{logoNoText}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  noText: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Logo;
