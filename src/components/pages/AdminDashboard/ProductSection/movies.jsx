import {
  Button,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  // Paper,
  // Rating,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  //Typography,
} from "@mui/material";
// import img from '../'
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Movies = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //TO GET ALL PRODUCTS
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/get-Movie`
      );
      setProducts(response.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (productID) => {
    console.log(productID);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/delete-movie/${productID}`
        // {
        //   headers: {
        //     Authorization: `${token}`,
        //   },
        // }
      );
      console.log(response.data);
      toast.success(`This product is deleted`);
      // Optionally, you may want to refresh the categories after deletion
      // Call your getCategories function or any other logic to refresh the category list
    } catch (error) {
      console.error("Delete Error:", error);
      // Check the error response to get more information
      if (error.response) {
        console.error("Error Response:", error.response.data);
      }
      toast.error("Error deleting category");
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);
  console.log(products);
  //to search movies
  const filteredMovies = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "30px" }}>
        <div style={{ marginLeft: "30px" }}>
          <h1>Admin Dashboard</h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Link to="/Catergory">
              <Button variant="contained">movie category</Button>
            </Link>
            <Link to="/CreateMovie">
              <Button variant="contained">create movies</Button>
            </Link>
            <Link to="/AdminDashboard">
              <Button variant="contained">Dashborad</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <TextField
          type="text"
          placeholder="Search by movie name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>movie Name</TableCell>
                <TableCell sx={{ width: "200px" }}>movie description</TableCell>
                <TableCell>movie duration</TableCell>
                <TableCell>movie realesed year</TableCell>
                <TableCell> Movie Genres</TableCell>
                <TableCell>movie Image</TableCell>
                <TableCell>movie rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMovies.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell style={{ width: "200px !important" }}>
                    {product.description}
                  </TableCell>
                  <TableCell>{product.movieTime}</TableCell>
                  <TableCell>{product.year}</TableCell>
                  <TableCell>{product.movieGenres}</TableCell>
                  <TableCell>
                    {product.image &&
                      product.image.map((image, index) => (
                        <img
                          key={index}
                          src={`${process.env.REACT_APP_BASE_URL}/${image.imagePath}`}
                          alt={`${product.name}-${index}`}
                          style={{
                            width: "70px",
                            height: "auto",
                            marginRight: "10px",
                          }}
                        />
                      ))}
                  </TableCell>

                  <TableCell>
                    {product.rating > 0 && (
                      <Rating
                        sx={{ fontSize: "12px" }}
                        name="read-only"
                        value={product.rating}
                        precision={0.5}
                        readOnly
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/UpdateMovie/${product._id}/${encodeURIComponent(
                        product.name
                      )}`}
                    >
                      <Button variant="contained">update</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSubmit(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Movies;
