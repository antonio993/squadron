import { useState } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
  AppBar,
  Container,
  Menu,
  Typography,
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  styled
} from '@mui/material';

import Desktop from './Desktop';
import Mobile from './Mobile';

import { languages } from '../../constants/languages';

import { logout } from '../../store/reducers/userSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CustomToggleButton = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#957F7F'
  }
});

const AppMenu = () => {
  const { t, i18n } = useTranslation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [alignment, setAlignment] = useState('en');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    setAlignment(event.currentTarget.value);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Desktop /> {/** The desktop version of the menu */}

          <Mobile /> {/** The mobile version of the menu */}

          <Box sx={{ flexGrow: 0 }}>
            <ToggleButtonGroup
              color="secondary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              size="small"
              sx={{ m: 2 }}
            >
              {Object.keys(languages).map(lng => (
                <CustomToggleButton
                  key={lng}
                  value={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  {t(languages[lng].nativeName)}
                </CustomToggleButton>
              ))}
            </ToggleButtonGroup>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">{t('logout')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppMenu;