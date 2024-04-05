import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
