import { Rating } from "@mui/material";
import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDescription = () => {
  const { id } = useParams(); // Use 'id' instead of 'product._id'
  const [productdata, setProductdata] = useState({});

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/get-singlemovie/${id}`
        );

        const product = response.data.movie;
        setProductdata(product);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [id]); // Add 'id' as a dependency to re-run the effect when 'id' changes

  return (
    <div>
      <h1>Movie Details</h1>
      {productdata.image && productdata.image.length > 0 && (
        <img
          src={`${process.env.REACT_APP_BASE_URL}/${productdata.image[0].imagePath}`}
          alt={`${productdata.name}-0`}
          style={{
            width: "300px",
            objectFit: "cover",
          }}
        />
      )}
      {productdata.video && (
        <video
          controls
          width="300"
          height="200"
          style={{
            marginTop: "10px",
          }}
        >
          <source
            src={`${process.env.REACT_APP_BASE_URL}/${productdata.video.videoPath}`}
            type={productdata.video.contentType}
          />
          Your browser does not support the video tag.
        </video>
      )}

      <p>{productdata.name}</p>

      {productdata.rating > 0 && (
        <Rating
          name="read-only"
          value={productdata.rating}
          precision={0.1}
          readOnly
        />
      )}

      <Typography variant="h1" marginBottom={2} marginTop={4}>
        {" "}
        {productdata.name}
      </Typography>
      <Typography variant="h" marginBottom={2} marginTop={4}>
        {" "}
        {productdata.description}
      </Typography>
      <Typography variant="h6" marginBottom={2} marginTop={4}>
        {" "}
        {productdata.year}
      </Typography>
      <Typography variant="h6" marginBottom={2} marginTop={4}>
        {" "}
        {productdata.movieTime}
      </Typography>
      <Typography variant="h6" marginBottom={2} marginTop={4}>
        {" "}
        {productdata.movieGenres}
      </Typography>
    </div>
  );
};

export default MovieDescription;
