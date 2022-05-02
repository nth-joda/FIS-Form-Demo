import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import "./information.css";
import UploadImages from "../../uploader/UploadImages";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CND from "../../../cotNhanDang.json"

// TODO: Change this link to the real Database endpoint when the DB is ready.
const fake_url= `https://abc.xyz.asdas/fakeapi`

const Information = (props) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get(fake_url)
    .catch(err => { 
      setOptions(CND.options);
    })
  }, []);

  const onPreview = () => {
    console.log(formik.values.cotNoiDung);
    if (
      formik.values.cotNoiDung !== [] &&
      formik.values.frontImage &&
      formik.values.postImage
    ) {
      props.onBindingPreview(formik.values);
    } else alert("Điền đầy đủ các mục bắt buộc");
  };
  const onHandleClose = () => {
    alert("Đang đóng");
    formik.resetForm();
    props.onBindingPreview(formik.values);
  };

  const cotND = options[0] ? options[0].fields.map(function(item) {
    return item.field;
  }) : []

  const formik = useFormik({
    initialValues: {
      fileType: "image",
      loaiGiayTo: 0,
      cotNoiDung: cotND,
      frontImage: {},
      PostImage: {},
    },
    validationSchema: Yup.object({
      fileType: Yup.string().required("Required!"),
      cotNoiDung: Yup.array().required("Required!"),
    }),
    onSubmit: (values) => {
      if (
        formik.values.cotNoiDung !== [] &&
        formik.values.frontImage &&
        formik.values.postImage
      ) {
        props.onBindingPreview(formik.values);
        alert("Biểu mẫu đã lưu thành công!");
        formik.resetForm();
      } else alert("Điền đầy đủ các mục bắt buộc");
    },
  });

  useEffect(() => {
    if (options[formik.values.loaiGiayTo]){ formik.values.cotNoiDung = options[formik.values.loaiGiayTo].fields.map(
      function(item) {
        return item.field;
      }
    );}
  }, [formik.values.loaiGiayTo]);

  const handleFrontImage = (img) => {
    formik.setFieldValue("frontImage", img);
  };

  const handlePostImage = (img) => {
    formik.setFieldValue("postImage", img);
  };
  return (
    <div className="information">
      <h2>Thông tin nhận dạng</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="formField" style={{ display: "none" }}>
          <label className="required">
            Văn bản cần nhận dạng <span className="warning-sign">(*)</span>
          </label>

          <div className="formField__input">
            <input
              type="text"
              name="fileType"
              placeholder={formik.initialValues.fileType}
              readOnly="readonly"
              value={formik.initialValues.fileType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="formField">
          <label>Loại giấy tờ nhận dạng</label>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Chọn loại giấy tờ"
              onChange={formik.handleChange}
              value={formik.values.loaiGiayTo}
              name="loaiGiayTo"
              sx={{ width: "100%" }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.displayName}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <div className="formField">
          <label className="required">
            Cột thông tin sẽ nhận dạng <span className="warning-sign">(*)</span>
            {formik.values.cotNoiDung === [] ||
            !formik.values.frontImage ||
            !formik.values.postImage ? (
              <p className="warning-message">
                {"Cột thông tin sẽ nhận dạng không được trống"}
              </p>
            ) : null}
          </label>
          <div className="formField__input">
            <div className="formField__input-multiCheck">
              {options[formik.values.loaiGiayTo] && options[formik.values.loaiGiayTo].fields.map((field_item) => (
                <label key={field_item.field}>
                  <input
                    type="checkbox"
                    defaultChecked="checked"
                    className="multi-input"
                    name="cotNoiDung"
                    value={field_item.field}
                    onChange={formik.handleChange}
                  />
                  {field_item.dpName}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="formField">
          <label>
            Tải lên hình ảnh mặt trước <span className="warning-sign">(*)</span>
          </label>
          <div>
            <UploadImages changeImage={handleFrontImage} />
            {/* TODO: reset name of element "input file" in Information component */}
          </div>
        </div>
        <div className="formField">
          <label>
            Tải lên hình ảnh mặt sau <span className="warning-sign">(*)</span>
          </label>
          <div>
            <UploadImages changeImage={handlePostImage} />
            {/* TODO: reset name of element "input file" in Information component */}
          </div>
        </div>
        <div className="cta">
          <button type="button" onClick={onPreview} className="btn btn-primary">
            Xem trước
          </button>
          <button type="submit" className="btn btn-primary">
            Thực hiện
          </button>
          <button type="button" onClick={onHandleClose} className="btn btn-red">
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;
