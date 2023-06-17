import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
// import { SeoIllustration } from '../../../../assets';
// routes
import { PATH_DASHBOARD} from '../../../../routes/paths';
// next
import NextLink from 'next/link';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: '100%',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  display_name: PropTypes.string,
};

export default function AppWelcome({ display_name }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          pt: 5,
          p: { md: 5 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome,
          <br /> {!display_name ? '...' : display_name}
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {`I's nice having you back, how may we be of service today?`}
        </Typography>
        <NextLink href={PATH_DASHBOARD.recharge} passHref>
          <Button variant="contained">Recharge Meter</Button>
        </NextLink>
      </CardContent>

      {/* <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      /> */}
    </RootStyle>
  );
}
