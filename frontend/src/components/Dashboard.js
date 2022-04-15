import * as React from 'react';
import '../styles/Dashboard.scss';
import MultiChart from './MultiChart.tsx';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';

function Dashboard(props) {
  const [yAxis, setYAxis] = React.useState('');
  const [y1Axis, setY1Axis] = React.useState('');
  const [xAxis, setXAxis] = React.useState('');

  const selectGraphOptions = (
    <Stack
      alignItems="center" 
      direction="row"
      spacing="100px"
    >
      <Select
          id="Y-Axis"
          value={yAxis}
          label="Y-Axis"
          onChange={(event) => {
            setYAxis(event.target.value);
          }}
        >
          <MenuItem value={"floor_price"}>Floor Price</MenuItem>
          <MenuItem value={"follower_count"}>Follower Count</MenuItem>
          <MenuItem value={"like_count"}>Like Count</MenuItem>
          <MenuItem value={"market_value"}>Market Value</MenuItem>
      </Select>
      <Select
        id="Y1-Axis"
        value={y1Axis}
        label="Y1-Axis"
        onChange={(event) => {
          setY1Axis(event.target.value);
        }}
      >
          <MenuItem value={"floor_price"}>Floor Price</MenuItem>
          <MenuItem value={"follower_count"}>Follower Count</MenuItem>
          <MenuItem value={"like_count"}>Like Count</MenuItem>
          <MenuItem value={"market_value"}>Market Value</MenuItem>
      </Select>
    </Stack>
  )

  function Display() {
    if (props.collection.length === 0) {
      return (
        <h1>
          Please select at least one NFT.
        </h1>
      );
    } else if (props.collection.length === 1) {

      const mockFollowerCount = [5364,3456,3443,1234,1234,3214,4000,5322,2313,7654]
      const mockFloorPrice = [1.99, 2.00, 2.15, 1.01, 3.5, 4.8, 1.91, 5.53, 0.88, 1.02]
      const mockNFTNames = ["Ayy", "Bee", "Cee", "Dee", "Ee", "Eff", "Gee", "Aitch", "Aye", "Jay"]
      return (
        <>
          <h1>
            ONE NFT SELECTED
          </h1>
          { selectGraphOptions }
          <MultiChart
            name={"MULTICHART"}
            yData={mockFollowerCount}
            yLabel={"Likes"}
            y1Data={mockFloorPrice}
            y1Label={"Floor Price"}
            labels={mockNFTNames}
          />
        </>
      );
    } else {
      const mockFollowerCount = [5364,3456,3443,1234,1234,3214,4000,5322,2313,7654]
      const mockFloorPrice = [1.99, 2.00, 2.15, 1.01, 3.5, 4.8, 1.91, 5.53, 0.88, 1.02]
      const mockNFTNames = ["Ayy", "Bee", "Cee", "Dee", "Ee", "Eff", "Gee", "Aitch", "Aye", "Jay"]
      return (
        <>
          <h1>
            TWO NFTs SELECTED
          </h1>
          { selectGraphOptions }
          <MultiChart
            name={"MULTICHART"}
            yData={mockFollowerCount}
            yLabel={"Likes"}
            y1Data={mockFloorPrice}
            y1Label={"Floor Price"}
            labels={mockNFTNames}
          />
        </>

      );
    }
  }

  return (
    <Box
      sx={{ flexGrow: 1, p: 3,
      width: `cal(100% - ${props.drawerWidth - 300 }px)`,
      paddingTop: '50px',
      paddingLeft: `${props.drawerWidth + 10}px`}}>
        { Display() }
        <CssBaseline />
    </Box>
  );
}

export default Dashboard;

// import DisplayChart from './DisplayChart.js';
// Use this is we want to show multiple charts
/*
const charts = props.dataList.map((data) => {
  return <DisplayChart key={ data.id } data={ data }/>
}); 
*/
/*
const charts = () => {
  if (props.dataList.length > 0) {
    return <DisplayChart data={ props.dataList[props.dataList.length - 1] }/>
  }
}
*/
// insert this for the timmy chart
// { charts() }