import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function DisplayChart() {
  const CardStyled = styled(Card)(({ theme }) => ({
    width: '10%',
    minWidth: '350px',
    backgroundColor: theme.palette.primary.main
  }));

  return (
    <CardStyled>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Chart
        </Typography>
        <Typography variant="h5" component="div" sx={{ margin: 'auto' }}>
          Actual Chart
        </Typography>
        <Typography color="text.tertiary" variant="body2">
          <br />
          Chart Description
          <br />
          Chart Description 2
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">Some Button here</Button>
      </CardActions>
    </CardStyled>
  );
}

export default DisplayChart;