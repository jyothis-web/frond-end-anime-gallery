import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cart } from "../../../Contex";
import "./Product.css";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId, productName } = useParams();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedRating, setEditedRating] = useState("");
  const [editedNewtag, setEditedNewtag] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const { categories, getCategories } = useContext(cart);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
console.log(category);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    console.log("new image",selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/product/get-singleproduct/${productId}`
        );

        const product = response.data.product;

        setEditedName(product.name);
        setEditedPrice(product.price);
        setEditedRating(product.rating);
        setEditedNewtag(product.newtag);
        setCategory(product.category);
        setImage(product.image.imagePath)
        console.log("old image",product.image.imagePath);

      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
    getCategories(); // Assuming you need to fetch categories for the dropdown
  }, );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editedName);
    formData.append("price", editedPrice);
    formData.append("rating", editedRating);
    formData.append("newtag", editedNewtag);
    //formData.append("category", category);
    formData.append("file", image); // Add the image to FormData

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/product/update-product/${productId}`,
        formData
      );

      if (response.data.product && response.data.product.image) {
        console.log("Uploaded file information:", response.data.product.image);
      }
      console.log(response.data);
     
      toast.success(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error updating product. Please try again.");
    }
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div style={{ marginLeft: "30px", maxWidth: "300px" }}>
        <form onSubmit={handleSubmit}>
          <h4>The selected product is "{productName}"</h4>
          <FormControl style={{ marginBottom: "25px" }}>
            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={categories}
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
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Price:
            <input
              placeholder=" product price"
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Rating:
            <input
              placeholder="product Rating between 1 & 5"
              type="number"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />

          <label style={{ marginBottom: "25px" }}>
            Tag Image:
            <input
              placeholder="To show tag image, give a number"
              type="number"
              value={editedNewtag}
              onChange={(e) => setEditedNewtag(e.target.value)}
              style={{ width: "100%", marginBottom: "25px" }}
            />
          </label>
          <br />
          <Button
            variant="outlined"
            type="submit"
            style={{ width: "100%", marginBottom: "25px" }}
          >
            Update Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;



// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { cart } from "../../../Contex";
// import "./Product.css";
// import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const { productId, productName } = useParams();
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [editedName, setEditedName] = useState("");
//   const [editedPrice, setEditedPrice] = useState("");
//   const [editedRating, setEditedRating] = useState("");
//   const [editedNewtag, setEditedNewtag] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [category, setCategory] = useState("");
//   const { categories, getCategories } = useContext(cart);

//   const handleChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewImage(reader.result);
//     };
//     if (selectedImage) {
//       reader.readAsDataURL(selectedImage);
//     }
//   };

//   useEffect(() => {
//     const getSingleProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/admin/product/get-singleproduct/${productId}`
//         );

//         const product = response.data.product;

//         setEditedName(product.name);
//         setEditedPrice(product.price);
//         setEditedRating(product.rating);
//         setEditedNewtag(product.newtag);
//         setCategory(product.category);

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getSingleProduct();
//     getCategories(); // Assuming you need to fetch categories for the dropdown

//   }, [productId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requestData = {
//       name: editedName,
//       price: editedPrice,
//       rating: editedRating,
//       newtag: editedNewtag,
//       category: category,
//     };

//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_BASE_URL}/admin/product/update-product/${productId}`,
//         requestData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response.data);
//       toast.success(response.data.message);
//       setErrorMessage("");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Error updating product. Please try again.");
//     }
//   };

//   return (
//     <div className="edit-product">
//       <h2>Edit Product</h2>
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       <div style={{ marginLeft: "30px", maxWidth: "300px" }}>
//         <form onSubmit={handleSubmit}>
//           <h4>The selected product is "{productName}"</h4>
//           <FormControl style={{ marginBottom: "25px" }}>
//             <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               value={categories}
//               label="Select Category"
//               onChange={handleChange}
//               color="secondary"
//               sx={{
//                 border: "none",
//                 outline: "none",
//                 width: "320px",
//                 borderRadius: "5px",
//                 height: "44px",
//                 color: "black",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//             >
//               {categories.map((c) => (
//                 <MenuItem key={c._id} value={c._id}>
//                   {c.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <br />
//           <label style={{ marginBottom: "25px" }}>
//             Image:
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ marginBottom: "25px" }}
//             />
//           </label>
//           {previewImage && (
//             <div>
//               <p>Preview:</p>
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 style={{ maxWidth: "100%", maxHeight: "200px" }}
//               />
//             </div>
//           )}
//           <br />

//           <label style={{ marginBottom: "25px" }}>
//             Name:
//             <input
//               placeholder=" product name"
//               type="text"
//               value={editedName}
//               onChange={(e) => setEditedName(e.target.value)}
//               style={{ width: "100%", marginBottom: "25px" }}
//             />
//           </label>
//           <br />

//           <label style={{ marginBottom: "25px" }}>
//             Price:
//             <input
//               placeholder=" product price"
//               type="number"
//               value={editedPrice}
//               onChange={(e) => setEditedPrice(e.target.value)}
//               style={{ width: "100%", marginBottom: "25px" }}
//             />
//           </label>
//           <br />

//           <label style={{ marginBottom: "25px" }}>
//             Rating:
//             <input
//               placeholder="product Rating between 1 & 5"
//               type="number"
//               value={editedRating}
//               onChange={(e) => setEditedRating(e.target.value)}
//               style={{ width: "100%", marginBottom: "25px" }}
//             />
//           </label>
//           <br />

//           <label style={{ marginBottom: "25px" }}>
//             Tag Image:
//             <input
//               placeholder="To show tag image, give a number"
//               type="number"
//               value={editedNewtag}
//               onChange={(e) => setEditedNewtag(e.target.value)}
//               style={{ width: "100%", marginBottom: "25px" }}
//             />
//           </label>
//           <br />
//           <Button
//             variant="outlined"
//             type="submit"
//             style={{ width: "100%", marginBottom: "25px" }}
//           >
//             Create Product
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;
