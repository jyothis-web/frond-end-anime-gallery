import axios from "axios";
import React, { useState } from "react";

const CreateMovieActorImages = ({ id }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each image with its corresponding actor name to formData
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      
      // Extract the name without extension
      //const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      
      formData.append("actorImage", file);
      //formData.append("Actorname", fileNameWithoutExtension); 
    }

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
      <form onSubmit={handleSubmit}>
        <label>
          Select Images:
          <input
            type="file"
            accept="image/*"
            multiple // Allow multiple file selection
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMovieActorImages;
