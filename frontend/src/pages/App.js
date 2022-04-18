import * as React from 'react';
import '../styles/App.scss';
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
  const drawerWidth = 350
  const [marketplace, setMarketplace] = React.useState("OpenSea");
  const [collection, setCollection] = React.useState(["Ayy"]);
  const [data, setData] = React.useState([]);
  
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline enableColorScheme={true}>
        <CssBaseline />
        <SideDrawer
          drawerWidth={ drawerWidth } 
          marketplace={ marketplace }
          setMarketplace={ setMarketplace }
          collection = { collection }
          setCollection={ setCollection }
          data={ data }
          setData={ setData }
        />
        <Dashboard 
          drawerWidth={ drawerWidth }
          collection={ collection }
        />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default App;

const fakeData = 
[
  {
    'name': 'BoredApe',
    'floor_price': '100',
    'market_volume': '100',
    'sales': '10',
    'count': '99',
    'num_owners': '50',
    'twitter_followers': '50000'
  },
  {
    'name': 'InterestingApe',
    'floor_price': '80',
    'market_volume': '110',
    'sales': '30',
    'count': '56',
    'num_owners': '45',
    'twitter_followers': '48294'
  },
  {
    'name': 'SlightlyGoodApe',
    'floor_price': '123',
    'market_volume': '123',
    'sales': '23',
    'count': '123',
    'num_owners': '23',
    'twitter_followers': '12312'
  },
  {
    'name': 'AbitNiceApe',
    'floor_price': '111',
    'market_volume': '121',
    'sales': '11',
    'count': '88',
    'num_owners': '55',
    'twitter_followers': '55555'
  },
]