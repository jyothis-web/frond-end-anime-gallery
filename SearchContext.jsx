// import axios from "axios";
// import React, { createContext, useEffect, useState } from "react";

// export const cart = createContext();
// const Contex = ({ children }) => {
//   const [cartitem, setCartitem] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [auth, setAuth] = useState({ user: null, token: "" });
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);


//   // useEffect(() => {
//   //  const data = localStorage.getItem('auth')
//   //  if(data){
//   //   const parseData = JSON.parse(data)
//   //   setAuth({...auth, user:parseData.user, token:parseData.token})
//   //  }
//   // }, [auth])
//   // const authString = localStorage.getItem("auth");
//   // // Parse the JSON string to an object
//   // const authtoken = JSON.parse(authString);
//   // // Access the token property
//   // const token = authtoken.token;
  

//   //to add product to cart
//   const handleaddproduct = (Product) => {
//     const productIndex = cartitem.findIndex((item) => item.id === Product.id);
//     if (productIndex !== -1) {
//       const UpdatedCart = [...cartitem];
//       UpdatedCart[productIndex].quantity += 1;
//       setCartitem(UpdatedCart);
//     } else {
//       setCartitem([...cartitem, { ...Product, quantity: 1 }]);
//     }
//   };

//   //to add product to wishlist
//   const wishlistaddproduct = (Product) => {
//     const productIndex = wishlist.findIndex((item) => item.id === Product.id);
//     if (productIndex !== -1) {
//       const UpdatedWishlist = [...wishlist];
//       UpdatedWishlist.splice(productIndex, 1);
//       setWishlist(UpdatedWishlist);
//     } else {
//       setWishlist([...wishlist, Product]);
//     }
//   };

//   //to remove product from cart
//   const handleremoveproduct = (product) => {
//     const productExist = cartitem.find((item) => item.id === product.id);
//     if (productExist.quantity === 1) {
//       setCartitem(cartitem.filter((item) => item.id !== product.id));
//     } else {
//       setCartitem(
//         cartitem.map((item) =>
//           item.id === product.id
//             ? { ...productExist, quantity: productExist.quantity - 1 }
//             : item
//         )
//       );
//     }
//   };

//   //remove single product from cart
//   const SingleProductRemove = (product) => {
//     const RemoveProduct = cartitem.filter((item) => item.id !== product.id);
//     setCartitem(RemoveProduct);
//   };

//   //remove single product from cart
//   const WishlistProductRemove = (product) => {
//     const WishlistRemoveProduct = wishlist.filter(
//       (item) => item.id !== product.id
//     );
//     setWishlist(WishlistRemoveProduct);
//   };
//   //to change the cart button when its clicked
//   const isProductInCart = (productId) => {
//     return cartitem.some((item) => item.id === productId);
//   };

//   const isWishlist = (productId) => {
//     return wishlist.some((item) => item.id === productId);
//   };

//   const WishlistcartitemRemove = (productId) => {
//     const WishlistRemovecartitem = wishlist.filter(
//       (item) => item.id !== productId
//     );
//     setWishlist(WishlistRemovecartitem);
//   };


//   //for categories
//   const getCategories = async () => {
//     try {
//       // Log the token to the console
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/admin/get-category`,
//         {
//           // headers: {
//           //   Authorization: `${token}`,
//           // },
//         }
//       );
//       //   console.log(response.data);
//       //   console.log(response.data.name);
//       setCategories(response.data.categories); // Assuming there's a 'categories' property in the response

//       //   if (data.success) {
//       //     setCategories(data.categories); // Assuming there's a 'categories' property in the response
//       //     console.log(data.categories);
//       //   }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //for products
//   const getProducts = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/admin/product/get-product`
//       );
//       setProducts(response.data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <cart.Provider
//         value={{
//           cartitem,
//           wishlist,
//           auth,
//           products,
//           setProducts,
//           getProducts,
//           setAuth,
//           handleaddproduct,
//           SingleProductRemove,
//           handleremoveproduct,
//           wishlistaddproduct,
//           WishlistProductRemove,
//           isProductInCart,
//           isWishlist,
//           WishlistcartitemRemove,
//           //category
//           categories, 
//           setCategories,
//           getCategories,
//         }}
//       >
//         {children}
//       </cart.Provider>
//     </div>
//   );
// };

// export default Contex;
