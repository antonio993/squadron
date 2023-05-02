import { Fragment } from 'react';

import {
  Box,
  Button,
  Typography
} from '@mui/material';

import {
  Adb
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Pages } from '../../constants/pages';
import { NavLink } from 'react-router-dom';

const Desktop = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'white',
          textDecoration: 'none',
        }}
      >
            LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {Object.values(Pages).map(page => (
          <Button
            key={page}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            <NavLink
              to={page}
              style={() => ({
                color: 'white'
              })}
            >
              {t(page)}
            </NavLink>
          </Button>
        ))}
      </Box>
    </Fragment>
  );
};

export default Desktop;