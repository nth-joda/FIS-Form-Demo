import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./information.css";
import UploadImages from "../../uploader/UploadImages";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const options = ["CMT/TCC/Passport", "Bằng lái xe", "Đăng ký xe", "Văn bản"];

const cccd = [
  "so",
  "hoVaTen",
  "ngayThangNamSinh",
  "gioiTinh",
  "quocTich",
  "queQuan",
  "noiThuongTru",
  "coGiaTriDen",
];

const blx = [
  "hoVaTen",
  "ngaySinh",
  "quocTich",
  "noiCuTru",
  "hang",
  "coGiaTriDen",
];

const Information = (props) => {
  const onPreview = () => {
    if (formik.values.noiDung !== false && formik.values.image.name) {
      props.onBindingPreview(formik.values);
    } else alert("Điền đầy đủ các mục bắt buộc");
  };
  const onHandleClose = () => {
    alert("Đang đóng");
    formik.resetForm();
    props.onBindingPreview(formik.values);
  };
  const formik = useFormik({
    initialValues: {
      fileType: "image",
      vanBan: "",
      noiDung: false,
      image: {},
    },
    validationSchema: Yup.object({
      fileType: Yup.string().required("Required!"),
      noiDung: Yup.boolean(),
    }),
    onSubmit: (values) => {
      if (formik.values.noiDung !== false && formik.values.image.name) {
        props.onBindingPreview(formik.values);
        alert("Biểu mẫu đã lưu thành công!");
        formik.resetForm();
      } else alert("Điền đầy đủ các mục bắt buộc");
    },
  });

  const handleImage = (img) => {
    formik.setFieldValue("image", {
      name: img.name,
      type: img.type,
      size: img.size,
      url: URL.createObjectURL(img),
    });
  };
  return (
    <div className="information">
      <h2>Thông tin nhận dạng</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="formField">
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
          <label>Loại văn bản</label>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Chọn loại văn bản"
              onChange={formik.handleChange}
              value={formik.values.vanBan}
              name="vanBan"
              sx={{ width: "100%" }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <div className="formField">
          <label className="required">
            Cột thông tin sẽ lưu <span className="warning-sign">(*)</span>
            {formik.values.noiDung === false || !formik.values.image.name ? (
              <p className="warning-message">
                {"Cột thông tin sẽ lưu không được bỏ trống"}
              </p>
            ) : null}
          </label>
          <div className="formField__input">
            <input
              type="checkbox"
              id="noiDung"
              name="noiDung"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label>Nội dung</label>
          </div>
        </div>

        <div className="formField">
          <label>Tải lên hình ảnh</label>
          <div>
            <UploadImages changeImage={handleImage} />
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
