// @mui
import { styled } from '@mui/material/styles';
import { 
  // Box, 
  // Button, 
  // Link, Typography,
  Paper, Container, 
  // Stack
 } from '@mui/material';
// routes
// import { PATH_PAGE } from '../routes/paths';
// layouts
// import Layout from '../layouts';
// components
import Page from '../components/Page';
// import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// import NextLink from 'next/link';
// sections
import { Block } from '../sections/overview/Block';
// import CustomizedStepper from '../sections/overview/mui/stepper/CustomizedStepper';
// import VerticalLinearStepper from '../sections/overview/mui/stepper/VerticalLinearStepper';
import LinearAlternativeLabel from '../sections/overview/mui/stepper/LinearAlternativeLabel';
// import { ReactHookForm } from '../sections/overview/extra/form';
// import HorizontalLinearStepper from '../sections/overview/mui/stepper/HorizontalLinearStepper';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

// MUIStepper.getLayout = function getLayout(page) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function MUIStepper() {
  return (
    <Page title="Buy Power with Powerstack">
      <RootStyle>
        {/* <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 4,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Powerstack Checkout"
              links={[{ name: 'Home', href: 
            '/' }, { name: 'Stepper' }]}
              // moreLink="https://mui.com/components/steppers"
            />
          </Container>
        </Box> */}
   {/* <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                <NextLink href='/' passHref>
                  <Link variant="subtitle2">Back Home</Link>
                </NextLink>
              </Typography> */}
        <Container>
          {/* <Stack spacing={1}> */}
            

            <Block title="Buy Power Now">
              <Paper
                sx={{
                  p: 1,
                  width: '100%',
                  // maxHeight: '90vh',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                {/* <Button variant="contained" target="_blank" rel="noopener">
              LOGIN
            </Button> */}
                <LinearAlternativeLabel />
              </Paper>
            </Block>

            
          {/* </Stack> */}
        </Container>
      </RootStyle>
    </Page>
  );
}
