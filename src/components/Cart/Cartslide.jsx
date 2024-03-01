import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import List from "@mui/material/List";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { movies } from "../Contex";
import { Divider, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import "./cartslide.css";

export default function SwipeableTemporaryDrawer() {
    //usecontext for funtions
    const {
      cartitem,
      // products,
      SingleProductRemove,
      handleaddproduct,
      handleremoveproduct,
      setCartitem,
      auth
    } = useContext(movies);
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    // Access auth.user._id directly
    const userId = auth.user ? auth.user._id : null;
  
    // Retrieve cart data from localStorage using the user ID
    let existingcartitem = localStorage.getItem(`cart_${userId}`);
    
    if (existingcartitem) {
      // Set the cart item state with the retrieved data
      setCartitem(JSON.parse(existingcartitem));
    }
  
    console.log("existingcartitem", existingcartitem);
  }, [auth.user,setCartitem]);

  // useEffect(() => {
  //   localStorage.getItem('auth');
  //   const userId = auth.user ? auth.user._id : null;
  //   let existingcartitem = localStorage.getItem(`cart_${userId}`);
  //   if (existingcartitem) setCartitem(JSON.parse(existingcartitem));
  //   console.log("existingcartitem",existingcartitem);
  // }, []);

  
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "310px" }}
      role="presentation"
      // onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <p style={{  marginLeft: "1cm",marginTop:"5px", color: "GrayText", fontSize: "14px" }}>
          My Shopping Bag ( {cartitem.length === 0 ? "0" : cartitem.length} )
        </p>
        <button onClick={toggleDrawer(anchor, false)}>
          <CloseIcon
            sx={{
              color: "GrayText",
              position: "absolute",
              right: "15px",
              top: "14px",
            }}
          />
        </button>
        <Divider />
      
        {cartitem.map((product) => (
          <div key={product.id} style={{ Padding: "1cm" }}>
             {cartitem.length === 0 && <div style={{margin:"20px"}}>Your cart is empty</div>}
            <div className="cartcard">
              <div>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${product.image.imagePath}`}
                  alt=""
                  width={"70PX"}
                  height={"auto"}
                />
              </div>
              <div>
                {" "}
                <p className="cartname">{product.name}</p>
                <div className="incremenntbtn">
                  <button
                    onClick={() => {
                      handleaddproduct(product);
                    }}
                  >
                    <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  </button>
                  <p
                    style={{ fontSize: "14px", color: "black", margin: "0px" }}
                  >
                    {product.quantity}
                  </p>
                  <button
                    onClick={() => {
                      handleremoveproduct(product);
                    }}
                  >
                    <RemoveOutlinedIcon sx={{ fontSize: "16px" }} />
                  </button>
                </div>
              </div>
              <div>
                <IconButton
                  sx={{
                    height: "min-content",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  onClick={() => {
                    SingleProductRemove(product);
                  }}
                >
                  {" "}
                  <DeleteIcon />
                </IconButton>
                <p style={{ fontSize: "12px",marginTop:"8px" }}>
                  $ {subtotal(product)}.00
                </p>{" "}
              </div>
            </div>
          </div>
        ))}
        <Divider />
        <Typography variant="body2" color={"GrayText"}>
          {cartitem.length >= 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "15PX 8PX",
              }}
            >
              {" "}
              <div>Grand Total</div> <div>$ {totalPrice}.00</div>
            </div>
          )}
        </Typography>
        <Box margin={3}>
        {cartitem.length === 0 && <div> Your cart is currently empty</div>}</Box>
        <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
          width={"290px"}
          height={"40px"}
          marginX={"10px"}
          
          sx={{ backgroundColor: "lightblue",textAlign:"center" }}
        >
          {" "}
          <LocalShippingOutlinedIcon/> <p style={{fontSize:"14px",marginLeft:"10px"}}>Free samples waiting here</p> 
        </Box>
      </List>
    </Box>
  );



  //to find the total price of cart
  const totalPrice = cartitem.reduce(
    (price, product) => price + product.quantity * product.price,
    0
  );

  //to find the subtotal of cart
  const subtotal = (product) => {
    return product.price * product.quantity;
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
          style={{fontSize: "0px",padding:"0px"}}
            onClick={toggleDrawer(anchor, true)}
          >
            {" "}
            <ShoppingCartIcon
              sx={{
                color: "white",
                // fontSize: "30px",
                //  marginLeft: "20PX",
              }}
            >
              {anchor}
            </ShoppingCartIcon>
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            transitionDuration={600}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
