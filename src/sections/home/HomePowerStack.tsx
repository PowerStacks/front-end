import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import affordable from '../../../public/images/affordable.png';
import smartphone from '../../../public/images/smartphone.png';
import cycling from '../../../public/images/cycling.png';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: affordable,
    title: 'Affordability',
    description:
      'Lowest levies and service charges in the industry. Family and business friendly rates are guaranteed always.',
  },
  {
    icon: smartphone,
    title: 'Manage your electricity',
    description: 'Easily monitor your home or offices electricity usage and availability',
  },
  {
    icon: cycling,
    title: 'Convenience',
    description: 'Pay for electricity units anywhere, from the comfort of your home or on the go',
  },
];

const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }: any) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.zIndex,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
}) as typeof Card;

// ----------------------------------------------------------------------

export default function HomePowerStack() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  // console.log(CARDS[0].icon.src)

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 25 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              What we do
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">How Powerstack can help you today</Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}>
                <Image
                  src={card.icon.src}
                  alt={card.title}
                  sx={{
                    mb: 10,
                    mx: 'auto',
                    width: 40,
                    height: 40,
                    filter: (theme: { palette: { primary: { main: any; }; }; }) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme: { palette: { info: { main: any; }; }; }) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme: { palette: { error: { main: any; }; }; }) => shadowIcon(theme.palette.error.main),
                    }),
                  }} ratio={undefined}                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>{card.description}</Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
