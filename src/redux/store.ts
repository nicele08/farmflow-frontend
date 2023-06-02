import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authSlice,
      theme: themeSlice,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
