/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST_API_KEY: 'https://minimal-assets-api.vercel.app',
    HOST_API_KEY: 'http://104.236.193.32:8000',

    // HOST_API_KEY: 'https://www.googleapis.com/',

    // FIREBASE AUTH
    FIREBASE_API_KEY: 'AIzaSyDEYrbJhYgiFju3p8vWhpLed72T727XPvY',
    FIREBASE_AUTH_DOMAIN: 'powerstack-47e85.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'powerstack-47e85',
    FIREBASE_STORAGE_BUCKET: 'powerstack-47e85.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '118004188258',
    FIREBASE_APPID: '1:118004188258:web:7b76c4817a009d645abd3b',
    FIREBASE_MEASUREMENT_ID: 'G-FKZNED6QGP',
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    //
    MAPBOX: '',
  },
});
