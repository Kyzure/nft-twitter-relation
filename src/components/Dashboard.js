import * as React from 'react';
import '../styles/Dashboard.scss';
import DisplayChart from './DisplayChart.js';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function Dashboard(props) {
  // Use this is we want to show multiple charts
  /*
  const charts = props.dataList.map((data) => {
    return <DisplayChart key={ data.id } data={ data }/>
  }); 
  */
 const charts = () => {
   if (props.dataList.length > 0) {
     return <DisplayChart data={ props.dataList[props.dataList.length - 1] }/>
   }
 }

  return (
    <Box
      sx={{ flexGrow: 1, p: 3,
      width: `cal(100% - ${props.drawerWidth - 300 }px)`,
      paddingTop: '50px',
      paddingLeft: `${props.drawerWidth + 10}px`}}>
      <CssBaseline />
      { charts() }
    </Box>
  );
}

export default Dashboard;