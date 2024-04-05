import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: "movies",
    initialState: {
      data: [], 
      loading: false,
      searchKeyword: "",
      searchResults: [],

    },
    reducers: {
      setMovies(state, action) {
        state.data = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setSearchKeyword(state, action) {
        state.searchKeyword = action.payload;
      },
      setSearchResults(state, action) {
        state.searchResults = action.payload;
      },

    },
  });
  

  

export const { setMovies,setLoading, setNoMoviesFound,setSearchResults,setSearchKeyword } = movieSlice.actions;
export default movieSlice.reducer;
