import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import { cart } from "../Contex";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Typography } from "antd";
import { Button, Rating } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import UserNavbar from "../Header/UserNavbar";

const SearchPage = () => {
  const {
    handleaddproduct,
    wishlistaddproduct,
    isProductInCart,
    wishlist,
    WishlistcartitemRemove,
    search,
  } = useContext(cart);
  const Cartbtn = styled(Button)({
    width: "90px",
    fontSize: "10px",
    padding: "2px",
    color: "red",
    border: "1px solid red",
    "&:hover": { color: "white", backgroundColor: "red" },
  });
  const isWishlist = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };
  return (
    <div>
      <UserNavbar/>
      <h3>Search results</h3>
      <div style={{  display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "3cm",
          gap: ".5cm",
          flexWrap: "wrap", }}>
        {search.result.map((product) => (
          <div className="card" key={product._id}>
            <div>
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
              {isProductInCart(product.id) ? (
                <Cartbtn>Added to Cart</Cartbtn>
              ) : (
                <Cartbtn onClick={() => handleaddproduct(product)}>
                  Add to Cart
                </Cartbtn>
              )}
              {/* <Cartbtn
                onClick={() => {
                  handleaddproduct(p);
                }}
              >
           add to cart
              </Cartbtn>{" "} */}
              <div>
                <IconButton
                  onClick={() => {
                    wishlistaddproduct(product);
                  }}
                >
                  {isWishlist(product.id) ? (
                    <button>
                      <Favorite style={{ color: "red", fontSize: "18px" }} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        WishlistcartitemRemove(product);
                      }}
                    >
                      {" "}
                      <FavoriteBorder
                        style={{ color: "black", fontSize: "19px" }}
                      />
                    </button>
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
      <h6>
        {search?.result.length < 1
          ? "No products found"
          : `Found ${search?.result.length} products`}
      </h6>
    </div>
  );
};

export default SearchPage;
