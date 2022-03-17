import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

function SideDrawer(props) {
  const SideDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      background: theme.palette.primary.main, 
      boxSizing: 'border-box',
      width: props.drawerWidth
    }
  }));

  const FormControlStyled = styled(FormControl)(({ theme }) => ({
  }));
  
  const SelectStyled = styled(Select)(({ theme }) => ({
    width: '95%',
    '& label.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
  }));

  const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
    root: {
      color: theme.palette.text.primary
    }
  }));

  const TextFieldStyled = styled(TextField)(({ theme }) => ({
    width: '80%',
    '& label.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
  }));
  
  const handleChange = (event) => {
    props.setMarketplace(event.target.value);
  };

  const styles = theme => ({
    select: {
      "&:before": {
        borderColor: "red"
      }
    }
  });

  const drawer = (
    <div>
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
      <Stack alignItems="center" direction="column" spacing="25px" sx={{ paddingTop: "50px" }}>
        <Stack
          alignItems="left"
          direction="column"
          spacing="20px"
          sx={{ width: "90%" }}>
          <Typography color="text.main" variant="h6">
            Select NFT marketplace
          </Typography>
          <FormControlStyled sx={{ m: 1, width: '90%' }}>
            <InputLabelStyled id="select-nft-marketplace-label">NFT marketplace</InputLabelStyled>
            <SelectStyled
              labelId="select-nft-marketplace-label"
              id="select-nft-marketplace"
              value={props.marketplace}
              label="NFT marketplace"
              size="small"
              onChange={ handleChange }>
              <MenuItem value={"OpenSea"}>OpenSea</MenuItem>
              <MenuItem value={"LooksRare"}>LooksRare</MenuItem>
              <MenuItem value={"Rarible"}>Rarible</MenuItem>
            </SelectStyled>
          </FormControlStyled>
        </Stack>
        <Divider sx={{ width:'85%' }} />
        <Stack
          alignItems="left"
          direction="column"
          spacing="20px"
          sx={{ width: "90%" }}>
          <Typography color="text.main" variant="h6">
            Search for NFT collection
          </Typography>
          <Box
            className='search-bar'
            component="form"
            noValidate
            autoComplete="off">
            <TextFieldStyled
              label="Search a NFT collection"
              type="search"
              size="small"
              variant="outlined">
            </TextFieldStyled>
            <IconButton disableRipple={true} type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon color="secondary" />
            </IconButton>
          </Box>
        </Stack>
        <Divider sx={{ width:'85%' }} />
      </Stack>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        bgcolor="primary.main"
        component="nav"
        sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders">
        <SideDrawer
          variant="permanent"
          open>
          {drawer}
        </SideDrawer>
      </Box>
    </Box>
  );
}

export default SideDrawer;