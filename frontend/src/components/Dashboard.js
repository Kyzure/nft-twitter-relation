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
        name={props.data.name}
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
