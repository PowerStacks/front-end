import PropTypes from 'prop-types';
// import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, LinearProgress } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fPercent } from '../../utils/formatNumber';
// _mock_
import { _skills } from '../../_mock';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionViewport } from '../../components/animate';
import sitting from '../../../public/images/sitting.webp'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  const theme = useTheme();
  const start = 'xs';
  const end = 'xl';

  const isDesktop = useResponsive('up', 'md', start, end);

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

  // console.log(_skills)

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                {/* <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="our office 1"
                      src="https://minimal-assets-api.vercel.app/assets/images/about/what-1.jpg"
                      ratio="3/4"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                      }}
                    />
                  </m.div>
                </Grid> */}
                <Grid item xs={6}>
                  {/* <m.div variants={varFade().inUp}> */}
                    <Image
                      alt="our office 2"
                      src={sitting.src}
                      ratio="1/1"
                      sx={{ borderRadius: 2 }}
                    />
                  {/* </m.div> */}
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={5}>
            {/* <m.div variants={varFade().inRight}> */}
              <Typography variant="h2" sx={{ mb: 3 }}>
                Why us?
              </Typography>
            {/* </m.div> */}

            {/* <m.div variants={varFade().inRight}> */}
              <Typography
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                }}
              >
                With us, you'll find a trusted electricity provider that offers affordability, sustainability,
                reliability, convenience, and excellent customer support. Choose us today and experience the difference.
                Tired of the stress and inconvenience of buying units outdoors? You have come to the right place.
              </Typography>
            {/* </m.div> */}

            <Box sx={{ my: 5 }}>
              {_skills.map((progress) => (
                // <m.div key={progress.label} variants={varFade().inRight}>
                  // eslint-disable-next-line react/jsx-key
                  <ProgressItem progress={progress} />
                // </m.div>
              ))}
            </Box>

            {/* <m.div variants={varFade().inRight}> */}
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} sx={undefined} />}
              >
                Get Started
              </Button>
            {/* </m.div> */}
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress } : {progress: any}) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' },
        }}
      />
    </Box>
  );
}
