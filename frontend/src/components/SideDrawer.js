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
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DropdownSelect from "./DropdownSelect.js";

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

  // To select type of graph
  const graphTypes = ["TwitterUsernameSingleInfo", "TwitterUsernameAllInfo", "SlugTweetSingleInfo", "SlugTweetAllInfo", "SlugTweetSingleInfoOnlyTweets"];
  const [graphType, setGraphType] = React.useState(graphTypes[0]);
  const selectGraphType = (event) => {
    setGraphType(event.target.value);
    setCollection([]);
  };
  function GraphTypeDropdownSelect () {
    return (
      <Stack
        alignItems="left"
        direction="column"
        spacing="20px"
        sx={{ width: "100%" }}>
        <Typography color="text.main" variant="h6">
          Select Graph Type
        </Typography>
        <DropdownSelect
          sx={{ width: "100%", padding: "0 0 0 0" }}
          value={ graphType }
          label="GraphType"
          selectOption={ selectGraphType }
          options={ graphTypes } />
      </Stack>
    )
  }

  // To select collection(s)
  const [collection, setCollection] = React.useState([]);
  const selectCollections = (_event, newValue) => {
    // Only allow single collection for single collection graph type
    if (graphType === graphTypes[0] || graphType === graphTypes[2] || graphType === graphTypes[4]) {
      setYAxis(singleNFTAxisOptions[0]);
      setY1Axis(singleNFTAxisOptions[1]);
      if (newValue.length <= 1) {
        setCollection([...newValue]);
      }
    }

    // Only allow up to 10 collections for multiple collection graph type
    if (graphType === graphTypes[1] || graphType === graphTypes[3]) {
      setYAxis(multiNFTAxisOptions[0]);
      setY1Axis(multiNFTAxisOptions[1]);
      if (newValue.length <= 10) {
        setCollection([...newValue]);
      }
    }
  };
  function CollectionsMultiSelect () {
    return (
      <Stack
        alignItems="left"
        direction="column"
        spacing="20px"
        sx={{ width: "100%" }}
      >
        <Typography color="text.main" variant="h6">
          Select NFT collections
        </Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          onChange={selectCollections}
          options={collectOptWithTwit}
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
    )
  }

  // To select date(s)
  const [startDate, setStartDate] = React.useState(new Date("April 16, 2022 00:00:00"));
  const [endDate, setEndDate] = React.useState(new Date());
  function SelectDate() {
    if (graphType === graphTypes[0] || graphType === graphTypes[2] || graphType === graphTypes[4]) {
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
              minDate={new Date("April 1, 2022 00:00:00")}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="dd/MM/yyyy"
              maxDate={new Date()}
            />
          </ThemeProvider>
        </LocalizationProvider>
      );
    }
    if (graphType === graphTypes[1] || graphType === graphTypes[3]) {
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
              minDate={new Date("April 15, 2022 00:00:00")}
              maxDate={new Date()}
            />
          </ThemeProvider>
        </LocalizationProvider>
      );
    }
  }

  // To select axis
  const singleNFTAxisOptions = [
    "average_price",
    "count",
    "like_count",
    "market_cap",
    "num_owners",
    "one_day_average_price",
    "one_day_sales",
    "quote_count",
    "reply_count",
    "retweet_count",
    "total_sales",
    "total_supply",
    "total_volume"
  ]
  const multiNFTAxisOptions = [
    "average_price",
    "count",
    "floor_price",
    "followers_count",
    "like_count",
    "market_cap",
    "num_owners",
    "quote_count",
    "reply_count",
    "retweet_count",    
    "total_sales",
    "total_supply",
    "total_volume"
  ];
  const singleNFTAxisMenuItems = singleNFTAxisOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)
  const multiNFTAxisMenuItems = multiNFTAxisOptions.map(option => <MenuItem key={option} value={option}> {option}</MenuItem>);
  const [yAxis, setYAxis] = React.useState("");
  const [y1Axis, setY1Axis] = React.useState("");
  function SelectAxis() {
    if (graphType === graphTypes[0] || graphType === graphTypes[2] || graphType === graphTypes[4]) {
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
              { singleNFTAxisMenuItems }
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
              { singleNFTAxisMenuItems }
            </Select>
          </FormControl>
        </ThemeProvider>
      );
    } else if (graphType === graphTypes[1] || graphType === graphTypes[3]) {
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
              {multiNFTAxisMenuItems}
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
              {multiNFTAxisMenuItems}
            </Select>
          </FormControl>
        </ThemeProvider>
      );
    }
  }

  const [collectionOptions, setCollectionOptions] = React.useState([]);
  const [collectOptWithTwit, setCollectOptWithTwit] = React.useState([]);

  function ShowGraphButton() {
    if (collection.length > 0) {
      switch (graphType) {
        case graphTypes[0]:
          return (
            <Button
              color="secondary"
              onClick={() =>
                TwitterUsernameSingleInfo(collection[0], startDate, endDate)
              }
            >
              Single NFT Twitter
            </Button>
          );
        case graphTypes[1]:
          return (
            <Button
              color="secondary"
              onClick={() =>
                TwitterUsernameAllInfo(startDate)
              }
            >
              Multi NFT Twitter
            </Button>
          );
        case graphTypes[2]:
          return (
            <Button
              color="secondary"
              onClick={() =>
                SlugTweetSingleInfo(collection[0], startDate, endDate)
              }
            >
              Single NFT Slug
            </Button>
          );
        case graphTypes[3]:
          return (
            <Button
              color="secondary"
              onClick={() =>
                SlugTweetAllInfo(startDate)
              }
            >
              Multi NFT Slug
            </Button>
          );
        default:
          return (
            <Button
              color="secondary"
              onClick={() =>
                SlugTweetSingleInfoOnlyTweets(collection[0], startDate, endDate)
              }
            >
              Single Slug only Tweet
            </Button>
          );
      }
    }
  }

  // Try to make this 7 days or so for graph to look nice
  function TwitterUsernameSingleInfo(nft, startDate, endDate) {
    const path = "twitter-username-single-info";
    const query = {
      slug: nft,
      startDate: startDate,
      endDate: endDate,
    };
    GetAxiosData(path, query);
  }

  function TwitterUsernameAllInfo(date) {
    const path = "twitter-username-all-info";
    const query = {
      date: date,
    };
    GetAxiosData(path, query);
  }

    // Try to make this 7 days or so for graph to look nice
    function SlugTweetSingleInfo(nft, startDate, endDate) {
      const path = "slug-tweet-single-info";
      const query = {
        slug: nft,
        startDate: startDate,
        endDate: endDate,
      };
      GetAxiosData(path, query);
    }

  function SlugTweetAllInfo(date) {
    const path = "slug-tweet-all-info";
    const query = {
      date: date,
    };
    GetAxiosData(path, query);
  }

  function SlugTweetSingleInfoOnlyTweets(nft, startDate, endDate) {
    const path = "slug-tweet-single-info-only-tweets";
    const query = {
      slug: nft,
      startDate: startDate,
      endDate: endDate,
    };
    GetAxiosData(path, query);
  }

  // Remove when needed
  function Testing() {
    // TwitterUsernameSingleInfo("axie", "Apr 16 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
    // TwitterUsernameAllInfo("Apr 16 2022 00:00:00 UTC") // not working
    // SlugTweetSingleInfo("axie", "Apr 16 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
    // SlugTweetAllInfo("Apr 16 2022 00:00:00 UTC")
    // SlugTweetSingleInfoOnlyTweets("axie", "Apr 14 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
  }

  // Function to get data from backend.
  // path is the additional string added onto the url to GET from the right URL
  // query is an object stating the necessary requirements for the API
  function GetAxiosData(path, query) {
    // Example date: "Apr 8 2022 00:00:00 UTC"
    axios({
      method: "GET",
      url: "http://139.99.72.60:4000/" + path,
      headers: { "Content-Type": "application/json" },
      params: query,
    }).then((res) => {
      var data = {
        name: graphType,
        xData: [],
        yData: [],
        yLabel: yAxis,
        y1Data: [],
        y1Label: y1Axis,
      };
      if (graphType === graphTypes[0] || graphType === graphTypes[2] || graphType === graphTypes[4]) {
        res.data.forEach(e => {
          if (e.length > 0) {
            data.xData.push(e[0].date);
            data.yData.push(e[0][yAxis]);
            data.y1Data.push(e[0][y1Axis]);
          }
        });
        props.setData(data);
      }
      if (graphType === graphTypes[1] || graphType === graphTypes[3]) {
        var filtered = res.data.filter(
          (x) => collection.includes(x.slug) === true
        );
        filtered.forEach((f) => {
          data.xData.push(f.slug);
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
        data[i] = res.data[i].slug;
      }
      if (isMounted) setCollectionOptions(data);
    });

    axios
      .get("http://139.99.72.60:4000/all-collections-names-with-twitter")
      .then((res) => {
        let data = [];
        for (let i = 0; i < res.data.length; i++) {
          data[i] = res.data[i].slug;
        }
        if (isMounted) setCollectOptWithTwit(data);
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
              spacing="25px"
              sx={{ padding: "20px 28px 0 15px" }}
            >

              { GraphTypeDropdownSelect() }
              { CollectionsMultiSelect() }
              { SelectDate() }
              { SelectAxis() }
              { ShowGraphButton() }

              <Button color="secondary" onClick={ () => Testing() }>
                Testing
              </Button>

            </Stack>
          </Box>
        </DrawerStyled>
      </Box>
    </Box>
  );
}

export default SideDrawer;
