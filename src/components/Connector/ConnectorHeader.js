import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import {
  Add,
  Search
} from '@mui/icons-material';
import { Fragment } from 'react';

import { connector } from '../../constants/connector';
import { useTranslation } from 'react-i18next';

import './ConnectorHeader.scss';

const ConnectorHeader = ({ handleOpen, searchStr, setSearchStr, sortBy, setSortBy, sortDirection, setSortDirection }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          '& > :not(style)': { mb: 2 },
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            mb: 2,
            ml: 5
          }}
          onClick={() => handleOpen(connector)}
        >
          {t('add')}
        </Button>
        <Paper
          component="form"
          sx={{ p: '2px 4px', ml: 'auto', mr: 2, display: 'flex', alignItems: 'center', width: 270 }}
          className='search'
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={t('search')}
            value={searchStr}
            onChange={e => setSearchStr(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <FormControl sx={{ width: '20%' }}>
          <InputLabel id="demo-simple-select-label">{t('sortBy')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortBy}
            label={t('sortBy')}
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='name'>{t('name')}</MenuItem>
            <MenuItem value='description'>{t('description')}</MenuItem>
            <MenuItem value='status'>{t('status')}</MenuItem>
            <MenuItem value='type'>{t('type')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {sortBy != '' && <FormControl sx={{ float: 'right', width: '20%' }}>
        <InputLabel id="demo-simple-select-label">{t('sortDirection')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortDirection}
          label="Sort direction"
          onChange={e => setSortDirection(e.target.value)}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='asc'>{t('asc')}</MenuItem>
          <MenuItem value='dsc'>{t('dsc')}</MenuItem>
        </Select>
      </FormControl>}
    </Fragment>
  );
};

export default ConnectorHeader;