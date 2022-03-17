import * as React from 'react';
import '../styles/Dashboard.scss';
import DisplayChart from './DisplayChart.js';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

function Dashboard(props) {
  return (
    <Box
      sx={{ flexGrow: 1, p: 3,
      width: `cal(100% - ${props.drawerWidth - 300 }px)`,
      paddingLeft: `${props.drawerWidth + 10}px`}}>
      <CssBaseline />
      <Stack alignItems="center" direction="row" spacing="40px" className="dashboard">
        <DisplayChart />
        <DisplayChart />
        <DisplayChart />
        <DisplayChart />
      </Stack>
    </Box>
  );
}

export default Dashboard;