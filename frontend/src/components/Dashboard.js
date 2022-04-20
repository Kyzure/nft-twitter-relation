import * as React from "react";
import "../styles/Dashboard.scss";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import MultiChart from "./MultiChart.tsx";

function Dashboard(props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        width: `cal(100% - ${props.drawerWidth - 300}px)`,
        paddingTop: "68px",
        paddingLeft: `${props.drawerWidth + 10}px`,
      }}
    >
      <CssBaseline />
      <MultiChart
        name={"MULTICHART"}
        yData={props.data.yData}
        yLabel={props.data.yLabel}
        y1Data={props.data.y1Data}
        y1Label={props.data.y1Label}
        labels={props.data.xData}
      />
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

/*

  const mockFollowerCount = [5364,3456,3443,1234,1234,3214,4000,5322,2313,7654]
  const mockFloorPrice = [1.99, 2.00, 2.15, 1.01, 3.5, 4.8, 1.91, 5.53, 0.88, 1.02]
  const mockNFTNames = ["Ayy", "Bee", "Cee", "Dee", "Ee", "Eff", "Gee", "Aitch", "Aye", "Jay"]
        <MultiChart
            name={"MULTICHART"}
            yData={mockFollowerCount}
            yLabel={"Likes"}
            y1Data={mockFloorPrice}
            y1Label={"Floor Price"}
            labels={mockNFTNames}
          />
          <MultiChart
            name={"MULTICHART"}
            yData={mockFollowerCount}
            yLabel={yAxis}
            y1Data={mockFloorPrice}
            y1Label={y1Axis}
            labels={props.collection}
          />
*/
