import React from "react";
import "./formBody.css";
import Information from "./information/Information";
import Preview from "./preview/Preview";

const FormBody = () => {
  const [preview, setPreview] = React.useState("");
  const handlePreview = (values) => {
    setPreview(values);
  };
  return (
    <div className="formBody">
      <Information onBindingPreview={handlePreview} />
      <Preview preview={preview} />
    </div>
  );
};

export default FormBody;
