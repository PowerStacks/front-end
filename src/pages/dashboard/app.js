// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import { useAuth } from '../../hooks/useAuth';
// import { useJWTAuth } from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  // AppWidget,
  AppWelcome,
  // AppFeatured,
  AppNewInvoice,
  // AppTopAuthors,
  // AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  // AppCurrentDownload,
  // AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// import { getIdToken } from 'firebase/auth';
import axios from '../../utils/axios';
import { useEffect, useState } from 'react';
// import axios from 'axios'
import { getAuth, getIdToken } from 'firebase/auth';

// const auth = getAuth();

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
// const { user } = useAuth();
// let globalUser;

export default function GeneralApp() {
  let { user } = useAuth();

  // const { JWTuser } = useJWTAuth();

  const theme = useTheme();
  const [data, setData] = useState(null);

  const { themeStretch } = useSettings();
  const auth = getAuth()
const { currentUser } = auth
// const token = await getIdToken(currentUser, true)

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get('http://my-api.com/data');
      // const data = await res.data;
      const response = await getIdToken(currentUser, true);
      console.log(response);
      const headers = { Authorization: `Bearer ${response}` };
      const res = await axios.get('/user/PurchaseHistory', { headers });
      const { data } = await res;
      console.log(data);
      setData(data);
    }

    fetchData();
  }, [currentUser]);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {user ? <AppWelcome display_name={user?.display_name} /> : <h4>Please sign in</h4>}
            {/* <AppWelcome display_name={JWTuser?.display_name} /> */}
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Electricity Usage (Units)"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Days Left"
              percent={0.2}
              total={12}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Excess usage"
              percent={-0.1}
              total={400}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid> */}

          <Grid item xs={12} lg={8}>
            <AppNewInvoice data={data}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

// export const getServerSideProps = async () => {
// // eslint-disable-next-line react-hooks/rules-of-hooks
// // const { user } = useAuth();
// const  response  = await getIdToken(globalUser)
// console.log(response)
//   const headers = { Authorization: `Bearer ${response.idToken}` };
//   const res = await axios.get('/user/PurchaseHistory', { headers });

//   const table = await res.data;
//   console.log(table)
//   return { props: { table } };
// };
