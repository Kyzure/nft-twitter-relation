import * as React from 'react';
import DropdownSelect from './DropdownSelect.js';
import axios from "axios";
import qs from "qs";

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
  const collectionOptions = ["Ayy", "Bee", "Cee", "Dee", "Ee", "Eff", "Gee", "Aitch", "Aye", "Jay"]
  const inputRef = React.useRef(null);
  const baseURL = "http://139.99.72.60:4000/tweets/cryptopunks"

  const [id, setId] = React.useState(1)

  function GetData(name, marketplace) {
    /*
    axios.get(baseURL, { params: { "name": name, "marketplace": marketplace } })
      .then((response) => {
        let data = response.data
        data.id = id
        setId(id + 1)
        props.setDataList(old => {
          if (old.length >= 5) {
            return [...old.splice(1, 5), data]
          }
          return [...old, data]
        });
    });
    */
    // http://139.99.72.60:4000/tweets/cryptopunks
    // http://139.99.72.60:4000/all-collections-info
    let options = {
      method: "GET",
      url: "http://139.99.72.60:4000/",
      headers: { 'Content-Type': 'application/json' },
      params: JSON.stringify({
        "test": "yeet"
      })
    }

    axios(options)
      .then((response) => {
        console.log(response)
      });
    }

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
              <Button color="secondary" onClick={ GetData }>
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