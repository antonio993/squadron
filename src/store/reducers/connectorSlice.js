import { createSlice } from '@reduxjs/toolkit';
import { getConnectorsList, updateConnector, addConnector } from '../thunks/connectorsThunk';

const initialState = {
  loading: false,
  connectorsList: [],
  errorMsg: null
};

const connectorSlice = createSlice({
  name: 'connector',
  initialState,
  reducers: {

  },
  extraReducers: {
    // Get the list of connectors
    [getConnectorsList.pending]: state => {
      state.loading = true;
    },
    [getConnectorsList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.connectorsList = payload;
      state.errorMsg = null;
    },
    [getConnectorsList.rejected]: (state, { payload }) => {
      const { message } = payload;
      state.loading = false;
      state.connectorsList = [];
      state.errorMsg = message;
    },

    // Update a connector
    [updateConnector.pending]: state => {
      state.loading = true;
    },
    [updateConnector.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.connectorsList = state.connectorsList.map(x => (x.id === payload.id) ? payload : x);
      state.errorMsg = null;
    },
    [updateConnector.rejected]: (state, { payload }) => {
      const { message } = payload;
      state.loading = false;
      state.errorMsg = message;
    },

    // Add a connector
    [addConnector.pending]: state => {
      state.loading = true;
    },
    [addConnector.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.connectorsList = [payload, ...state.connectorsList];
      state.errorMsg = null;
    },
    [addConnector.rejected]: (state, { payload }) => {
      const { message } = payload;
      state.loading = false;
      state.errorMsg = message;
    },

  }
});

// export const { } = connectorSlice.actions;

export default connectorSlice.reducer;