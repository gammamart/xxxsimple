import { createSlice } from "@reduxjs/toolkit";

const USER_INITIAL_STATE = {user: null, profile: null, sentSwitch: false};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logOut(state, action) {
      state.user = null;
    },
    saveProfile(state, action) {
      state.profile = action.payload;
    },
    switchSent(state) {
      state.sentSwitch = !state.sentSwitch;
    }
  },
});

export default userSlice;