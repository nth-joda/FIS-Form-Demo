import React from "react";

import "./preview.css";

const Preview = (props) => {
  const toWord = () => {};

  const toExcel = () => {
    alert("Export To Excel");
  };

  const toPDF = () => {
    alert("Export To PDF");
  };
  return (
    <div className="preview">
      <h2>Xem trước</h2>
      <div className="preview1">
        {props.preview &&
        props.preview.frontImage.base64 &&
        props.preview.postImage.base64 ? (
          <div className="image_showing">
            <div className="image_showing__item">
              <p className="image_title">Mặt trước:</p>
              <img
                className="preview__img"
                src={props.preview.frontImage.base64}
                alt="preview_front"
              />
            </div>
            <div className="image_showing__item">
              <p className="image_title">Mặt sau:</p>
              <img
                className="preview__img"
                src={props.preview.postImage.base64}
                alt="preview_post"
              />
            </div>
          </div>
        ) : (
          <p>Bản xem trước của file</p>
        )}
      </div>
      <div>
        {props.messageCode.code !== "OK" && (
          <h3 className="result_message red_message">
            {props.messageCode.message}
          </h3>
        )}
        {props.messageCode.code === "OK" && (
          <div>
            <h3 className="result_message green_message">
              {props.messageCode.message}:
            </h3>
          </div>
        )}
      </div>
      <div className="preview2">
        {!props.jsonRes === {} && <p>Json {"{}"}</p>}
        {props.jsonRes === {} && <p>Json {"{}"}</p>}

        {props.messageCode.code === "OK" && (
          <div>
            <pre>{JSON.stringify(props.jsonRes, undefined, 2)}</pre>
          </div>
        )}

        {props.messageCode.code !== "OK" && (
          <div>
            "image":"","hometown":"Thụy Lâm, Đông Anh, Hà Nội","address":"Đào
            Thục, Thụy Lâm, Đông Anh, Hà
            Nội","hometown_district_code":"17","address_ward":"Thuỵ
            Lâm","hometown_town_code":"1","address_ward_code":"460","hometown_ward":"Thuỵ
            Lâm","hometown_town":"Hà
            Nội","address_district_code":"17","hometown_district":"Đông
            Anh","hometown_ward_code":"460","dob":"05-09-1972","name":"ĐINH VĂN
            HOẠT","address_town_code":"1","id":"012164313","address_district":"Đông
            Anh","address_town":"Hà Nội"
          </div>
        )}
      </div>
      <div className="cta">
        <button type="button" onClick={toWord} className="btn btn-word">
          Word
        </button>
        <button type="button" onClick={toExcel} className="btn btn-excel">
          Excel
        </button>
        <button type="button" onClick={toPDF} className="btn btn-pdf">
          PDF
        </button>
      </div>
    </div>
  );
};

export default Preview;
