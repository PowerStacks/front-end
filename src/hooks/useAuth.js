import { useContext } from 'react';
//
// import { AuthJWTContext } from '../contexts/JWTContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/FirebaseContext';
import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

export const useAuth = () => { 
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

// export const useJWTAuth = () => {
//   const context = useContext(AuthJWTContext);

//   if (!context) throw new Error('Auth context must be use inside AuthProvider');

//   return context;
// };

// export default useAuth;
