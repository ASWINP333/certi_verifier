import { createContext, useContext, useState } from 'react';
import {
  clearLocalStorage,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '../functions/localStorage';
import { Navigate, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

// create context
const authContext = createContext();

const AuthProvider = ({ children }) => {
  // token
  let [token, setToken] = useState(null);

  // when admin login set token and login details to localstorage
  let loginIn = (newToken, user, callback) => {
    return AuthChecker.loginIn(() => {
      if (user) {
        setItemToLocalStorage('certi-student-token', newToken);
        setItemToLocalStorage('student-user', user);
      }
      setToken(newToken);
      callback();
    });
  };

  // when user logout clear token from localstorage
  let logOut = (callback) => {
    return AuthChecker.logOut(() => {
      let user = getItemFromLocalStorage('student-user');
      if (user) {
        localStorage.removeItem('certi-student-token');
        clearLocalStorage();
      }
      setToken(null);
      callback();
    });
  };

  const AuthChecker = {
    isAuthenticated: false,
    loginIn(callback) {
      AuthChecker.isAuthenticated = true;
      setTimeout(callback, 100);
    },
    logOut(callback) {
      AuthChecker.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };

  let value = { token, loginIn, logOut };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;

export const useAuthentication = () => {
  return useContext(authContext);
};

export const RequireAuth = ({ children }) => {
  let auth = useAuthentication();
  let location = useLocation();
  let user = getItemFromLocalStorage('student-user');
  let token = getItemFromLocalStorage('certi-student-token');
  auth.user = user;
  auth.token = token;

  if (!auth.token && !auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
