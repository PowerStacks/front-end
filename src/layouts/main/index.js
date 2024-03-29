import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
// 
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
const year = new Date().getFullYear();

export default function MainLayout({ children }) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © All rights reserved
              <Link href="/"> Powerstack {year}</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
