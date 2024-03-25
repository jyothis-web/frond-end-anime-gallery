import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../../Contex";
import SearchIcon from "@mui/icons-material/Search";
import { Alert, IconButton } from "@mui/material";

const Search = () => {
  const { search, setSearch } = useContext(movies);
  const navigate = useNavigate();
  const [noMoviesFound, setNoMoviesFound] = useState(false);

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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/searchMovie/${search.keyword}`
      );

      if (response.data.success) {
        if (response.data.result.length === 0) {
          setNoMoviesFound(true);
        } else {
          setSearch((prevSearch) => ({
            ...prevSearch,
            result: response.data.result,
          }));
          console.log(response.data.result);
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
              value={search.keyword}
              onChange={(e) =>
                setSearch({ ...search, keyword: e.target.value })
              }
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
          style={{ width: "300PX",position:"absolute",top:"100%",right:"35%", backgroundColor: "red", color: "white" }}
        >
          No movies found!
        </Alert>
      )}

    </div>
  );
};

export default Search;
