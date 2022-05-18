import React, { useEffect } from "react";
import jsPDF from "jspdf";
import Fake_Res from "../../../fake_response.json";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import "./preview.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Preview = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fake_res = Fake_Res;
  const toWord = () => {};

  const toExcel = () => {
    alert("Export To Excel");
  };

  useEffect(() => {
    console.log("dasdas: ", props.jsonRes);
  }, [props.jsonRes]);

  const toPDF = () => {
    alert("Export To PDF");
    var doc = new jsPDF();
    doc.setFontSize(8);
    doc.setFont("Times", "Italic");
    // doc.text(15, 25, fake_res);
    doc.text(15, 25, JSON.stringify(fake_res, undefined, 2));
    doc.save("name.pdf");
  };
  return (
    <div className="preview">
      <h2>Xem trước</h2>
      <div className="preview1">
        <div className="image_showing">
          {props.preview &&
            props.preview.frontImage &&
            props.preview.frontImage.base64 && (
              <div className="image_showing__item">
                <p className="image_title">Mặt trước:</p>
                <img
                  className="preview__img"
                  src={props.preview.frontImage.base64}
                  alt="preview_front"
                />
              </div>
            )}
          {props.preview &&
            props.preview.backImage &&
            props.preview.backImage.base64 && (
              <div className="image_showing__item">
                <p className="image_title">Mặt sau:</p>
                <img
                  className="preview__img"
                  src={props.preview.backImage.base64}
                  alt="preview_post"
                />
              </div>
            )}
        </div>
      </div>
      <div>
        {props.messageCode.code !== "OK" && (
          <h3 className="result_message red_message">
            {(props.messageCode.code === "noinput" ||
              props.messageCode.code === "error") &&
              props.messageCode.message}
            {props.messageCode.code === "loading" && <CircularProgress />}
            {props.messageCode.code === "otherError" && (
              <div>
                {" "}
                <CircularProgress />{" "}
                <span className="msg-error">
                  {props.messageCode.message}
                </span>{" "}
              </div>
            )}

            {/* // {props.messageCode.code==="undefined" ? props.messageCode.message :} */}
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
        {props.messageCode.code === "OK" && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Tiếng Việt" {...a11yProps(0)} />
                <Tab label="JSON" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {!props.vRes === {} && <p>Chưa có thông tin tiếng việt</p>}
              {props.vRes === {} && <p>Chưa có thông tin tiếng việt</p>}

              {props.messageCode.code === "OK" && (
                <div>
                  <pre>{JSON.stringify(props.vRes, undefined, 2)}</pre>
                </div>
              )}

              {props.messageCode.code !== "OK" && <div></div>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {!props.jsonRes === {} && <p>Json {"{}"}</p>}
              {props.jsonRes === {} && <p>Json {"{}"}</p>}

              {props.messageCode.code === "OK" && (
                <div>
                  <pre>{JSON.stringify(props.jsonRes, undefined, 2)}</pre>
                </div>
              )}

              {props.messageCode.code !== "OK" && <div></div>}
            </TabPanel>
          </Box>
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
