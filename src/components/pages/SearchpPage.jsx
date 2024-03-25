import React, { useContext, useState } from "react";
import { movies } from "../Contex";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import UserNavbar from "../Header/UserNavbar";

const SearchPage = () => {
  const { search, shortText } = useContext(movies);
  const authString = localStorage.getItem("auth");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  // Logic to calculate index of the first and last movie on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = search.result.slice(indexOfFirstMovie, indexOfLastMovie);

  // Logic to change page
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

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
        {currentMovies.map((movie) => (
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
                <Link
                  className="linkfont"
                  to={`/MovieDescription/${movie._id}`}
                >
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
      <div style={{ textAlign: "center" }}>
        <Button style={{color:"white",backgroundColor:"red"}} onClick={prevPage} disabled={currentPage === 1}>
          Previous page
        </Button>{" "}
        {Array.from({ length: Math.ceil(search.result.length / moviesPerPage) }, (_, i) => (
          <Button style={{color:"white",backgroundColor:"red"}} key={i} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </Button>
        ))}{" "}
        <Button style={{color:"white",backgroundColor:"red"}} onClick={nextPage} disabled={currentPage === Math.ceil(search.result.length / moviesPerPage)}>
          Next page
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
