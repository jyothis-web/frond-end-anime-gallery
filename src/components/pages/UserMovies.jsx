import "./Movies.css";
import NewMovies from "../MovieCategory/NewMovies/NewMovies";
import ComedyMovies from "../MovieCategory/ComedyMovies/ComedyMovies";
import ActionMovies from "../MovieCategory/ActionMovies/ActionMovies";

const Products = () => {
  return (
    <div>
      <div style={{ marginTop: "2.3cm", display: "flex", width: "100%" }}>
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
