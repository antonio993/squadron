import { Fragment, useState } from 'react';

import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';

import {
  Menu as MenuIcon,
  Adb
} from '@mui/icons-material';
import { Pages } from '../../constants/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Mobile = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { t } = useTranslation();

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <Box className='box' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {Object.values(Pages).map(page => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <NavLink
                  to={page}
                >
                  {t(page)}
                </NavLink>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    </Fragment>
  );
};

export default Mobile;