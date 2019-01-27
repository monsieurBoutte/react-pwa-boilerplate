import { useStore } from 'easy-peasy';
import { initialState } from '../models/auth-model';

export const useAuth = () => {
  const auth = useStore(state => state.auth);
  const cachedAuth = JSON.parse(localStorage.getItem('auth')) || {
    auth: initialState
  };
  return {
    auth,
    cachedAuth
  };
};
