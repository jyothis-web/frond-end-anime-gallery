import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { movies } from "../../../Contex";
import "./Product.css";
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
//import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { movieId, productName } = useParams();
  const { categories, getCategories } = useContext(movies);
  const [images, setImages] = useState(null);
  const [video, setVideo] = useState(null);
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [movieTime, setMovieTime] = useState("");
  const [movieGenres, setMovieGenres] = useState("");
  const [trailer, setTrailer] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // const handleChange = (event) => {
  //   setSelectedCategories(event.target.value);
  // };
  //  console.log(selectedCategories);
  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages(selectedImages);
  };


  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/get-singlemovie/${movieId}`
        );

        const movie = response.data.movie;
        setName(movie.name);
        setYear(movie.year);
        setRating(movie.rating);
        setDescription(movie.description);
        setMovieTime(movie.movieTime);
        setMovieGenres(movie.movieGenres);
        setSelectedCategories(
          Array.isArray(movie.selectedCategories)
            ? movie.selectedCategories
            : [movie.selectedCategories]
        );
        // setImage(movie.image?.imagePath);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [movieId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", movieId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("movieTime", movieTime);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("movieGenres", movieGenres);
    formData.append("trailer", trailer);
    formData.append("video", video);
    Array.from(images).forEach((image, index) => {
      formData.append("image", image);
    });
  
    console.log("Images Array:", images);


    selectedCategories
      .filter((categoryId) => categoryId !== undefined)
      .forEach((categoryId) => {
        formData.append("categories", categoryId);
      });
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/update-Movie/${movieId}`,
        formData
      );

      if (response.data.movie && response.data.movie.image) {
        console.log("Uploaded file information:", response.data.movie.image);
      }
      console.log("data", response.data);
      setShowAlert(true);
      // toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="edit-product">
      <h2>Edit Movie</h2>
      <div style={{ marginLeft: "30px", maxWidth: "300px" }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h4>The selected Movie is "{productName}"</h4>
          <FormControl style={{ marginBottom: "25px" }}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(
                  Array.isArray(e.target.value) ? e.target.value : []
                )
              }
              label="Select Category"
              multiple
              renderValue={(selected) =>
                selected
                  .map((categoryId) => {
                    const selectedCategory = categories.find(
                      (c) => c._id === categoryId
                    );
                    return selectedCategory ? selectedCategory.name : "";
                  })
                  .join(", ")
              }
              sx={{
                border: "none",
                outline: "none",
                width: "320px",
                borderRadius: "5px",
                height: "44px",
                color: "black",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  <Checkbox
                    checked={
                      Array.isArray(selectedCategories) &&
                      selectedCategories.includes(c._id)
                    }
                  />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />

          <label style={{ marginBottom: "25px" }}>
            movie poster:
            <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          </label>
          {/* {previewImage && (
            <div>
              <p>Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )} */}
          <br />

          <label>
            Movie Video:
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Movie Name:
            <input
              placeholder=" movie name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "25px" }}>
            Movie trailer:
            <input
              placeholder=" movie trailer "
              type="text"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "25px" }}>
            Movie Description:
            <textarea
              placeholder=" Movie Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", height: "100px", marginBottom: "25px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "25px" }}>
            movie realesed year:
            <input
              placeholder=" product price"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Rating:
            <input
              placeholder="product Rating between 1 & 5"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            movie duration:
            <input
              placeholder="movie duration"
              type="text"
              value={movieTime}
              onChange={(e) => setMovieTime(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "25px" }}>
            Movie Generes:
            <input
              placeholder="which genere"
              type="text"
              value={movieGenres}
              onChange={(e) => setMovieGenres(e.target.value)}
              // required
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <Button
            variant="outlined"
            type="submit"
            style={{ width: "100%", marginBottom: "25px" }}
          >
            Update Movie
          </Button>
        </form>
        {showAlert && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Movie updated
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UpdateMovie;
