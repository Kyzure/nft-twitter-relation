import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CardStyled = styled(Card)(({ theme }) => ({
  width: "85%",
  height: "75%",
  minHeight: "300px",
  minWidth: "300px",
  backgroundColor: theme.palette.primary.main,
  margin: "auto",
}));

function MultiChart(props) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: props.name,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: true,
          color: "#454545",
        },
      },
    },
  };

  const labels = props.labels;

  const data = {
    labels,
    datasets: [
      {
        label: props.yLabel,
        data: props.yData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: props.y1Label,
        data: props.y1Data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <CardStyled>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ margin: "auto" }}>
          <Line options={options} data={data} />
        </Typography>
      </CardContent>
    </CardStyled>
  );
}

export default MultiChart;
