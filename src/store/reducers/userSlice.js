import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/userThunk';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  loading: false,
  token,
  errorMsg: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('token'); // delete token from storage
      state.loading = false;
      state.token = null;
      state.errorMsg = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: state => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { token } = payload;

      state.loading = false;
      state.errorMsg = null;
      state.token = token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorMsg = payload.message;
    }
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;