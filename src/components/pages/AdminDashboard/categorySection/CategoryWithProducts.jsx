import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

const CategoryWithProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getallCategories();
  }, []); // Fetch categories when the component mounts

  const getallCategories = async () => {
    try {
      const authString = localStorage.getItem("auth");
      const auth = JSON.parse(authString);
      const token = auth.token;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/get-category`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    // You can perform additional actions based on the selected category if needed
  };

  return (
    <div>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={selectedCategory}
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
    </div>
  );
};

export default CategoryWithProducts;
