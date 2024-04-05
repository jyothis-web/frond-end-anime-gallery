// import axios from "axios";
// import React, { createContext, useEffect, useState } from "react";


// const Contex = ({ children }) => {
//   const [cartitem, setCartitem] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [auth, setAuth] = useState({ user: null, token: "" });
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState({
//     keyword: "",
//     result: [],
//   });

//   useEffect(() => {
//     const storedAuth = localStorage.getItem("auth");
//     console.log(storedAuth);
//     if (storedAuth) {
//       try {
//         const parsedAuth = JSON.parse(storedAuth);

//         // Check if the parsed object has user and token properties
//         if (parsedAuth && parsedAuth.user && parsedAuth.token) {
//           setAuth(parsedAuth);
//         } else {
//           console.error(
//             "Stored auth data is missing user or token properties:",
//             parsedAuth
//           );
//         }
//       } catch (error) {
//         console.error("Error parsing stored auth data:", error);
//       }
//     }
//   }, []);

  
//   // for  short the text
//   const shortText = (text, maxLength) => {
//     return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
//   };

//   //for categories
//     const getCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/admin/get-category`
//         );
//         console.log(response.data);
//         setCategories(response.data.categories);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };

  

//   //for products
//   const getMovies = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/admin/get-Movie`
//       );
//       setProducts(response.data.movies);
//        console.log("product",response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <movies.Provider
//         value={{
//           cartitem,
//           wishlist,
//           auth,
//           products,
//           setCartitem,
//           setWishlist,
//           setProducts,
//           getMovies,
//           setAuth,
//           categories,
//           setCategories,
//           getCategories,
//           search,
//           setSearch,
//           loading,
//           shortText
//         }}
//       >
//         {children}
//       </movies.Provider>
//     </div>
//   );
// };

// export default Contex;
