import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import lightning from '../../../public/images/lightning.png'
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <Container component={MotionViewport}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Box sx= {{width: 460, pt: '35%'}}>
            <Image
              visibleByDefault
              alt="rocket"
              src={lightning.src}
              disabledEffect
              sx={{ width: 230, margin: 'auto' }}
              ratio={undefined}
            />
            </Box>
          </m.div>
        </Box>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
              what are you waiting for
            </Typography>
          </m.div>
          <Box component={m.div} variants={varFade().inDown} sx={{ color: 'common.black', mb: 5 }}>
            <Typography variant="h2">
              Get started with
              <br /> Powerstack today
            </Typography>
          </Box>
          {/* <m.div variants={varFade().inDown}>
            <Button
              size="large"
              variant="contained"
              target="_blank"
              rel="noopener"
              href="/"
              sx={{
                whiteSpace: 'nowrap',
                boxShadow: (theme) => theme.zIndex.fab,
                color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: 'common.white',
                '&:hover': { bgcolor: 'grey.300' },
              }}
            >Register
            </Button>
          </m.div> */}
          <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} sx={undefined} />}
              >
                Let's Go
              </Button>
            </m.div>
        </Box>
      </ContentStyle>
    </Container>
  );
}
