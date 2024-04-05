import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../Header/UserNavbar";
import Navbar from "../Header/Navbar";
import { Suspense, lazy } from "react";

const LazyReactPlayer = lazy(() => import("react-player"));

const MovieDescription = () => {
  const { id } = useParams();
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
  const authString = localStorage.getItem("auth");

  return (
    <div className="backgroundimg">
      {authString ? <UserNavbar /> : <Navbar />}
      <div id="movie-responsive">
        <div>
          <h3 style={{ margin: "0px", paddingTop: "40px" }}>Movie Name</h3>
          <p>{productdata.name}</p>
          {/* {productdata.image && productdata.image.length > 0 && (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${productdata.image[0].imagePath}`}
              alt={`${productdata.name}-0`}
              style={{
                width: "150px",
                objectFit: "cover",
              }}
            />
          )} */}

          {productdata.video && (
            <video
              controls
              width="300"
              height="200"
              // style={{
              //   marginTop: "10px",
              // }}
            >
              <source
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.video.videoPath}`}
                type={productdata.video.contentType}
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyReactPlayer
                url={productdata.trailer}
                controls
                width="100%"
                height="300px"
              />
            </Suspense>
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px" }}>Movie rating :</h3>
            {productdata.rating > 0 && (
              <Rating
                name="read-only"
                value={productdata.rating}
                precision={0.1}
                readOnly
              />
            )}
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px" }}>Movie Name :</h3>
            <p> {productdata.name}</p>
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px", width: "" }}>Movie Description :</h3>
            <p style={{ maxWidth: "600px" }}> {productdata.description}</p>
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px" }}>Movie Realesed Year:</h3>
            <p>{productdata.year}</p>
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px" }}>Movie Duration :</h3>
            <p>{productdata.movieTime}</p>
          </div>
          <div className="des-flex">
            <h3 style={{ margin: "0px" }}>Movie Generes :</h3>
            <p>{productdata.movieGenres}</p>
          </div>
          <div>
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[5].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {productdata.Actorname}
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[4].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[3].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[2].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[1].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            {productdata.actorImage && productdata.actorImage.length > 0 && (
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${productdata.actorImage[0].imagePath}`}
                alt={`${productdata.name}-0`}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
