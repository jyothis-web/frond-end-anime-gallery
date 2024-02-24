import { Button, Rating, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import { cart } from "../Contex";
import img from "../images/new.png";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Prices } from "./filterProducts/Prices";
import { Radio } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const {
    handleaddproduct,
    wishlistaddproduct,
    //WishlistcartitemRemove,
    getProducts,
    products,
    getCategories,
    categories,
    setProducts,
    cartitem,
    wishlist,
    auth,
  } = useContext(cart);
  console.log("auth", auth);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  //for grting acategories
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
  //for filter
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getProducts();
    }
    // eslint-disable-next-line
  }, [checked, radio]);
  //cartbuton
  const Cartbtn = styled(Button)({
    width: "90px",
    fontSize: "10px",
    padding: "2px",
    color: "red",
    border: "1px solid red",
    "&:hover": { color: "white", backgroundColor: "red" },
  });

  //for check function of category
  const handlefilter = (value, categoryId) => {
    let all = [...checked];
    if (value) {
      all.push(categoryId);
    } else {
      all = all.filter((c) => c !== categoryId);
    }
    setChecked(all);
  };
  // for filtering the product
  const filterProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/product/filter-product`,
        { checked, radio }
        // {
        //   headers: {
        //     Authorization: `${token}`,
        //   },
        // }
      );
      console.log(response.data.products);
      setProducts(response.data.products);
      if (response.data.products.length === 0) {
        toast.success("no item found");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      if (error.response) {
        console.error("Error Response:", error.response.data);
      }
    }
  };

  const isProductInCart = (productId) => {
    return cartitem.some((product) => product._id === productId);
  };

  const isWishlist = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  return (
    <div style={{ marginTop: "2.3cm", display: "flex",width:"100%" }}>
      <div>
        <div>
          <h3>categories</h3>
          {categories.map((c) => (
            <div key={c._id} className="filter-css">
              <input
                type="checkbox"
                id={`checkbox-${c._id}`}
                value={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "blue",
                }}
              />
              <label
                style={{ marginTop: "-5px" }}
                htmlFor={`checkbox-${c._id}`}
              >
                {c.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>filter by price</h3>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((price) => (
              <div key={price._id}>
                {" "}
                <Radio value={price.array}>{price.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reset filter
          </Button>
        </div>
      </div>

      {/* {JSON.stringify(radio,null,4)} */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "3cm",
          gap: ".3cm",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <div className="card" key={product._id}>
            <div>
              {product.newimg > 0 && (
                <img src={img} alt="" style={{ width: "50px" }} />
              )}
            </div>

            <div
              className="cartimage"
              // onMouseEnter={() => setHoveredProduct(product)}
              // onMouseLeave={() => setHoveredProduct(null)}
            >
              <div>
                <Link to={`/ProductDescription/${product._id}`}>
                  {product.image && (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${product.image.imagePath}`}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "290px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link className="linkfont" to="/ProductDescription">
                <div>
                  <Typography sx={{ height: "55px", width: "210px" }}>
                    {product.name}
                  </Typography>
                </div>
              </Link>
              {product.rating > 0 && (
                <Rating
                  sx={{ fontSize: "12px" }}
                  name="read-only"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
              )}
              <div>
                <Typography variant="h6" marginBottom={2} marginTop={2}>
                  {" "}
                  ${product.price}/-
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "22px",
                justifyContent: "space-between",
                marginRight: "50px",
                cursor: "pointer",
              }}
            >
              {/* {isProductInCart(product._id) ? (
                <Cartbtn style={{ color: "white", backgroundColor: "red" }}>
                  Added to Cart
                </Cartbtn>
              ) : (
                <Cartbtn onClick={() => handleaddproduct(product)}>
                  Add to Cart
                </Cartbtn>
              )} */}
              {auth.user ? (
                isProductInCart(product._id) ? (
                  <Cartbtn style={{ color: "white", backgroundColor: "red" }}>
                    Added to Cart
                  </Cartbtn>
                ) : (
                  <Cartbtn onClick={() => handleaddproduct(product)}>
                    Add to Cart
                  </Cartbtn>
                )
              ) : (
                <Cartbtn onClick={() => alert("Please login")}>
                  Add to Cart
                </Cartbtn>
              )}

              <div>
                <IconButton
                  onClick={() => {
                    auth.user
                      ? wishlistaddproduct(product)
                      : alert("Please login to add to wishlist");
                  }}
                >
                  {auth.user ? (
                    isWishlist(product._id) ? (
                      <Favorite style={{ color: "red", fontSize: "18px" }} />
                    ) : (
                      <FavoriteBorder
                        style={{ color: "black", fontSize: "19px" }}
                      />
                    )
                  ) : (
                    <FavoriteBorder
                      style={{ color: "black", fontSize: "19px" }}
                    />
                  )}
                </IconButton>
                {/* <FavoriteBorderIcon 
                onClick={() => {
                  wishlistaddproduct(p);
                }}
                sx={{ "&:hover": { color: "red" }, fontSize: "18px", }}
              /> */}
              </div>
              <SyncIcon
                sx={{ "&:hover": { color: "red" }, fontSize: "19px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
