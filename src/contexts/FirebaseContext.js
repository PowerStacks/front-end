import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  // getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
} from 'firebase/auth';
import axios from '../utils/axios';
import {
  getFirestore,
  // collection,
  doc,
  getDoc,
  // setDoc
} from 'firebase/firestore';
//
import { FIREBASE_API } from '../config';
// import { isValidToken, setSession } from '../utils/jwt';
// ----------------------------------------------------------------------

// const ADMIN_EMAILS = ['demo@minimals.cc'];

export const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  // isInitialized: true,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;
    console.log(user);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

// const reducer = (state, action) => {
//   if (action.type === 'INITIALISE') {
//     const { isAuthenticated, user } = action.payload;
//     return {
//       ...state,
//       isAuthenticated,
//       isInitialized: true,
//       user,
//     };
//   }

//   return state;
// };

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [, setProfile] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userRef = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),

    [dispatch]
  );

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = window.localStorage.getItem('accessToken');

  //       if (accessToken && isValidToken(accessToken)) {
  //         setSession(accessToken);

  //         const response = await axios.get('/api/account/my-account');
  //         const { user } = response.data;

  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: true,
  //             user,
  //           },
  //         });
  //       } else {
  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: false,
  //             user: null,
  //           },
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({
  //         type: 'INITIALIZE',
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       });
  //     }
  //   };

  //   initialize();
  // }, []);

  const login = async (email, password) => {
    try {
      signInWithEmailAndPassword(AUTH, email, password)
      const {data} = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API.apiKey}`,
        { email, password, returnSecureToken: true }
      );
      console.log(data);
      const headers = { Authorization: `Bearer ${data.idToken}` };
      const res = await axios.post('/user/Login', { email, password }, { headers });
      console.log(res.data.user);
      let user = res.data.user;
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });

      console.log(initialState);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (
    email,
    password,
    // returnSecureToken
    display_name,
    is_merchant,
    is_admin
    // firstName, lastName
  ) => {
    console.log(
      email,
      password,
      // returnSecureToken
      display_name,
      is_merchant,
      is_admin
    );
    const response = await axios.post(
      '/user/CreateUser',

      email,
      password,
      // returnSecureToken
      display_name,
      is_merchant,
      is_admin
      // firstName,
      // lastName,
    );
    const { user } = response.data;
    // console.log(register);
    console.log(response);
    console.log(user);

    // window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
    console.log(initialState);
    console.log(state);
  };

  // const register = (email, password, firstName, lastName) =>
  //   createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
  //     const userRef = doc(collection(DB, 'users'), res.user?.uid);

  //     await setDoc(userRef, {
  //       uid: res.user?.uid,
  //       email,
  //       display_name: `${firstName} ${lastName}`,
  //     });
  //   });

  const logout = async () => {
    signOut(AUTH);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        user: {
          // id: state?.user?.[0].uid || state?.user?.uid,
          email: state?.user?.[0].email || state?.user?.email,
          // role: ADMIN_EMAILS.includes(state?.user?.email) ? 'admin' : 'user',
          display_name: state?.user?.[0].display_name || state?.user?.displayName,
          // || profile?.display_name,
          is_active: state?.user?.[0].is_active || state?.user?.is_active,
          is_admin: state?.user?.[0].is_admin || state?.user?.is_admin,
          // ? (ADMIN_EMAILS.includes(state?.user?.email) ? true : false) : false,
          is_merchant: state?.user?.[0].is_merchant || state?.user?.is_merchant,
          is_owner: state?.user?.[0].is_owner || state?.user?.is_owner,
          // photoURL: state?.user?.photoURL || profile?.photoURL,
          // display_name: state?.user?.display_name || profile?.display_name,
          // phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
          // country: profile?.country || '',
          // address: profile?.address || '',
          // state: profile?.state || '',
          // city: profile?.city || '',
          // zipCode: profile?.zipCode || '',
          // about: profile?.about || '',
          // isPublic: profile?.isPublic || false,
        },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
