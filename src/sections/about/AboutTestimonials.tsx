/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
// import { m } from 'framer-motion';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// components
import Iconify from '../../components/Iconify';
import { MotionViewport, 
  // varFade
 } from '../../components/animate';
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Kennedy Ukatu',
    rating: 5,
    dateCreate: 'April 19, 2023',
    content: `Super conveneint! Thanks a lot!`,
  },
  {
    name: 'Mukhtar Bello',
    rating: 5,
    dateCreate: 'December 12, 2022',
    content: `It's a very good dashboard and my family and I really love the product . Easy to use with quick checkout. The team did a really good job.`,
  },
  {
    name: 'Joyce Nworokie',
    rating: 5,
    dateCreate: 'November 28, 2022',
    content: `Customer support is realy fast and helpful. They always have a solution on hand for any problem and are happy to help you.`,
  },
  {
    name: 'Adigun Shittu',
    rating: 5,
    dateCreate: 'May 5, 2022',
    content: `Amazing, really good code quality and gives you a lot of ways to monitor your usage..`,
  },
  {
    name: 'Muhammad Lawal',
    rating: 5,
    dateCreate: 'November 11, 2021',
    content: `Got a few questions after purchasing the product. I was skeptikal at first but once I signed up I didn't know how I managed before it. 5/5 stars!`,
  },
  {
    name: 'Folakemi Balogun',
    rating: 5,
    dateCreate: 'February 19, 2023',
    content: `I'm a small business owner. I recently moved to a new city and stumbled across the website online - what a lucky coincidence for me. They automate the pain of manually keeping up with my electricity usage and fear of being extorted at the distribution offices. Registered due to my busy schedule. I am super happy with the experience so far. The functionality is just as good as the design. Thanks!`,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.8)} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(https://minimal-assets-api.vercel.app/assets/images/about/testimonials.jpg)`,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    height: 840,
    overflow: 'hidden',
  },
}));

// ----------------------------------------------------------------------

export default function AboutTestimonials() {
  const start = 'xs';
  const end = 'xl';
  const isDesktop = useResponsive('up', 'md', start, end);

  return (
    <RootStyle>
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              {/* <m.div variants={varFade().inUp}> */}
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                 Reviews
                </Typography>
              {/* </m.div> */}

              {/* <m.div variants={varFade().inUp}> */}
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Join our <br />
                  community
                </Typography>
              {/* </m.div> */}

              {/* <m.div variants={varFade().inUp}> */}
                <Typography sx={{ color: 'common.white' }}>
                  Our goal is to create a product and service that you’re satisfied with and use it every day. This is
                  why we’re constantly working on our services to make it better every day and really listen to what our
                  users has to say.
                </Typography>
              {/* </m.div> */}

              {!isDesktop && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  {/* <m.div variants={varFade().inUp}> */}
                    <TestimonialLink />
                  {/* </m.div> */}
                </Box>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' },
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  // <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  // </m.div>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  // <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  // </m.div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {isDesktop && (
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            {/* <m.div variants={varFade().inLeft}> */}
              <TestimonialLink />
            {/* </m.div> */}
          </Box>
        )}
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

function TestimonialLink() {
  return (
    <Link href={PATH_AUTH.register} variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
      Find out the hype
      <Iconify icon={'ic:round-arrow-right-alt'} sx={{ ml: 1, width: 20, height: 20 }} />
    </Link>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    content: PropTypes.string,
    dateCreate: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
  }),
};

function TestimonialCard({ testimonial } : {testimonial: any}) {
  const theme = useTheme();

  const { name, rating, dateCreate, content } = testimonial;

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        ...cssStyles().bgBlur({
          color: theme.palette.common.white,
          opacity: 0.04,
        }),
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <Typography gutterBottom component="p" variant="caption" sx={{ color: 'grey.500' }}>
        {dateCreate}
      </Typography>
      <Rating value={rating} readOnly size="small" />
      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}
