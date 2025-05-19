import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './ReduxStore';
import App from './App.tsx';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // <- חדש

const theme = createTheme({
  palette: {
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#607d8b',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <App />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </Provider>
);

