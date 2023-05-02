import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';

import {
  ExpandMore,
  Edit
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getConnectorsList } from '../../store/thunks/connectorsThunk';
import EditModal from '../modals/AddEditModal';
import PinsModal from '../modals/PinsModal';
import ConnectorHeader from '../Connector/ConnectorHeader';

export const Connector = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchStr, setSearchStr] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [connectorIds, setConnectorIds] = useState([]);
  const [openPinsModal, setOpenPinsModal] = useState(false);

  const connectorsList = useSelector(state => state.connector.connectorsList);
  const loading = useSelector(state => state.connector.loading);
  const [filteredConnectorsList, setFilteredConnectorsList] = useState(connectorsList);
  const dispatch = useDispatch();

  const handleOpen = connector => {
    setOpen(true);
    setModalData(connector);
  };

  const handleClose = () => {
    setOpen(false);
    setModalData({});
  };

  const handleClosePinsModal = () => {
    setOpenPinsModal(false);
    setConnectorIds([]);
  };

  const filterConnectorsList = () => {
    return connectorsList.filter(connector => {
      const nameMatches = connector.name.toLowerCase().includes(searchStr.toLowerCase());
      return nameMatches;
    });
  };

  const dynamicSort = property => {
    let sortOrder = 1;
    if (sortDirection == 'dsc') {
      sortOrder = -1;
    }
    return function(a,b) {
      let result = (a[property]?.toLowerCase() < b[property]?.toLowerCase()) ? -1 : (a[property]?.toLowerCase() > b[property]?.toLowerCase()) ? 1 : 0;
      return result * sortOrder;
    };
  };

  useEffect(() => {
    connectorIds.length == 2 && setOpenPinsModal(true);
  }, [connectorIds]);

  useEffect(() => {
    dispatch(getConnectorsList()).then(({ payload }) => {
      Array.isArray(payload) && setFilteredConnectorsList(payload);
    });
  }, []);

  useEffect(() => {
    setFilteredConnectorsList(filterConnectorsList().sort(dynamicSort(sortBy)));
  }, [searchStr, sortDirection, connectorsList]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
      <ConnectorHeader
        handleOpen={handleOpen}
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <Grid container spacing={2}>
        {filteredConnectorsList.map(connector => (
          <Grid key={connector.id} item xs={12} sx={{ display: 'flex' }}>
            <Checkbox
              value={connector.id}
              onChange={e => setConnectorIds(connectorIds => [...connectorIds, e.target.value])}
              checked={connectorIds.includes(connector.id)}
            />
            <Accordion sx={{ width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{connector.name}</Typography>
              </AccordionSummary>
              <Divider sx={{ mb: 1 }}>Description</Divider>
              <AccordionDetails>
                <Typography>
                  {connector.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2, mt: 2 }} textAlign="left">Details</Divider>
                  <Typography sx={{ mr: 2, display: 'inline' }}>
                    Status: {connector.status}
                  </Typography>
                  <Typography sx={{ mr: 2, display: 'inline' }}>
                    Type: {connector.type}
                  </Typography>
                  <Divider sx={{ mb: 2, mt: 2 }}></Divider>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{
                      mb: 2,
                      float: 'right'
                    }}
                    onClick={() => handleOpen(connector)}
                  >
                Edit
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      { !(Object.keys(modalData).length === 0) && <EditModal open={open} handleClose={handleClose} data={modalData} />}
      { openPinsModal && <PinsModal open={openPinsModal} handleClose={handleClosePinsModal} data={connectorIds} />}

      {loading && <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}
    </Container>
  );
};

export default Connector;