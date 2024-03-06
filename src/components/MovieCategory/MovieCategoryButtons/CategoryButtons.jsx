import React, { useContext, useEffect } from "react";
import { movies } from "../../Contex";
import { Link } from "react-router-dom";

const CategoryButtons = () => {
  const { categories, getCategories, loading } = useContext(movies);
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop:"80px",
        overflowY: "hidden",
        paddingBottom:"20px",
        gap:"20px",
        flexWrap:"wrap"
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
