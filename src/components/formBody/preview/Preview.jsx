import React from "react";
import "./preview.css";

const Preview = (props) => {
  return (
    <div className="preview">
      <h2>Xem trước</h2>
      <div className="preview1">
        {props.preview && props.preview.image.url ? (
          <img
            className="preview__img"
            src={props.preview.image.url}
            alt="preview"
          />
        ) : (
          <p>Bản xem trước của file</p>
        )}
      </div>
      <div className="preview2">
        {JSON.stringify(props.preview, null, 2) === `""` && <p>Json {"{}"}</p>}
        {props.preview.noiDung === "" && <p>Json {"{}"}</p>}
        {console.log(props.preview)}
        {JSON.stringify(props.preview, null, 2) !== `""` &&
          props.preview.noiDung !== "" && (
            <div>
              <pre>{JSON.stringify(props.preview, null, 2)}</pre>
            </div>
          )}
      </div>
    </div>
  );
};

export default Preview;
