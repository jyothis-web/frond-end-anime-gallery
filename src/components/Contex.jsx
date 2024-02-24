import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const cart = createContext();
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

  const handleaddproduct = (product) => {
    setCartitem((prevCart) => {
      // Check if user is authenticated and has a user ID
      const userId = auth.user ? auth.user._id : null;
      console.log(userId);
      // Get the existing cart data from localStorage
      const storedCart = localStorage.getItem(`cart_${userId}`);

      // Parse the existing cart data
      const existingCart = storedCart ? JSON.parse(storedCart) : [];

      // Find the product in the existing cart
      const productIndex = existingCart.findIndex(
        (item) => String(item._id) === String(product._id)
      );

      console.log("Product._id:", product._id);
      console.log("Product:", product);
      console.log("Existing cart before update:", existingCart);

      // If the product is already in the cart, update its quantity
      if (productIndex !== -1) {
        const updatedCart = [...existingCart];
        updatedCart[productIndex].quantity += 1;

        // Save the updated cart to localStorage
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));

        return updatedCart;
      } else {
        // If the product is not in the cart, add it with quantity 1
        const newProduct = { ...product, quantity: 1 };
        const updatedCart = [...existingCart, newProduct];

        // Save the updated cart to localStorage
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));

        return updatedCart;
      }
    });
  };

  //to add product to cart
  // const handleaddproduct = (product) => {
  //   setCartitem((prevCart) => {
  //     const productIndex = prevCart.findIndex(
  //       (item) => String(item._id) === String(product._id)
  //     );

  //     console.log('Product._id:', product._id);
  //     console.log('Product:', product);
  //     console.log('prevCart before update:', prevCart);

  //     // If the product is already in the cart, update its quantity
  //     if (productIndex !== -1) {
  //       const updatedCart = [...prevCart];
  //       updatedCart[productIndex].quantity += 1;

  //       // Save to localStorage
  //       localStorage.setItem('cart', JSON.stringify(updatedCart));

  //       return updatedCart;
  //     } else {
  //       // If the product is not in the cart, add it with quantity 1
  //       const newProduct = { ...product, quantity: 1 };
  //       const updatedCart = [...prevCart, newProduct];

  //       // Save to localStorage
  //       localStorage.setItem('cart', JSON.stringify(updatedCart));

  //       return updatedCart;
  //     }
  //   });
  // };

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

  //to remove all product from cart
  const handleremoveproduct = (product) => {
    const productExist = cartitem.find((item) => item.id === product.id);
    if (productExist.quantity === 1) {
      setCartitem(cartitem.filter((item) => item.id !== product.id));
    } else {
      setCartitem(
        cartitem.map((item) =>
          item.id === product.id
            ? { ...productExist, quantity: productExist.quantity - 1 }
            : item
        )
      );
    }
  };

  //remove single product from cart
  const SingleProductRemove = (product) => {
    const productIndex = cartitem.findIndex((item) => item.id === product.id);
    const userId = auth.user ? auth.user._id : null;
    console.log(userId);
    if (productIndex !== -1) {
      const updatedCart = [...cartitem];
      updatedCart.splice(productIndex, 1);
      setCartitem(updatedCart);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    }
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
    
  //to change the cart button when its clicked

  const isProductInCart = (productId) => {
    return cartitem.some((product) => product._id === productId);
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

  return (
    <div>
      <cart.Provider
        value={{
          cartitem,
          wishlist,
          auth,
          products,
          setCartitem,
          setWishlist,
          setProducts,
          getProducts,
          setAuth,
          handleaddproduct,
          isProductInCart,
          SingleProductRemove,
          handleremoveproduct,
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
      </cart.Provider>
    </div>
  );
};

export default Contex;
