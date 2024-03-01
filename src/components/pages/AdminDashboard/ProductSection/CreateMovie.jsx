import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { movies } from "../../../Contex";
import "./Product.css";
//import newtag from '../../../../../public/images/new.png'
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import toast from "react-hot-toast";

const CreateMovie = () => {
  //const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  // const [previewImage, setPreviewImage] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [movieTime, setMovieTime] = useState("");
  const [movieGenres, setMovieGenres] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [catagory, setCatogary] = useState("");
  const { categories, getCategories } = useContext(movies);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // const handleChange = (event) => {
  //   // Extract the value from the event
  //   const selectedCategoryId = event.target.value;

  //   // Check if the category is already selected
  //   if (!categories.includes(selectedCategoryId)) {
  //     // Add the category to the array
  //     setCategories([...categories, selectedCategoryId]);
  //   }
  // };
  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages(selectedImages);


  
    // Create preview image URLs for each selected image
    // const imagePreviews = Array.from(selectedImages).map((image) => {
    //   const reader = new FileReader();
    //   return new Promise((resolve) => {
    //     reader.onloadend = () => {
    //       resolve(reader.result);
    //     };
    //     reader.readAsDataURL(image);
    //   });
    // });
  
    // Update preview images state
    // Promise.all(imagePreviews).then((results) => {
    //   setPreviewImage(results);
    // });
  };
  
  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMovieChange = (e) => {
    setMovieTime(e.target.value);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleMovieGenresChange = (e) => {
    setMovieGenres(e.target.value);
  };

  const handleRatingChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input is a valid number between 1 and 5
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 5) {
      setRating(inputValue);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("movieTime", movieTime);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("MovieGenres", movieGenres);

    selectedCategories.forEach((selectedCategories) => {
      formData.append("categories", selectedCategories);
    });
   // Append each image file to the "image" array
   Array.from(images).forEach((image) => {
    formData.append('image', image);
  });

  if (video) {
    formData.append('video', video);
  }

    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/create-Movie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful response
      console.log(response.data);
      toast.success(response.data.message);
      setErrorMessage("");
    } catch (error) {
      // Handle error response
      console.error(error);
      setErrorMessage("Error creating product. Please try again.");
      //setErrorMessage("Error creating product. Please try again.");
    }
  };
  return (
    <div className="create-product">
      <h2>Create New Movie</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div style={{ marginLeft: "30px", maxWidth: "300px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl style={{ marginBottom: "25px" }}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
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
                  <Checkbox checked={selectedCategories.includes(c._id)} />
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
            required
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
          />
        </label>
          <label style={{ marginBottom: "25px" }}>
            Movie Name:
            <input
              placeholder=" Movie name"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "25px" }}>
            Movie Description:
            <textarea
              placeholder=" Movie Description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", height: "100px", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            movie year:
            <input
              placeholder="movie realesed year"
              type="text"
              required
              value={year}
              onChange={handleYearChange}
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
              required
              onChange={handleMovieChange}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Rating:
            <input
              placeholder="product Rating between 1 & 5"
              type="text"
              required
              value={rating}
              onChange={handleRatingChange}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Movie Generes:
            <input
              placeholder="which genere"
              type="text"
              required
              value={movieGenres}
              onChange={handleMovieGenresChange}
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
            Create Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
