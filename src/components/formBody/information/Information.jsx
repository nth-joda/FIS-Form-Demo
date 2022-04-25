import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./information.css";
import UploadImages from "../../uploader/UploadImages";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const cccd = [
  "so",
  "hoVaTen",
  "ngaySinh",
  "gioiTinh",
  "quocTich",
  "queQuan",
  "noiThuongTru",
  "coGiaTriDen",
];

const blx = [
  "so",
  "hoVaTen",
  "ngaySinh",
  "quocTich",
  "noiCuTru",
  "hang",
  "coGiaTriDen",
  "ngayCap",
];

const dkx = [
  "soKhung",
  "tenChuXe",
  "diaChi",
  "nhanHieu",
  "soLoai",
  "loaiXe",
  "dungTich",
  "mauSon",
  "taiTrong",
  "soChoNgoi",
  "giaTriDen",
  "bienSoXe",
  "lanDKDau",
  "ngayThangNam",
];

const vb = ["Văn bản"];

const options = [
  { id: 0, displayName: "CMT/TCC/Passport", fields: cccd },
  { id: 1, displayName: "Bằng lái xe", fields: blx },
  { id: 2, displayName: "Đăng ký xe", fields: dkx },
  { id: 3, displayName: "Văn bản", fields: vb },
];

const Information = (props) => {
  const onPreview = () => {
    console.log(formik.values.cotNoiDung);
    if (formik.values.cotNoiDung !== [] && formik.values.image.name) {
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
      loaiGiayTo: 3,
      cotNoiDung: options[3].fields,
      image: {},
    },
    validationSchema: Yup.object({
      fileType: Yup.string().required("Required!"),
      cotNoiDung: Yup.array().required("Required!"),
    }),
    onSubmit: (values) => {
      if (formik.values.cotNoiDung !== [] && formik.values.image.name) {
        props.onBindingPreview(formik.values);
        alert("Biểu mẫu đã lưu thành công!");
        formik.resetForm();
      } else alert("Điền đầy đủ các mục bắt buộc");
    },
  });

  useEffect(() => {
    formik.values.cotNoiDung = options[formik.values.loaiGiayTo].fields;
  }, [formik.values.loaiGiayTo]);

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
            Cột thông tin sẽ lưu <span className="warning-sign">(*)</span>
            {formik.values.cotNoiDung === [] || !formik.values.image.name ? (
              <p className="warning-message">
                {"Cột thông tin sẽ lưu không được bỏ trống"}
              </p>
            ) : null}
          </label>
          <div className="formField__input">
            <div className="formField__input-multiCheck">
              {options[formik.values.loaiGiayTo].fields.map((field) => (
                <label key={field}>
                  <input
                    type="checkbox"
                    defaultChecked="checked"
                    className="multi-input"
                    name="cotNoiDung"
                    value={field}
                    onChange={formik.handleChange}
                  />
                  {field}
                </label>
              ))}
            </div>
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
