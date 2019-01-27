import { effect } from 'easy-peasy';
import { login } from '../services/auth-service';
import history from '../util/history-util';
import get from 'lodash/get';
import { checkLocalStorage } from '../util/localstorage-util';

// rehydrate the auth state from localStorage if it exist
export const initialState = checkLocalStorage('auth', {
  token: null,
  isAuthenticated: false
});

export const authModel = {
  auth: {
    ...initialState,
    isAuthLoading: false,
    authError: '',
    authenticateUser: effect(async (dispatch, payload, getState) => {
      try {
        dispatch.auth.updateIsAuthLoading({ loading: true });
        const authResponse = await login(payload);
        dispatch.auth.updateAuth(authResponse);
        dispatch.auth.updateIsAuthLoading({ loading: false });
        history.push('/');
      } catch (error) {
        dispatch.auth.updateIsAuthLoading({ loading: false });
        if (error.response.status === 401) {
          dispatch.auth.updateAuthError({ message: 'invalid credentials' });
        }
        console.group('authenticateUser error');
        console.warn(
          `error caught when authenticating user -> ${JSON.stringify(
            error,
            null,
            2
          )}`
        );
        console.groupEnd();
      }
    }),
    updateAuth: (state, payload) => {
      const isAuthenticated = get(payload, 'isAuthenticated', false);
      const merchant = get(payload, 'merchant', '');
      const token = get(payload, 'token', '');
      const user = get(payload, 'user', '');

      // store the auth state offline
      localStorage.setItem(
        'auth',
        JSON.stringify({
          isAuthenticated,
          merchant,
          token,
          user
        })
      );

      state.isAuthenticated = isAuthenticated;
      state.merchant = merchant;
      state.token = token;
      state.user = user;
    },
    updateIsAuthLoading: (state, payload) => {
      const loading = get(payload, 'loading', false);
      state.isAuthLoading = loading;
    },
    updateAuthError: (state, payload) => {
      const errorMessage = get(payload, 'message', 'failure to authenticate');
      state.authError = errorMessage;
    },
    clearAuth: state => {
      localStorage.removeItem('auth');
      state = initialState;
      history.push('/login');
    }
  }
};
