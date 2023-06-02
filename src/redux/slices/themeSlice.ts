import { createSlice } from '@reduxjs/toolkit';

import Secure from '@/utils/secureLs';

interface InitialState {
  theme: 'light' | 'dark' | 'system';
}

const initialState: InitialState = {
  theme: Secure.getTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';

      Secure.setTheme(state.theme);
    },

    setTheme(state, action) {
      state.theme = action.payload;

      Secure.setTheme(state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
