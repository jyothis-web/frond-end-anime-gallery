import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../Redux/actions/actions";

const CategoryButtons = () => {
  const loading = useSelector((state) => state.categories.loading);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data); // Map categories state from Redux store to component props
  useEffect(() => {
    dispatch(getCategories()); // Dispatch getCategories action when component mounts
  }, [dispatch]);
  if (!Array.isArray(categories)) {
    return <p>No categories found</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop: "80px",
        overflowY: "hidden",
        paddingBottom: "20px",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((category) => (
          <Link
            to={`/MoviesByCategory/${category._id}/${encodeURIComponent(
              category.name
            )}`}
            key={category._id}
          >
            <button className="categories-btn" key={category._id}>
              {category.name}
            </button>
          </Link>
        ))
      )}
    </div>
  );
};

export default CategoryButtons;
