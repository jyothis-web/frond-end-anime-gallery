import React, { useContext } from "react";
import { movies } from "../Contex";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import UserNavbar from "../Header/UserNavbar";
import Footer from "../Footer/Footer";

const SearchPage = () => {
  const {
    search, shortText
  } = useContext(movies);
 

  return (
    <div className="backgroundimg">
      <UserNavbar/>
      <h3>Search results</h3>
      <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            gap: ".3cm",
            flexWrap:"wrap",
            paddingBottom: "2cm",
            paddingRight: "4px",
            position: "relative",
          }}
        >
          {search.result.map((movie) => (
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
 
      <Footer />
    </div>
  );
};

export default SearchPage;
