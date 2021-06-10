import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'themes',
  initialState: {
    background: '',
    font: '',
    color: '',
  },
  reducers: {
    themeSelected: (state, action) => {
      state.background = action.payload.background;
      state.font = action.payload.font;
      state.color = action.payload.color;
      },
},
});

export const { themeSelected } = themeSlice.actions;

export const selectBackground = (state) => state.themes.background;
export const selectFont = (state) => state.themes.font;
export const selectColor = (state) => state.themes.color;

export default themeSlice.reducer;