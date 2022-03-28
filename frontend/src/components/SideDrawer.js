import * as React from 'react';
import DropdownSelect from './DropdownSelect.js';
import axios from "axios";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

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

  const selectNft = (event) => {
    props.setMarketplace(event.target.value);
  };

  const nftOptions = ["OpenSea", "LooksRare", "Rarible"];
  const inputRef = React.useRef(null);
  const baseURL = "http://localhost:5000/"

  const [id, setId] = React.useState(1)

  function GetData(name, marketplace) {
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
  }

  function SearchForNft(e) {
    e.preventDefault();
    GetData(inputRef.current.value, props.marketplace);
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
                  selectOption={ selectNft }
                  options={ nftOptions } />
              </Stack>
              <Divider sx={{ width:'85%' }} />
              <Stack
                alignItems="left"
                direction="column"
                spacing="20px"
                sx={{ width: "100%" }}>
                <Typography color="text.main" variant="h6">
                  Search for NFT collection
                </Typography>
                <Box
                  sx={{ width: "100%" }}
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={ SearchForNft }>
                  <TextFieldStyled
                    sx={{ width: "85%" }}
                    label="Search a NFT collection"
                    type="search"
                    size="small"
                    variant="outlined"
                    inputRef={ inputRef }
                    InputProps={{
                      endAdornment: 
                        <InputAdornment position="end">
                          <IconButtonStyled
                            type="submit"
                            disableRipple={true}
                            aria-label="Search"
                            onClick={ SearchForNft }
                            label="Search">
                              <SearchIcon color="secondary"/>
                          </IconButtonStyled>
                        </InputAdornment>
                    }}/>
                </Box>
              </Stack>
              <Divider sx={{ width:'85%' }} />
            </Stack>
          </Box>
        </DrawerStyled>
      </Box>
    </Box>
  );
}

export default SideDrawer;