import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { cart } from "../../../Contex";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
//import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import EditAlertDialog from "./EditCategoryDailog";
import { Link } from "react-router-dom";

const Catergory = ({ category }) => {
  //const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);

  const { categories, getCategories } = useContext(cart);
  // console.log(localStorage.getItem("auth"));
  const authString = localStorage.getItem("auth");
  // Parse the JSON string to an object
  const auth = JSON.parse(authString);
  // Access the token property
  const token = auth.token;



  useEffect(() => {
    getCategories();
  },);

  //for create new category
  const handlenewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/create-category`,
        { name },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
        // Add headers or other configurations if needed
      );
      console.log(response.data);
      console.log(`${response.data.category.name} is created`);
      toast.success(`${response.data.category.name} is created`);
    } catch (error) {
      console.log(error);
    }
  };
  //for delete category
  const handleDeleteSubmit = async (categoryID) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/delete-category/${categoryID}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success(`This category is deleted`);
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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "30px" }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {auth.user?.name ? `Welcome ${auth.user.name}` : ""}
          <Link to="/Catergory">
            <Button variant="contained">create category</Button>
          </Link>
          <Link to="/Product">
            <Button variant="contained">create products</Button>
          </Link>
          <Link to="/AdminDashboard">
            <Button variant="contained">Dashborad</Button>
          </Link>
        </div>
      </div>
      <div style={{ marginLeft: "100px" }}>
        <h1>create new categories</h1>
        <form onSubmit={handlenewSubmit}>
          <TextField
            sx={{ marginBottom: "20px", marginRight: "20px" }}
            variant="standard"
            type="text"
            placeholder="enter new category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="outlined" type="submit">
            submit
          </Button>
        </form>
        <TableContainer component={Paper} sx={{ width: "600px" }}>
          <Table sx={{ Width: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> category name</TableCell>
                <TableCell> actions</TableCell>
                {/* <TableCell> actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((c) => (
                <TableRow>
                  <TableCell component="th" scope="row" key={c._id}>
                    {c.name}
                  </TableCell>
                  <TableCell key={c.id}>
                    <EditAlertDialog
                      categoryName={c.name}
                      categoryID={c._id}
                      setName={setName}
                    />
                  </TableCell>
                  <TableCell key={c.id}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSubmit(c._id)}
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

export default Catergory;
