import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CardStyled = styled(Card)(({ theme }) => ({
  width: '75%',
  height: '75%',
  minHeight: '300px',
  minWidth: '300px',
  backgroundColor: theme.palette.primary.main,
  margin: 'auto'
}));

function DisplayChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: props.data.name,
      },
    },
  };

  let data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }] 
  }

  let description = JSON.stringify(props.data, null, 2);

  return (
    <CardStyled>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ margin: 'auto' }}>
          <Bar data={ data } options={options} />
        </Typography>
        <Typography color="text.tertiary" variant="body2">
          <br />
          <div><pre>{ description }</pre></div>
        </Typography>
      </CardContent>
    </CardStyled>
  );
}

export default DisplayChart;