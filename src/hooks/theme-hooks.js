import { useLayoutEffect, useDebugValue } from 'react';
import { useStore, useAction } from 'easy-peasy';

export const useThemeSelection = () => {
  const { currentThemeSelection } = useStore(state => state.settings);
  const { updateSelectedTheme } = useAction(dispatch => ({
    updateSelectedTheme: dispatch.settings.updateSelectedTheme
  }));

  const handleThemeToggle = () =>
    currentThemeSelection === 'lite'
      ? updateSelectedTheme('dark')
      : updateSelectedTheme('lite');

  useLayoutEffect(() => {
    console.log('useThemeSelection mounted');
  }, [currentThemeSelection]);

  useDebugValue(currentThemeSelection);

  return {
    currentThemeSelection,
    handleThemeToggle
  };
};
