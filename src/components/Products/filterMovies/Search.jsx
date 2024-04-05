import React, {  useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { searchMovies } from "../../Redux/actions/actions";
import { useNavigate } from "react-router-dom";

const Search = () => {
   const [keyword, setKeyword] = useState("");
   const [noMoviesFound, setNoMoviesFound] = useState(false);
   const navigate =  useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (noMoviesFound) {
      const timer = setTimeout(() => {
        setNoMoviesFound(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [noMoviesFound]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(searchMovies(keyword,navigate,setNoMoviesFound));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <div className="search-position">
          <div className="input">
            <input
              style={{ border: "none", outline: "none" }}
              placeholder="search Movies"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
          </div>
          <div className="search-btn">
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </form>

      {noMoviesFound && (
        <Alert
          variant="filled"
          style={{
            width: "300PX",
            position: "absolute",
            top: "100%",
            right: "35%",
            backgroundColor: "red",
            color: "white",
          }}
        >
          No movies found!
        </Alert>
      )}
    </div>
  );
};

export default Search;
