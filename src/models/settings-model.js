import {
  checkLocalStorage,
  setInLocalStorage
} from '../util/localstorage-util';

// reyhdrate state from localstorage if it exist
const initialState = {
  currentThemeSelection: checkLocalStorage('currentThemeSelection', 'lite')
};

export const settingsModel = {
  settings: {
    ...initialState,
    updateSelectedTheme: (state, payload) => {
      // update the state
      state.currentThemeSelection = payload;

      // store the current theme selection in localstorage
      setInLocalStorage('currentThemeSelection', payload);
    }
  }
};
