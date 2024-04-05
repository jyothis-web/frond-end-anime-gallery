import axios from "axios";
import React, { useState } from "react";

const MovieActorImages = ({ id }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = files[0];
      return updatedImages;
    });
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();

    const formData = new FormData();
    const file = images[index];

    // Extract the name without extension
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

    formData.append("actorImage", file);
    formData.append("Actorname", fileNameWithoutExtension);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/update-Image-Movie/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      console.log(response.data.actorImage._id);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <div>Update movie actor images and names</div>
      {[...Array(6)].map((_, index) => (
        <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
          <label>
            Select Image {index + 1}:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ))}
    </div>
  );
};

export default MovieActorImages;
