import * as React from 'react';
import '../styles/App.scss';
import Header from '../components/Header.js';
import SideDrawer from '../components/SideDrawer.js';
import Dashboard from '../components/Dashboard.js';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#454545",
        }
      }      
    }
  },
  typography: {
    h2: {
      fontSize: "30px"
    },
    h3: {
      fontSize: "22px"
    },
    h4: {
      fontSize: "18px"
    }
  },
  palette: {
    primary: {
      lighter: '#E0E0E0',
      light: '#454545',
      main: '#202020',
      dark: '#151515',
      darker: '#111111'
    },
    secondary: {
      main: '#BB86FC'
    },
    background: {
      default: "#111111"
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#E7E7E7',
      tertiary: '#959595'
    }
  }
});

function App() {
  const [drawerWidth, setDrawerSize] = React.useState(350);
  const [marketplace, setMarketplace] = React.useState("OpenSea");
  
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline enableColorScheme={true}>
        <CssBaseline />
        <SideDrawer drawerWidth={ drawerWidth } marketplace={ marketplace } setMarketplace={ setMarketplace } />
        <Dashboard drawerWidth={ drawerWidth } />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;
