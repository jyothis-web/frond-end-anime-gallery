import React, {  useEffect, useRef } from "react";
import Slider from "react-slick";
import "./MovieSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import {  Typography } from "antd";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getMovies } from "../../Redux/actions/actions";
const MovieSlider = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories); // Map categories state from Redux store to component props
  const movies = useSelector(state => state.movies); // Map categories state from Redux store to component props

  useEffect(() => {
    dispatch(getCategories()); // Dispatch getCategories action when component mounts
    dispatch(getMovies()); // Dispatch getCategories action when component mounts
  }, [dispatch]);
    // console.log(products);
  const sliderRef = useRef(null);
 
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
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1500, // Screen width >= 992px
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1300, // Screen width >= 992px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000, // Screen width >= 992px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Screen width >= 768px
        settings: {
          slidesToShow: 3,
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
    sliderRef.current.slickNext(); // Move to the next slide
  };
  //to limit the text
  const shortText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        {categories.map((c) => (
          <div key={c._id}>
            <div>{c.name}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          gap: ".3cm",
          paddingBottom: "3cm",
          //   paddingLeft:"20px",
          paddingRight: "4px",
          position: "relative",
          // flexWrap: "wrap",
        }}
      >
        <Slider {...settings} ref={sliderRef} style={{ width: "100%" }}>
          {movies.map((movie) => (
            <div className="card" key={movie._id}>
              <div>
                <Link to={`/ProductDescription/${movie._id}`}>
                  <div className="movie-image">
                    {movie.image && (
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${movie.image.imagePath}`}
                        alt={movie.name}
                      />
                    )}
                  </div>
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="movie-details">
                  <Link className="linkfont" to="/ProductDescription">
                    <Typography className="movie-name">
                      {shortText(movie.name, 12)}
                    </Typography>
                  </Link>
                  <button className="redbtn">Watch</button>
                </div>

                {/* {movie.rating > 0 && (
                <Rating
                  sx={{ fontSize: "12px" }}
                  name="read-only"
                  value={movie.rating}
                  precision={0.5}
                  readOnly
                />
              )} */}
              </div>
            </div>
          ))}
        </Slider>
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

export default MovieSlider;
