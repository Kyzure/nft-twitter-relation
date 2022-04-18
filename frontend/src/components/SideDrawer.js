import * as React from 'react';
import DropdownSelect from './DropdownSelect.js';
import axios from "axios";

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';

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

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: theme.palette.secondary
  }
}));

function SideDrawer(props) {  
  const DrawerStyled = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      background: theme.palette.primary.main, 
      boxSizing: 'border-box',
      width: props.drawerWidth
    }
  }));

  const selectMarketplace = (event) => {
    props.setMarketplace(event.target.value);
    props.setCollection([]);
  };

  const selectCollection = (event, newValue) => {
    props.setCollection([...newValue]);
  };

  const marketplaceOptions = ["OpenSea", "LooksRare", "Rarible"];
  const [collectionOptions, setCollectionOptions] = React.useState([]);

  function GetAllCollectionInfo(date) {
    const path = "all-collections-info"
    const query = {
      "date": date 
    }
    console.log(collectionOptions)
    // GetAxiosData(path, query)
  }

  // Try to make this 7 days or so for graph to look nice
  function GetTweetInfo(nft, startDate, endDate) {
    const path = "tweets/" + nft
    const query = {
      "startDate": startDate,
      "endDate": endDate
    }
    console.log("get tweeet")
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
    })
      .then((res) => { 
        console.log(res.data)
        props.setData(res.data)
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
                  Select NFT marketplace
                </Typography>
                <DropdownSelect
                  sx={{ width: "100%", padding: "0 0 0 0" }}
                  value={ props.marketplace }
                  label="NFT Marketplace"
                  selectOption={ selectMarketplace }
                  options={ marketplaceOptions } />
              </Stack>

              <Divider sx={{ width:'85%' }} />

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
                  defaultValue={ collectionOptions.length === 0 ? [] : [collectionOptions[0]] }
                  renderInput={(params) => (
                    <TextFieldStyled
                      {...params}
                      variant="outlined"
                      label={"Collections from " + props.marketplace}
                    />
                  )}
                  value={ props.collection }
                />
              </Stack>
              <Button color="secondary" onClick={ () => GetAllCollectionInfo("Apr 15 2022 00:00:00 UTC") }>
                Example Button
              </Button>
              <Button color="secondary" onClick={ () => GetTweetInfo("MoonCats", "Apr 11 2022 00:00:00 UTC", "Apr 17 2022 00:00:00 UTC") }>
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