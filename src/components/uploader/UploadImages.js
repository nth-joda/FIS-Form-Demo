import React, { useState } from "react";
import "./uploadImages.css";
const UploadImages = (props) => {
  const [image, setImage] = useState();

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
    props.changeImage(e.target.files[0]);
  };
  return (
    <input
      className="customUploadImg"
      type="file"
      multiple
      accept="image/*"
      onChange={onImageChange}
    />
  );
};

export default UploadImages;
