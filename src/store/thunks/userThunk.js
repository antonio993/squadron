import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/api/user/userService';

export const loginUser = createAsyncThunk(
  'user/login',
  async(data, thunkAPI) => {
    const result = await userService.create(data);

    if (result.success) {
      localStorage.setItem('token', result.data.token);
      return result.data;
    }
    else {
      return thunkAPI.rejectWithValue(result.error);
    }
  }
);