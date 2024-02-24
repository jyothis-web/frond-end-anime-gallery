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

const Product = () => {
  const [products, setProducts] = useState([]);

  //TO GET ALL PRODUCTS
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/product/get-product`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (productID) => {
    console.log(productID);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/product/delete-product/${productID}`
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
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "30px" }}>
        <div style={{ marginLeft: "30px" }}>
          <h1>Admin Dashboard</h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Link to="/Catergory">
              <Button variant="contained">create category</Button>
            </Link>
            <Link to="/CreateProduct">
              <Button variant="contained">create products</Button>
            </Link>
            <Link to="/AdminDashboard">
              <Button variant="contained">Dashborad</Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "60px" }}>
        <h1>Products List</h1>
        <TableContainer component={Paper} sx={{ width: "800px" }}>
          <Table sx={{ Width: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Product tag</TableCell>
                <TableCell>Product Image</TableCell>
                <TableCell>Product rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.newimg > 0 && (
                      <img src="" alt="" style={{ width: "50px" }} />
                    )}
                  </TableCell>
                  {/* {product.newtag} */}
                  <TableCell>
                    {product.image && (
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${product.image.imagePath}`}
                        alt={product.name}
                        style={{ width: "70px" }}
                      />
                    )}
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
                      to={`/UpdateProduct/${product._id}/${encodeURIComponent(
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

export default Product;

// <div style={{ marginTop: "2.3cm" }}>
//          <h3 style={{ marginLeft: "2cm" }}>Audio & Electronics</h3>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignItems: "center",
//             marginBottom: "3cm",

//             gap: "1cm",
//             flexWrap: "wrap",
//           }}
//         >
//           {products.map((product) => (
//             <div className="card">
//               {/* <img src={product.new} alt="" className="new" width={"50px"} />
//               <img src={product.sale} alt="" className="sale" width={"50px"} />
//               {product.newimg > 0 && (
//                 <img src="./images/new.png" alt="" style={{ width: "50px" }} />
//               )}

//               <div className="cartimage">
//                 {product.image && (
//                   <img
//                     src={`${process.env.REACT_APP_BASE_URL}/${product.image.imagePath}`}
//                     alt={product.name}
//                     style={{ width: "200px" }}
//                   />
//                 )}
//               </div>
//               <div>
//                 <Typography fontSize={16} marginY={2.5}>
//                   {product.name}
//                 </Typography>
//               </div>
//               <div className="rating">
//                 {" "}
//                 {product.rating > 0 && (
//                   <Rating
//                     sx={{ fontSize: "12px" }}
//                     name="read-only"
//                     value={product.rating}
//                     readOnly
//                   />
//                 )}
//               </div>
//               <div>
//                 <Typography variant="h6" marginBottom={2} marginTop={4}>
//                   {" "}
//                   ${product.price}/-
//                 </Typography>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   height: "22px",
//                   justifyContent: "space-between",
//                   marginRight: "50px",
//                   cursor: "pointer",
//                 }}
//               ></div>
//             </div>
//           ))}
//         </div>
//       </div>
