import axios from "axios";
import { setCategories } from "../Slice/categoriesSlice";
import { setMovies,setLoading as setLoadingMovies,setSearchResults,} from "../Slice/moviesSlice";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-category`);
    dispatch(setCategories(response.data.categories));
  } catch (error) {
    console.log(error);
  }
};


export const getMovies = () => async (dispatch) => {
    try {
      dispatch(setLoadingMovies (true)); // Set loading state to true before fetching
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-Movie`);
      dispatch(setMovies (response.data.movies));
      dispatch(setLoadingMovies (false)); // Set loading state to false after fetching
    } catch (error) {
      console.log(error);
      dispatch(setLoadingMovies (false)); // Set loading state to false on error
    }
  };
  
  export const searchMovies = (keyword,navigate,setNoMoviesFound) => async (dispatch) => {
    try {
      dispatch(setLoadingMovies(true)); // Set loading to true before making the API call
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/searchMovie/${keyword}`
      );
  
      if (response.data.success) {
        if (response.data.result.length === 0) {
            setNoMoviesFound(true);
         console.log("no movies found");
          } else {
            dispatch(setSearchResults(response.data.result));
            localStorage.setItem('searchResults', JSON.stringify(response.data.result));
            navigate("/SearchPage");
          }
      } else {
        console.error(
          "Search failed:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingMovies(false)); // Set loading to false after API call is completed
    }
  };