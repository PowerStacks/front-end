// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomePowerStack,
  HomeDarkMode,
  // HomeLookingFor,
  // HomeColorPresets,
  // HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';
import { AboutWhat, AboutTestimonials } from '@/sections/about';
import { ReactElementLike, ReactNodeArray } from 'prop-types';
// import AboutWhat from '../sections/about/AboutWhat';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));
 
// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: string | number | boolean | ReactElementLike | ReactNodeArray) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Home">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomePowerStack />
        <AboutWhat/>
          <HomeHugePackElements />

          <HomeDarkMode />

          {/* <HomeColorPresets /> */}

          <HomeCleanInterfaces />

          <AboutTestimonials/>

          {/* <HomePricingPlans /> */}

          {/* <HomeLookingFor /> */}

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
