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
  const [collectOptWithTwit, setCollectOptWithTwit] = React.useState([]);

  const [collection, setCollection] = React.useState([]);
  const [startDate, setStartDate] = React.useState(
    new Date("April 16, 2022 00:00:00")
  );
  const [endDate, setEndDate] = React.useState(new Date());
  const [yAxis, setYAxis] = React.useState("");
  const [y1Axis, setY1Axis] = React.useState("");

  const singleNFTAxisOptions = [
    "retweet_count",
    "reply_count",
    "like_count",
    "one_day_sales",
    "one_day_average_price"
  ];
  const singleNFTAxisMenuItems = singleNFTAxisOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)
  const multiNFTAxisOptions = [
    "average_price",
    "count",
    "floor_price",
    "followers_count",
    "market_cap",
    "num_owners",
    "reply_count",
    "retweet_count",
    "total_sales",
    "total_supply",
    "total_volume",
    "tweet_count",
  ];
  const multiNFTAxisMenuItems = multiNFTAxisOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ));

  const selectCollection = (_event, newValue) => {
    if (newValue.length === 0) {
      setYAxis("");
      setY1Axis("");
    } else if (newValue.length === 1) {
      setYAxis("like_count");
      setY1Axis("one_day_average_price");
    } else {
      setYAxis(multiNFTAxisOptions[0]);
      setY1Axis(multiNFTAxisOptions[1]);
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
              minDate={new Date("April 15, 2022 00:00:00")}
              maxDate={new Date()}
            />
          </ThemeProvider>
        </LocalizationProvider>
      );
    }
  }

  function SelectAxis() {
    if (collection.length === 1) {
      return (
        <>
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
        </>
      );
    } else if (collection.length > 1) {
      return (
        <>
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
        </>
      );
    }
  }

  function ShowGraph() {
    if (collection.length === 1) {
      return (
        <Button
          color="secondary"
          onClick={() =>
            TwitterUsernameSingleInfo(collection[0], startDate, endDate)
          }
        >
          Show Tweets
        </Button>
      );
    } else if (collection.length > 1) {
      return (
        <Button
          color="secondary"
          onClick={() => TwitterUsernameAllInfo(startDate)}
        >
          Show Collection Info
        </Button>
      );
    }
  }

  function TwitterUsernameAllInfo(date) {
    const path = "twitter-username-all-info";
    const query = {
      date: date,
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
    TwitterUsernameSingleInfo("axie", "Apr 16 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
    SlugTweetSingleInfo("axie", "Apr 16 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
    SlugTweetSingleInfoOnlyTweets("axie", "Apr 14 2022 00:00:00 UTC", "Apr 21 2022 00:00:00 UTC")
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
            data.xData.push(key);
            data.yData.push(res.data[key][0][yAxis]);
            data.y1Data.push(res.data[key][0][y1Axis]);
          }
        }
        props.setData(data);
      } else if (collection.length > 1) {
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
                  id="tags-standard"
                  onChange={selectCollection}
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

              <Button color="secondary" onClick={ () => Testing() }>
                Testing
              </Button>

              {SelectDate()}
              {SelectAxis()}
              {ShowGraph()}
            </Stack>
          </Box>
        </DrawerStyled>
      </Box>
    </Box>
  );
}

export default SideDrawer;
