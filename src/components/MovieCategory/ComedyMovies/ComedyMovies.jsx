import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios"; // Import Axios
import "../../Products/movies-slider/MovieSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movies } from "../../Contex";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

const ComedyMovies = () => {
  const { getCategories } = useContext(movies);
  const sliderRef = useRef(null);
  const [moviesByCategory, setMoviesByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [shownMovies, setShownMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const categoryId = "65dc65f2aff24c3875e4090c"; // Replace with the actual category ID
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/get-movies-by-category/${categoryId}`
        );

        setMoviesByCategory(response.data.movies);
        // setShownMovies([]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies by category:", error);
        setLoading(false);
      }
    };

    getCategories();
    fetchMoviesByCategory();
    // eslint-disable-next-line
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 2000, // Screen width >= 992px
        settings: {
          slidesToShow: 10,
        },
      },
      {
        breakpoint: 1500, // Screen width >= 992px
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1300, // Screen width >= 992px
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1000, // Screen width >= 992px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // Screen width >= 768px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576, // Screen width >= 576px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Screen width >= 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleNextMovie = () => {
    sliderRef.current.slickNext();
  };

  const shortText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div style={{ width: "100%",overflowX: "hidden" }}>
      <div style={{paddingLeft:"30px",fontSize:"18px",fontWeight:"bold",}}>Comedy Movies</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          gap: ".3cm",
          paddingBottom: "2cm",
          paddingRight: "4px",
          position: "relative",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings} ref={sliderRef} style={{ width: "100%" }}>
            {moviesByCategory
            //   .filter((movie) => !shownMovies.includes(movie._id))
              .map((movie) => (
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
          </Slider>
        )}
        <IconButton
          style={{ position: "absolute", right: "-10px", top: "30px" }}
          onClick={handleNextMovie}
        >
          <ArrowForwardIosIcon fontSize="30px" className="slide-btn" />
        </IconButton>
      </div>
    </div>
  );
};

export default ComedyMovies;
