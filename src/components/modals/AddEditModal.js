import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Autocomplete
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { status } from '../../constants/statuses';
import { type } from '../../constants/types';
import { updateConnector, addConnector } from '../../store/thunks/connectorsThunk';

export const AddEditModal = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();
  const [connectorData, setconnectorData] = useState(data);
  const [value, setValue] = useState(data.type);
  const [pinFields, setPinFields] = useState(data.pins);

  const handleChange = e => {
    setconnectorData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePinChange = (i, e) => {
    let newFormValues = [...pinFields];
    newFormValues[i][e.target.name] = e.target.value;
    setPinFields(newFormValues);
    setconnectorData(prev => ({ ...prev, 'pins': pinFields }));
  };

  const onSubmit = () => {
    isModalEdit() ? dispatch(updateConnector(connectorData)) : dispatch(addConnector(connectorData));
    handleClose();
  };

  const isModalEdit = () => Object.keys(connectorData).some(element => element == 'id');

  useEffect(() => {
    setconnectorData(data);
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        { isModalEdit() ? 'Edit' : 'Add' }
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="Enter name"
            autoFocus
            value={connectorData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            value={connectorData.description}
            onChange={handleChange}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={connectorData.status}
              onChange={handleChange}
              label="Status"
              name="status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(status).map(s => (
                <MenuItem
                  key={s}
                  value={s}
                >{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={type}
            name='type'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setconnectorData(prev => ({ ...prev, 'type': newValue }));
            }}
            sx={{ width: 300, mt: 2 }}
            renderInput={params => <TextField {...params} label="Type" />}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setPinFields([...pinFields, { name: '' }])}
          >Add pin fields</Button>
          {pinFields.map((f, index) => (
            <TextField
              key={index}
              margin="normal"
              fullWidth
              name='name'
              label={(index + 1) + '. Name of pin'}
              value={f.name}
              onChange={e => handlePinChange(index, e)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleClose()}
        >Cancel</Button>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => onSubmit()}
        >
          { isModalEdit() ? 'Edit' : 'Add' }

        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModal;