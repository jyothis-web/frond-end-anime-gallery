import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cart } from "../../../Contex";
import"./Product.css"
//import newtag from '../../../../../public/images/new.png'
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";

const CreateProduct = () => {
  //const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
   const [newtag, setNewtag] = useState(null);
   const [rating, setRating] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription ] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [catagory, setCatogary] = useState("");
  const { categories, getCategories } = useContext(cart);

  const handleChange = (event) => {
    // Extract the value from the event
    const selectedCategoryId = event.target.value;

    // Set the category in the state
    setCatogary(selectedCategoryId);
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create a preview image URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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
  },);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData to handle file upload
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("description",description);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("newtag", newtag);
    formData.append("category", catagory);
    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/product/create-product`,
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
    <h2>Create New Product</h2>
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    <div style={{marginLeft:"30px",maxWidth:"300px" }}>
      <form onSubmit={handleSubmit}>
        <FormControl  style={{ marginBottom: "25px"}}>
          <InputLabel  id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={catagory}
            label="Select Category"
            onChange={handleChange}
            color="secondary"
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
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> 
        <br />
        <label style={{ marginBottom: "25px" }}>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
             style={{ marginBottom: "25px" }}
          />
        </label>
        {previewImage && (
          <div>
            <p>Preview:</p>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <br />
  
        <label style={{ marginBottom: "25px" }}>
          Name:
          <input
          placeholder=" product name"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            style={{ width: "100%",marginBottom: "25px" }}
          />
        </label>
        <br />
        <label style={{ marginBottom: "25px" }}>
          Description:
          <textarea
          placeholder=" product Description"
            type="text"
            value={description}
            onChange={(e)=> setDescription (e.target.value)}
            required
            style={{ width: "100%",height:"100px",marginBottom: "25px" }}
          />
        </label>
        <br />
  
        <label style={{ marginBottom: "25px" }}>
          Price:
          <input
             placeholder=" product price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
            style={{ width: "100%",marginBottom: "25px" }}
          />
        </label>
        <br />
  
        <label  style={{ marginBottom: "25px" }}>
          Rating:
          <input
            placeholder="product Rating between 1 & 5"
            type="text"
            value={rating}
            onChange={handleRatingChange}
            required
            style={{ width: "100%",marginBottom: "25px" }}
          />
        </label>
        <br />
  
        <label  style={{ marginBottom: "25px" }}>
          Tag Image:
          <input
            placeholder="To show tag image, give a number"
            type="number"
            value={newtag}
            onChange={(e) => setNewtag(e.target.value)}
            // required
            style={{ width: "100%",marginBottom: "25px" }}
          />
        </label>
        <br />   
        <Button variant="outlined" type="submit" style={{ width: "100%",marginBottom: "25px" }}>
          Create Product
        </Button>
      </form>
    </div>
  </div>
  );
};

export default CreateProduct;
