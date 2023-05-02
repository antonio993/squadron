import { createAsyncThunk } from '@reduxjs/toolkit';
import { connectorService } from '../../services/api/connector/connectorService';

export const getConnectorsList = createAsyncThunk(
  'connectors/get',
  async(data, thunkAPI) => {
    const result = await connectorService.fetch();

    if (result.success) {
      return result.data;
    }
    else {
      return thunkAPI.rejectWithValue(result.error);
    }
  }
);

export const updateConnector = createAsyncThunk(
  'connectors/update',
  async(data, thunkAPI) => {
    const result = await connectorService.updateConnector(data.id, data);

    if (result.success) {
      return result.data;
    }
    else {
      return thunkAPI.rejectWithValue(result.error);
    }
  }
);

export const addConnector = createAsyncThunk(
  'connectors/add',
  async(data, thunkAPI) => {
    const result = await connectorService.addConnector(data);

    if (result.success) {
      return result.data;
    }
    else {
      return thunkAPI.rejectWithValue(result.error);
    }
  }
);