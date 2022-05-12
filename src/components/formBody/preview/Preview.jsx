import React, {useState, useEffect} from "react";
import jsPDF from "jspdf";
import Fake_Res from "../../../fake_response.json"
import CircularProgress from '@mui/material/CircularProgress';
import "./preview.css";

const Preview = (props) => {
  const fake_res = Fake_Res;
  const toWord = () => {};

  const toExcel = () => {
    alert("Export To Excel");
  };

  useEffect(()=> {
    console.log("dasdas: ",props.jsonRes)
  }, props.jsonRes)

  const toPDF = () => {
    alert("Export To PDF");
    var doc = new jsPDF();
    doc.setFontSize(8);
    doc.setFont("Times", "Italic");
    // doc.text(15, 25, fake_res);
    doc.text(15,25,JSON.stringify(fake_res, undefined, 2));
    doc.save("name.pdf");
  };
  return (
    <div className="preview">
      <h2>Xem trước</h2>
      <div className="preview1">
        <div className="image_showing">
          {props.preview && props.preview.frontImage && props.preview.frontImage.base64 && (
            
              <div className="image_showing__item">
                <p className="image_title">Mặt trước:</p>
                <img
                  className="preview__img"
                  src={props.preview.frontImage.base64}
                  alt="preview_front"
                />
              </div>)}
            {props.preview && props.preview.backImage&& props.preview.backImage.base64 && (
              <div className="image_showing__item">
                <p className="image_title">Mặt sau:</p>
                <img
                  className="preview__img"
                  src={props.preview.backImage.base64}
                  alt="preview_post"
                />
              </div>)}
        </div>


        {/* {props.preview && props.preview.postImage ?(
              <div className="image_showing__item">
              <p className="image_title">Mặt sau:</p>
              <img
                className="preview__img"
                src={props.preview.postImage.base64}
                alt="preview_post"
              />
            </div>)} */}
      </div>
      <div>
        {props.messageCode.code !== "OK" && (
          <h3 className="result_message red_message">
            {props.messageCode.code==="noinput" ? props.messageCode.message : <CircularProgress />}
            
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
            {/* {JSON.stringify(fake_res, null, 4)} */}
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
