import connectorSlice from './connectorSlice';
import userReducer from './userSlice';

export const reducer = {
  user: userReducer,
  connector: connectorSlice
};