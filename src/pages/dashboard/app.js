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
import { firebaseApp } from '../../config';

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
  // console.log(`user is ${JSON.stringify(user)}`)

  // const { JWTuser } = useJWTAuth();

  const theme = useTheme();
  const [data, setData] = useState(null);

  const { themeStretch } = useSettings();
  const auth = getAuth(firebaseApp)
  const  {currentUser}  = auth
  console.log(`current user  is ${JSON.stringify(currentUser)}`)
  // getIdToken(currentUser).then((token) => {
  //   console.log(`token is ${token}`)
  // })
// const token = await getIdToken(currentUser, true)

  useEffect(() => {
    // let { user } = useAuth();
    const  {currentUser}  = auth
    console.log(`current user  is ${JSON.stringify(currentUser)}`)
    console.log(`useEffect user is ${JSON.stringify(user)}`);
    async function fetchData() {
      // const res = await axios.get('http://my-api.com/data');
      // const data = await res.data;
      // console.log(`fetchData current user  is ${JSON.stringify(currentUser)}`)
      // const  apiKey  = auth
      // console.log(`after call fetchData API key  is ${JSON.stringify(apiKey)}`)
      const token = await getIdToken(currentUser, true);
      //firebase.auth().currentUser.getIdToken();
      console.log(token);
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get('/user/PurchaseHistory', { headers });
      const { data } = await res;
      console.log(data[0]);
      setData(data[0]);
    }

    fetchData();
  }, [currentUser, user, auth]);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {user ? <AppWelcome display_name={user?.display_name} /> : <AppWelcome display_name={currentUser?.display_name} />}
            {/* <AppWelcome display_name={JWTuser?.display_name} /> */}
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Electricity Bought (Units)"
              percent={0}
              total={data?.purchases?.length > 0 ? data.purchases.reduce((accumulator, object) => {
                return accumulator + object.amount;
              }, 0) : 0}
              chartColor={theme.palette.primary.main}
              chartData={data?.purchases?.map(item => item.amount)}
                // [5, 18, 12, 51, 68, 11, 39, 37, 27, 20]
              
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Previous Units Bought"
              percent={0}
              total={data?.purchases?.length > 0 ? data.purchases[data.purchases.length - 1].amount : 0 }
              chartColor={theme.palette.chart.blue[0]}
              chartData={data?.purchases?.length > 0 ? data?.purchases?.map(item => item.amount) : 0}
                // [5, 18, 12, 51, 68, 11, 39, 37, 27, 20]
              
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Unpaid"
              percent={0}
              total={0}
              chartColor={theme.palette.chart.red[0]}
              chartData={[0,0,0,0,0,0,0,0,0,0,0,0]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid> */}

          <Grid item xs={12} lg={8}>
            <AppNewInvoice data={data} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled data={data} />
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
