import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: "",
    loading: true,
  },

  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },

  },
});

export const { setAuth,setLoading  } = authSlice.actions;
export default authSlice.reducer;
