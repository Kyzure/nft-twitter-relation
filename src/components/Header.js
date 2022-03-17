import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import CssBaseline from '@mui/material/CssBaseline';

function Header(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },
        }}>
        <Toolbar>
          <Typography color="text.main" variant="h5" noWrap component="div">
            NFT-Twitter Webapp
          </Typography>
          <IconButton
            size="large"
            color="secondary"
            href="https://github.com/Kyzure/nft-twitter-relation">
            <GitHubIcon size="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
