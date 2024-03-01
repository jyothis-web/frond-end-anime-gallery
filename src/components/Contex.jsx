import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const movies = createContext();
const Contex = ({ children }) => {
  const [cartitem, setCartitem] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    console.log(storedAuth);
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);

        // Check if the parsed object has user and token properties
        if (parsedAuth && parsedAuth.user && parsedAuth.token) {
          setAuth(parsedAuth);
        } else {
          console.error(
            "Stored auth data is missing user or token properties:",
            parsedAuth
          );
        }
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
      }
    }
  }, []);

  

  
  //to add product to wishlist
  const wishlistaddproduct = (product) => {
    setWishlist((prevWishlist) => {
      const userId = auth.user ? auth.user._id : null;
      console.log(userId);
      const storedWishlist = localStorage.getItem(`wishlist_${userId}`);

      // Parse the existing wishlist data
      const existingWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      const productIndex = existingWishlist.findIndex(
        (item) => String(item._id) === String(product._id)
      );
      console.log("Product:", product);
      // If the product is already in the wishlist, update its quantity or other properties
      if (productIndex !== -1) {
        const updatedWishlist = [...existingWishlist];
        // You can add logic here to update properties of the product in the wishlist
        // Example: updatedWishlist[productIndex].quantity += 1;

        // Save to localStorage
        localStorage.setItem(
          `wishlist_${userId}`,
          JSON.stringify(updatedWishlist)
        );

        return updatedWishlist;
      } else {
        // If the product is not in the wishlist, add it
        const newProduct = { ...product, quantity: 1 }; // You can customize this based on your wishlist structure
        const updatedWishlist = [...existingWishlist, newProduct];

        // Save the updated wishlist to localStorage
        localStorage.setItem(
          `wishlist_${userId}`,
          JSON.stringify(updatedWishlist)
        );

        return updatedWishlist;
      }
    });
  };


  //remove single product from cart
  const WishlistProductRemove = (product) => {
      setWishlist((prevWishlist) => {
        // Check if user is authenticated and has a user ID
        const userId = auth.user ? auth.user._id : null;
    
        // Get the existing wishlist data from localStorage
        const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
    
        // Parse the existing wishlist data
        const existingWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    
        // Find the product in the existing wishlist
        const productIndex = existingWishlist.findIndex(
          (item) => String(item._id) === String(product._id)
        );
    
        if (productIndex !== -1) {
          // If the product is found in the wishlist, remove it
          const updatedWishlist = [...existingWishlist];
          updatedWishlist.splice(productIndex, 1);
    
          // Save the updated wishlist to localStorage
          localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
    
          return updatedWishlist;
        } else {
          // If the product is not found in the wishlist, return the existing wishlist
          return prevWishlist;
        }
      });
    };
    


  const WishlistcartitemRemove = (product) => {
    const userId = auth.user ? auth.user._id : null;
    const WishlistRemovecartitem = wishlist.filter(
      (item) => item._id !== product._id
    );
    setWishlist(WishlistRemovecartitem);
    localStorage.setItem( `wishlist_${userId}`, JSON.stringify(WishlistRemovecartitem));
  };

  //for categories
  const getCategories = async () => {
    try {
      // Log the token to the console
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/get-category`,
        {
          // headers: {
          //   Authorization: `${token}`,
          // },
        }
      );
      //   console.log(response.data);
      //   console.log(response.data.name);
      setCategories(response.data.categories); // Assuming there's a 'categories' property in the response

      //   if (data.success) {
      //     setCategories(data.categories); // Assuming there's a 'categories' property in the response
      //     console.log(data.categories);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  //for products
  const getMovies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/get-Movie`
      );
      setProducts(response.data.movies);
      // console.log("product",products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <movies.Provider
        value={{
          cartitem,
          wishlist,
          auth,
          products,
          setCartitem,
          setWishlist,
          setProducts,
         getMovies,
          setAuth,
          wishlistaddproduct,
          WishlistProductRemove,
          WishlistcartitemRemove,
          categories,
          setCategories,
          getCategories,
          search,
          setSearch,
        }}
      >
        {children}
      </movies.Provider>
    </div>
  );
};

export default Contex;
