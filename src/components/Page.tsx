import { forwardRef, ForwardedRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  meta?: ReactNode;
}

const Page = forwardRef(function Page(
  { children, title = '', meta, ...other }: PageProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <>
      <Head>
        <title>{`${title} | Powerstack`}</title>
        {meta}
      </Head>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
