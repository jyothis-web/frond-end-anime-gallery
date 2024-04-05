import Footer from "../Footer/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserNavbar from "../Header/UserNavbar";
import Navbar from "../Header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchResults } from "../Redux/Slice/moviesSlice";

const SearchPage = () => {
const dispatch = useDispatch();
  // Get search result from Redux store
  const searchResult = useSelector((state) => state.movies.searchResults);
  useEffect(() => {
    const storedSearchResults = localStorage.getItem("searchResults");
    if (storedSearchResults) {
      dispatch(setSearchResults(JSON.parse(storedSearchResults)));
    }
    
    // Cleanup function to remove search results from localStorage when component unmounts
    return () => {
      localStorage.removeItem("searchResults");
    };
  }, [dispatch]);


  // Check if searchResult is undefined or empty
  if (!searchResult || searchResult.length === 0) {
    return <div>No search results found</div>;
  }
  const authString = localStorage.getItem("auth");

  const shortText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="backgroundimg">
      {authString ? <UserNavbar /> : <Navbar />}
      <h3>Search results</h3>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          gap: ".3cm",
          flexWrap: "wrap",
          paddingBottom: "2cm",
          paddingRight: "4px",
          position: "relative",
        }}
      >
        {searchResult.map((movie) => (
          <div className="card" key={movie._id}>
          <div>
            <Link to={`/MovieDescription/${movie._id}`}>
              <div className="movie-image">
              {movie.image && movie.image.length > 0 && (
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${movie.image[0].imagePath}`}
                    alt={`${movie.name}-0`}
                  />
                )}
              </div>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="movie-details">
              <Link className="linkfont" to="/MovieDescription">
                <Typography className="movie-name">
                  {shortText(movie.name, 12)}
                </Typography>
              </Link>
              <button className="redbtn">Watch</button>
            </div>
          </div>
        </div>
        ))}
      </div>
      {/* Pagination */}
     
      <Footer />
    </div>
  );
};

export default SearchPage;
