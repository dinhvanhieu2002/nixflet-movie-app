import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const scrollHeaderSlice = createSlice({
  name: "scrollHeader",
  initialState: {
    scrollHeader: false,
  },
  reducers: {
    setScrollHeader: async (state, action) => {
      state.scrollHeader = action.payload;
    },
  },
});

export const { setScrollHeader } = scrollHeaderSlice.actions;

export default scrollHeaderSlice.reducer;
