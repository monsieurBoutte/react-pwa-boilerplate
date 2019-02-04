import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import store from './configureStore';
import registerServiceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Routes } from './routes';
import { theme } from './styles/custom-theme-style';
import './index.css';

const customTheme = createMuiTheme(theme);

ReactDOM.render(
  <div className="App">
    <StoreProvider store={store}>
      <MuiThemeProvider theme={customTheme}>
        <Routes />
      </MuiThemeProvider>
    </StoreProvider>
  </div>,
  document.getElementById('root')
);

// Learn more about service workers in CRA: http://bit.ly/CRA-PWA
registerServiceWorker();
