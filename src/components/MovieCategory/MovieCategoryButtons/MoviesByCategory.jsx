import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserNavbar from "../../Header/UserNavbar";
import Footer from "../../Footer/Footer";

const MoviesByCategory = () => {
  const { categoryId, categoryName } = useParams();
  console.log(categoryId);
  const [categoryMovies, setcategoryMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/filter-movie-category/${categoryId}`
        );
        setcategoryMovies(response.data.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies by category:", error);
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [categoryId]);
  const shortText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="backgroundimg">
      <UserNavbar />
      <h1>{categoryName}</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : categoryMovies.length === 0 ? (
        <p style={{ marginTop: "200px" }}>No movies found for this category.</p>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap:"wrap",
            gap: ".3cm",
            paddingBottom: "2cm",
            paddingRight: "4px",
            position: "relative",
          }}
        >
          {categoryMovies.map((movie) => (
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
      )}
      <Footer />
    </div>
  );
};

export default MoviesByCategory;
