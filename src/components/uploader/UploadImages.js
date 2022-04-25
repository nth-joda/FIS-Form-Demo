import React from "react";
import "./uploadImages.css";
const UploadImages = (props) => {
  const onImageChange = (e) => {
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
