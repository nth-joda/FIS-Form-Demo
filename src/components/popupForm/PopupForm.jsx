import React from "react";
import FormBody from "../formBody/FormBody";

import Header from "../header/Header";
import "./popupForm.css";
const PopupForm = () => {
  return (
    <div>
      <Header className="formHeader" />
      <FormBody />
    </div>
  );
};

export default PopupForm;
