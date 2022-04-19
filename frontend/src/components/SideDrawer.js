import * as React from "react";
import axios from "axios";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const dateTheme = createTheme({
  palette: {
    primary: {
      main: "#BB86FC",
    },
    text: {
      primary: "#959595",
      secondary: "#ffffff",
      tertiary: "#959595",
    },
  },
});

const secondTheme = createTheme({
  palette: {
    primary: {
      main: "#BB86FC",
    },
    text: {
      primary: "#959595",
      secondary: "#ffffff",
      tertiary: "#959595",
    },
  },
});

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.lighter,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.lighter,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.lighter,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.lighter,
    },
  },
}));

function SideDrawer(props) {
  const DrawerStyled = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
      background: theme.palette.primary.main,
      boxSizing: "border-box",
      width: props.drawerWidth,
    },
  }));

  const [collectionOptions, setCollectionOptions] = React.useState([]);

  const [collection, setCollection] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [yAxis, setYAxis] = React.useState("");
  const [y1Axis, setY1Axis] = React.useState("");

  const selectCollection = (_event, newValue) => {
    if (newValue.length === 0) {
      setYAxis("");
      setY1Axis("");
    } else if (newValue.length === 1) {
      setYAxis("like_count");
      setY1Axis("one_day_average_price");
    } else {
      setYAxis("average_price");
      setY1Axis("floor_price");
    }
    setCollection([...newValue]);
  };

  function SelectDate() {
    if (collection.length === 1) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={dateTheme}>
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
          </ThemeProvider>
        </LocalizationProvider>
      );
    }
    if (collection.length > 1) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={dateTheme}>
            <DatePicker
              label="Select Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="dd/MM/yyyy"
            />
          </ThemeProvider>
        </LocalizationProvider>
      );
    }
  }

  function SelectAxis() {
    if (collection.length === 1) {
      return (
        <ThemeProvider theme={secondTheme}>
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
              <MenuItem value={"retweet_count"}>retweet_count</MenuItem>
              <MenuItem value={"reply_count"}>reply_count</MenuItem>
              <MenuItem value={"like_count"}>like_count</MenuItem>
              <MenuItem value={"one_day_sales"}>one_day_sales</MenuItem>
              <MenuItem value={"one_day_average_price"}>
                one_day_average_price
              </MenuItem>
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
              <MenuItem value={"retweet_count"}>retweet_count</MenuItem>
              <MenuItem value={"reply_count"}>reply_count</MenuItem>
              <MenuItem value={"like_count"}>like_count</MenuItem>
              <MenuItem value={"one_day_sales"}>one_day_sales</MenuItem>
              <MenuItem value={"one_day_average_price"}>
                one_day_average_price
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      );
    } else if (collection.length > 1) {
      return (
        <ThemeProvider theme={secondTheme}>
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
        </ThemeProvider>
      );
    }
  }

  function ShowGraph() {
    if (collection.length === 1) {
      return (
        <Button
          color="secondary"
          onClick={() => GetTweetInfo(collection[0], startDate, endDate)}
        >
          Show Tweets
        </Button>
      );
    } else if (collection.length > 1) {
      return (
        <Button
          color="secondary"
          onClick={() => GetAllCollectionInfo(startDate)}
        >
          Show Collection Info
        </Button>
      );
    }
  }

  function GetAllCollectionInfo(date) {
    const path = "all-collections-info";
    const query = {
      date: date,
    };
    GetAxiosData(path, query);
  }

  // Try to make this 7 days or so for graph to look nice
  function GetTweetInfo(nft, startDate, endDate) {
    const path = "tweets/" + nft;
    const query = {
      startDate: startDate,
      endDate: endDate,
    };
    GetAxiosData(path, query);
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
      headers: { "Content-Type": "application/json" },
      params: query,
    }).then((res) => {
      var data = {
        xData: [],
        yData: [],
        yLabel: yAxis,
        y1Data: [],
        y1Label: y1Axis,
      };
      console.log(res.data);
      if (collection.length === 1) {
        for (var key in res.data) {
          if (res.data[key].length > 0) {
            console.log(res.data[key][0]["one_day_sales"]);
            data.xData.push(key);
            data.yData.push(res.data[key][0][yAxis]);
            data.y1Data.push(res.data[key][0][y1Axis]);
          }
        }
        props.setData(data);
      } else if (collection.length > 1) {
        var filtered = res.data.filter(
          (x) => collection.includes(x.name) === true
        );
        filtered.forEach((f) => {
          data.xData.push(f.name);
          data.yData.push(f[yAxis]);
          data.y1Data.push(f[y1Axis]);
        });
        props.setData(data);
      }
    });
  }

  React.useEffect(() => {
    let isMounted = true;
    axios.get("http://139.99.72.60:4000/all-collections-names").then((res) => {
      let data = [];
      for (let i = 0; i < res.data.length; i++) {
        data[i] = res.data[i].name;
      }
      if (isMounted) setCollectionOptions(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        bgcolor="primary.main"
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerStyled variant="permanent" open={true}>
          <Box>
            <Toolbar>
              <Typography color="text.main" variant="h3" noWrap component="div">
                NFT-Twitter Webapp
              </Typography>
              <IconButton
                size="large"
                color="secondary"
                href="https://github.com/Kyzure/nft-twitter-relation"
              >
                <GitHubIcon size="large" />
              </IconButton>
            </Toolbar>

            <Divider sx={{ width: "85%", margin: "auto" }} />

            <Stack
              alignItems="left"
              direction="column"
              spacing="20px"
              sx={{ padding: "20px 28px 0 15px" }}
            >
              <Stack
                alignItems="left"
                direction="column"
                spacing="20px"
                sx={{ width: "100%" }}
              >
                <Typography color="text.main" variant="h6">
                  Select NFT collection
                </Typography>
                <Autocomplete
                  multiple
                  sx={{ width: "100%" }}
                  id="tags-standard"
                  onChange={selectCollection}
                  options={collectionOptions}
                  getOptionLabel={(option) => option}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextFieldStyled
                      {...params}
                      variant="outlined"
                      label={"OpenSea Collections"}
                    />
                  )}
                  value={collection}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: "#ffffff", color: "#959595" }}>
                      {children}
                    </Paper>
                  )}
                />
              </Stack>

              <Stack
                alignItems="left"
                direction="column"
                spacing="20px"
                sx={{ width: "100%" }}
              >
                {SelectDate()}
                {SelectAxis()}
                {ShowGraph()}
              </Stack>
            </Stack>
          </Box>
        </DrawerStyled>
      </Box>
    </Box>
  );
}

export default SideDrawer;
