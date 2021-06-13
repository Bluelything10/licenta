import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';
import themeState from'../features/themeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    themes:themeState,
  },
});
