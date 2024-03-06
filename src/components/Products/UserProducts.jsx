import React, { useContext, useEffect } from "react";
import "./products.css";
import { movies } from "../Contex";
import NewMovies from "../MovieCategory/NewMovies/NewMovies";
import ComedyMovies from "../MovieCategory/ComedyMovies/ComedyMovies";
import ActionMovies from "../MovieCategory/ActionMovies/ActionMovies";

const Products = () => {
  const {
    // getMovies,
    getCategories,
  } = useContext(movies);
  // const [checked, setChecked] = useState([]);
  // const [radio, setRadio] = useState([]);
  //for grting acategories
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
  //for filter
  // useEffect(() => {
  //   // if (checked.length || radio.length) {
  //   //   filterProduct();
  //   // } else {
  //     getMovies();
  //   // }
  //   // eslint-disable-next-line
  // }, []);

  //for check function of category
  // const handlefilter = (value, categoryId) => {
  //   let all = [...checked];
  //   if (value) {
  //     all.push(categoryId);
  //   } else {
  //     all = all.filter((c) => c !== categoryId);
  //   }
  //   setChecked(all);
  // };
  // for filtering the product
  // const filterProduct = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/admin/product/filter-product`,
  //       { checked, radio }
  //       // {
  //       //   headers: {
  //       //     Authorization: `${token}`,
  //       //   },
  //       // }
  //     );
  //     console.log(response.data.products);
  //     setProducts(response.data.products);
  //     if (response.data.products.length === 0) {
  //       toast.success("no item found");
  //     }
  //   } catch (error) {
  //     console.error("Delete Error:", error);
  //     if (error.response) {
  //       console.error("Error Response:", error.response.data);
  //     }
  //   }
  // };

  return (
    <div>
      <div style={{ marginTop: "2.3cm", display: "flex", width: "100%" }}>
        <div>
          {/* <h3>categories</h3> */}
          {/* {categories.map((c) => (
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
            ))} */}
          {/* </Radio.Group> */}
        </div>
        <div>
          {/* <Button variant="contained" onClick={() => window.location.reload()}>
            Reset filter
          </Button> */}
        </div>
      </div>
      <div className="movie-distance">
        <NewMovies />
      </div>
      <div className="movie-distance">
        {" "}
        <ComedyMovies />
      </div>
      <div className="movie-distance">
        {" "}
        <ActionMovies />
      </div>
    </div>
  );
};

export default Products;
