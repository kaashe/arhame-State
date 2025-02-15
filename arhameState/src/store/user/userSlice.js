import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  error: null,
  laoding: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentuser = action.payload;
    },
  },
});
export const { signInSuccess } = userSlice.actions;

export default userSlice.reducer;
