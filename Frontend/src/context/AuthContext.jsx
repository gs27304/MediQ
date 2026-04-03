import { createContext, useContext, useEffect, useReducer } from 'react';
import {jwtDecode} from 'jwt-decode';

/** * MEDIQ SYSTEM INITIALIZATION
 * Synchronizing local storage nodes with the neural state 
 */
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};

/** * PROTOCOL VALIDATION: JWT DECRYPTION
 * Checks if the secure neural link is still active 
 */
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decodedToken.exp < currentTime;
  } catch (e) {
    return true; // Consider the link broken if decryption fails
  }
};

/** * SESSION HANDSHAKE
 * Ensures the system starts with verified credentials 
 */
const validateToken = (state) => {
  if (state.token && isTokenExpired(state.token)) {
    return {
      user: null,
      role: null,
      token: null,
    };
  }
  return state;
};

export const authContext = createContext(initialState);

/** * NEURAL REDUCER: STATE TRANSITIONS
 * Manages the flow of identity data through the platform 
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        role: null,
        token: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };

    case 'LOGOUT':
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, validateToken);

  // DATA PERSISTENCE: Synchronizing state with local storage nodes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  }, [state]);

  /** * AUTOMATED SESSION TERMINATION
   * Triggers a 'LOGOUT' protocol when the neural token expires 
   */
  useEffect(() => {
    if (state.token && isTokenExpired(state.token)) {
      dispatch({ type: 'LOGOUT' });
    } else if (state.token) {
      const decodedToken = jwtDecode(state.token);
      const expirationTime = decodedToken.exp * 1000 - Date.now();
      
      const sessionTimer = setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
      }, expirationTime);

      return () => clearTimeout(sessionTimer); // Cleanup to prevent memory leaks
    }
  }, [state.token, dispatch]);

  return (
    <authContext.Provider 
      value={{ 
        user: state.user, 
        token: state.token, 
        role: state.role, 
        dispatch 
      }}
    >
      {children}
    </authContext.Provider>
  );
};