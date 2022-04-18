import * as React from 'react';
import axios from "axios";

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.text.primary,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.lighter,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.lighter,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.lighter,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.lighter,
    },
  },
}));

function SideDrawer(props) {  
  const DrawerStyled = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      background: theme.palette.primary.main, 
      boxSizing: 'border-box',
      width: props.drawerWidth
    }
  }));

  const [collectionOptions, setCollectionOptions] = React.useState([]);

  const [collection, setCollection] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [yAxis, setYAxis] = React.useState('follower_count');
  const [y1Axis, setY1Axis] = React.useState('floor_price');

  const selectCollection = (_event, newValue) => {
    setCollection([...newValue]);
  };

  function SelectDate () {
    if (collection.length === 1) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy"
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy"
          />
        </LocalizationProvider>
      );
    }
    if (collection.length > 1) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="dd/MM/yyyy"
          />
        </LocalizationProvider>
      );
    }
  }

  function SelectAxis () {
    if (collection.length > 0) {
      return (
        <>
          <FormControl>
            <InputLabel id="yAxisLabel">Select Y-Axis</InputLabel>
            <Select
                labelId="yAxisLabel"
                id="Y-Axis"
                value={yAxis}
                label="Y-Axis"
                onChange={(event) => {
                  setYAxis(event.target.value);
                }}
              >
                <MenuItem value={"average_price"}>average_price</MenuItem>
                <MenuItem value={"floor_price"}>floor_price</MenuItem>
                <MenuItem value={"follower_count"}>follower_count</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="y1AxisLabel">Select Y1-Axis</InputLabel>
            <Select
              labelId="y1AxisLabel"
              id="Y1-Axis"
              value={y1Axis}
              label="Y1-Axis"
              onChange={(event) => {
                setY1Axis(event.target.value);
              }}
            >
                <MenuItem value={"average_price"}>average_price</MenuItem>
                <MenuItem value={"floor_price"}>floor_price</MenuItem>
                <MenuItem value={"follower_count"}>follower_count</MenuItem>
            </Select>
          </FormControl>
        </>
      )
    }
  }

  function GetAllCollectionInfo(date) {
    const path = "all-collections-info"
    const query = {
      "date": date 
    }
    GetAxiosData(path, query)
  }

  // Try to make this 7 days or so for graph to look nice
  function GetTweetInfo(nft, startDate, endDate) {
    const path = "tweets/" + nft
    const query = {
      "startDate": startDate,
      "endDate": endDate
    }
    GetAxiosData(path, query)
  }

  // Function to get data from backend.
  // path is the additional string added onto the url to GET from the right URL
  // query is an object stating the necessary requirements for the API
  function GetAxiosData(path, query) {
    // http://139.99.72.60:4000/tweets
    // http://139.99.72.60:4000/all-collections-info
    axios({
      method: "GET",
      url: "http://139.99.72.60:4000/" + path,
      headers: { 'Content-Type': 'application/json' },
      params: query
    }).then((res) => {
      var filtered = res.data.filter(x => collection.includes(x.name) === true);
      console.log(filtered);
      var data = {
        xData: [],
        yData: [],
        yLabel: yAxis,
        y1Data:[],
        y1Label: y1Axis
      };
      filtered.forEach(f => {
        data.xData.push(f.name);
        data.yData.push(f[yAxis]);
        data.y1Data.push(f[y1Axis]);
      });
      props.setData(data);
    });
  }

  React.useEffect(() => {
    let isMounted = true;
    axios.get("http://139.99.72.60:4000/all-collections-names")
      .then((res) => { 
        let data = []
        for (let i = 0; i < res.data.length; i++) {
          data[i] = res.data[i].name
        }
        if (isMounted) setCollectionOptions(data) })
      return () => { isMounted = false };
  }, []);  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        bgcolor="primary.main"
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders">
        <DrawerStyled
          variant="permanent"
          open={ true }>
          <Box>
            <Toolbar>
              <Typography color="text.main" variant="h3" noWrap component="div">
                  NFT-Twitter Webapp
              </Typography>
              <IconButton
                size="large"
                color="secondary"
                href="https://github.com/Kyzure/nft-twitter-relation">
                <GitHubIcon size="large" />
              </IconButton>
            </Toolbar>

            <Divider sx={{ width:'85%', margin: 'auto' }} />

            <Stack alignItems="center" direction="column" spacing="25px" sx={{ padding: "50px 0 0 15px" }}>
              <Stack
                alignItems="left"
                direction="column"
                spacing="20px"
                sx={{ width: "100%" }}>
                <Typography color="text.main" variant="h6">
                  Select NFT collection
                </Typography>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  onChange={ selectCollection }
                  options={ collectionOptions }
                  getOptionLabel={(option) => option}
                  defaultValue={ [] }
                  renderInput={(params) => (
                    <TextFieldStyled
                      {...params}
                      variant="outlined"
                      label={"OpenSea Collections"}
                    />
                  )}
                  value={ collection }
                />
              </Stack>

              { SelectDate() }
              { SelectAxis() }

              <Button color="secondary" onClick={ () => GetAllCollectionInfo("Apr 15 2022 00:00:00 UTC") }>
                Example Button
              </Button>
              <Button color="secondary" onClick={ () => GetTweetInfo("axie", "Apr 11 2022 00:00:00 UTC", "Apr 17 2022 00:00:00 UTC") }>
                Example Button 2
              </Button>

            </Stack>
          </Box>
        </DrawerStyled>
      </Box>
    </Box>
  );
}

export default SideDrawer;