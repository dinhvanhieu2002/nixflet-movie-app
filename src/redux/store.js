import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import scrollHeaderSlice from "./features/scrollHeaderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    scrollHeader: scrollHeaderSlice,
  },
});

export default store;
