import React from "react";
import "./preview.css";

const Preview = (props) => {
  return (
    <div className="preview">
      <h2>Xem trước</h2>
      <div className="preview1">
        {props.preview && props.preview.image.base64 ? (
          <img
            className="preview__img"
            src={props.preview.image.base64}
            alt="preview"
          />
        ) : (
          <p>Bản xem trước của file</p>
        )}
      </div>
      <div className="preview2">
        {props.jsonRes === `""` && <p>Json {"{}"}</p>}
        {props.jsonRes === `""` && <p>Json {"{}"}</p>}
        {props.jsonRes && (
          <div>
            <pre>{props.jsonRes}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
