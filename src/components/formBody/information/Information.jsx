import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./information.css";
import UploadImages from "../../uploader/UploadImages";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const mt__cmnd = [
  { field: "id", dpName: "số chứng minh thư" },
  { field: "name", dpName: "họ và tên" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "hometown", dpName: "quê quán" },
  { field: "address", dpName: "thường trú" },
  {
    field: "address_town_code",
    dpName: "mã tỉnh/thành phố trong địa chỉ thường trú",
  },
  {
    field: "address_district_code",
    dpName: "mã quận/huyện trong địa chỉ thường trú",
  },
  {
    field: "address_ward_code",
    dpName: "mã phường/xã trong địa chỉ thường trú",
  },
  { field: "hometown_town_code", dpName: "mã tỉnh/thành phố trong quê quán" },
  { field: "hometown_district_code", dpName: "mã quận/huyện trong quê quán" },
  { field: "hometown_ward_code", dpName: "mã phường/xã trong quê quán" },
  { field: "address_town", dpName: "tỉnh/thành phố trong địa chỉ thường trú" },
  { field: "address_district", dpName: "quận/huyện trong địa chỉ thường trú" },
  { field: "address_ward", dpName: "phường/xã trong địa chỉ thường trú" },
  { field: "hometown_town", dpName: "tỉnh/thành phố trong quê quán" },
  { field: "hometown_district", dpName: "quận/huyện trong quê quán" },
  { field: "hometown_ward", dpName: "phường/xã trong quê quán" },
  {
    field: "id_confidence",
    dpName: "độ tin cậy của thông tin trích xuất số thẻ",
  },
  {
    field: "name_confidence",
    dpName: "độ tin cậy của thông tin trích xuất họ và tên",
  },
  {
    field: "dob_confidence",
    dpName: "độ tin cậy của thông tin trích xuất ngày sinh",
  },
  {
    field: "hometown_confidence",
    dpName: "độ tin cậy của thông tin trích xuất quê quán",
  },
  {
    field: "address_confidence",
    dpName: "độ tin cậy của thông tin trích xuất thường trú",
  },
];

const ms__cmnd = [
  { field: "ethnicity", dpName: "dân tộc" },
  { field: "issue_date", dpName: "ngày cấp" },
  { field: "religious", dpName: "tôn giáo" },
  { field: "issued_at", dpName: "nơi cấp" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
  {
    field: "issue_date_confidence",
    dpName: "độ tin cậy của thông tin trích xuất ngày cấp",
  },
  {
    field: "issued_at_confidence",
    dpName: "độ tin cậy của thông tin trích xuất nơi cấp",
  },
  {
    field: "religious_confidence",
    dpName: "độ tin cậy của thông tin trích xuất tôn giáo",
  },
  {
    field: "ethnicity_confidence",
    dpName: "độ tin cậy của thông tin trích xuất dân tộc",
  },
];

const mt__cccd = [
  { field: "id", dpName: "số thẻ" },
  { field: "name", dpName: "họ và tên" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "hometown", dpName: "quê quán" },
  { field: "gender", dpName: "giới tính" },
  { field: "due_date", dpName: "ngày hết hạn" },
  { field: "nationality", dpName: "quốc tịch" },
  { field: "ethnicity", dpName: "dân tộc" },
  { field: "address", dpName: "thường trú" },
  {
    field: "address_town_code",
    dpName: "mã tỉnh/thành phố trong địa chỉ thường trú",
  },
  {
    field: "address_district_code",
    dpName: "mã quận/huyện trong địa chỉ thường trú",
  },
  {
    field: "address_ward_code",
    dpName: "mã phường/xã trong địa chỉ thường trú",
  },
  { field: "hometown_town_code", dpName: "mã tỉnh/thành phố trong quê quán" },
  { field: "hometown_district_code", dpName: "mã quận/huyện trong quê quán" },
  { field: "hometown_ward_code", dpName: "mã phường/xã trong quê quán" },
  { field: "address_town", dpName: "tỉnh/thành phố trong địa chỉ thường trú" },
  { field: "address_district", dpName: "quận/huyện trong địa chỉ thường trú" },
  { field: "address_ward", dpName: "phường/xã trong địa chỉ thường trú" },
  { field: "hometown_town", dpName: "tỉnh/thành phố trong quê quán" },
  { field: "hometown_district", dpName: "quận/huyện trong quê quán" },
  { field: "hometown_ward", dpName: "phường/xã trong quê quán" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
  {
    field: "id_confidence",
    dpName: "độ tin cậy của thông tin trích xuất số thẻ",
  },
  {
    field: "name_confidence",
    dpName: "độ tin cậy của thông tin trích xuất họ và tên",
  },
  {
    field: "dob_confidence",
    dpName: "độ tin cậy của thông tin trích xuất ngày sinh",
  },
  {
    field: "hometown_confidence",
    dpName: "độ tin cậy của thông tin trích xuất quê quán",
  },
  {
    field: "gender_confidence",
    dpName: "độ tin cậy của thông tin trích xuất giới tính",
  },
  {
    field: "due_date_confidence",
    dpName: "độ tin cậy của thông tin trích xuất ngày hết hạn",
  },
  {
    field: "nationality_confidence",
    dpName: "độ tin cậy của thông tin trích xuất quốc tịch",
  },
  {
    field: "ethnicity_confidence",
    dpName: "độ tin cậy của thông tin trích xuất dân tộc",
  },
  {
    field: "address_confidence",
    dpName: "độ tin cậy của thông tin trích xuất thường trú",
  },
];

const ms__cccd = [
  { field: "issue_date", dpName: "ngày cấp" },
  { field: "issued_at", dpName: "nơi cấp" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
  {
    field: "issue_date_confidence",
    dpName: "độ tin cậy của thông tin trích xuất ngày cấp",
  },
  {
    field: "issued_at_confidence",
    dpName: "độ tin cậy của thông tin trích xuất nơi cấp",
  },
];

const mt__cccd_ganChip = [
  { field: "id", dpName: "số thẻ" },
  { field: "name", dpName: "họ và tên" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "hometown", dpName: "quê quán" },
  { field: "gender", dpName: "giới tính" },
  { field: "due_date", dpName: "ngày hết hạn" },
  { field: "nationality", dpName: "quốc tịch" },
  { field: "address", dpName: "thường trú" },
  {
    field: "address_town_code",
    dpName: "mã tỉnh/thành phố trong địa chỉ thường trú",
  },
  {
    field: "address_district_code",
    dpName: "mã quận/huyện trong địa chỉ thường trú",
  },
  {
    field: "address_ward_code",
    dpName: "mã phường/xã trong địa chỉ thường trú",
  },
  { field: "hometown_town_code", dpName: "mã tỉnh/thành phố trong quê quán" },
  { field: "hometown_district_code", dpName: "mã quận/huyện trong quê quán" },
  { field: "hometown_ward_code", dpName: "mã phường/xã trong quê quán" },
  { field: "address_town", dpName: "tỉnh/thành phố trong địa chỉ thường trú" },
  { field: "address_district", dpName: "quận/huyện trong địa chỉ thường trú" },
  { field: "address_ward", dpName: "phường/xã trong địa chỉ thường trú" },
  { field: "hometown_town", dpName: "tỉnh/thành phố trong quê quán" },
  { field: "hometown_district", dpName: "quận/huyện trong quê quán" },
  { field: "hometown_ward", dpName: "phường/xã trong quê quán" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
];

const ms__cccd_ganChip = [
  { field: "issue_date", dpName: "ngày cấp" },
  { field: "issued_at", dpName: "nơi cấp" },
  { field: "country", dpName: "quốc gia" },
  { field: "document_number", dpName: "id mặt sau" },
  { field: "person_number", dpName: "id mặt trước" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "gender", dpName: "giới tính" },
  { field: "due_date", dpName: "ngày hết hạn" },
  { field: "nationality", dpName: "quốc tịch" },
  { field: "sur_name", dpName: "họ" },
  { field: "given_name", dpName: "tên" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
];

const blx = [
  { field: "id", dpName: "số thẻ" },
  { field: "name", dpName: "họ và tên" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "class", dpName: "hạng" },
  { field: "nationality", dpName: "quốc tịch" },
  { field: "issue_date", dpName: "ngày phát hành" },
  { field: "due_date", dpName: "ngày hết hạn" },
  { field: "address", dpName: "nơi cư trú" },
  { field: "image", dpName: "ảnh đã cắt ra và căn chỉnh của giấy tờ" },
];

const mt__dkx = [
  { field: "name", dpName: "tên chủ sở hữu xe" },
  { field: "address", dpName: "nơi cư trú" },
  { field: "id", dpName: "id đăng ký xe" },
  { field: "plate", dpName: "biển số xe" },
  { field: "issued_at", dpName: "nơi cấp" },
  { field: "image", dpName: "ảnh mặt trước đăng ký xe" },
];

const ms__dkx = [
  { field: "name", dpName: "tên chủ sở hữu xe" },
  { field: "address", dpName: "nơi cư trú" },
  { field: "engine", dpName: "số máy" },
  { field: "chassis", dpName: "số khung" },
  { field: "brand", dpName: "nhãn hiệu" },
  { field: "model", dpName: "số loại" },
  { field: "color", dpName: "màu sơn" },
  { field: "capacity", dpName: "dung tích" },
  { field: "issued_at", dpName: "nơi đăng ký" },
  { field: "last_issue_date", dpName: "ngày đăng ký cuối cùng" },
  { field: "first_issue_date", dpName: "ngày đăng ký đầu tiên" },
  { field: "plate", dpName: "biển số xe" },
  { field: "image", dpName: "ảnh mặt sau đăng ký xe" },
];

const passport = [
  { field: "id", dpName: "passport id" },
  { field: "sur_name", dpName: "họ" },
  { field: "given_name", dpName: "tên" },
  { field: "dob", dpName: "ngày sinh" },
  { field: "gender", dpName: "giới tính" },
  { field: "country", dpName: "quốc gia" },
  { field: "nationality ", dpName: "quốc tịch" },
  { field: "due_date", dpName: "ngày hết hạn" },
  { field: "person_number", dpName: "mã số công dân" },
  { field: "image", dpName: "ảnh passport" },
  {
    field: "confidence",
    dpName: "độ tin cậy của thông tin phát hiện được trong passport",
  },
];

const vb = [{ field: "text", dpName: "Văn bản" }];

const options = [
  { id: 0, displayName: "Văn bản", fields: vb },
  { id: 1, displayName: "Mặt trước CMND", fields: mt__cmnd },
  { id: 2, displayName: "Mặt sau CMND", fields: ms__cmnd },
  { id: 3, displayName: "Mặt trước CCCD", fields: mt__cccd },
  { id: 4, displayName: "Mặt sau CCCD", fields: ms__cccd },
  { id: 5, displayName: "Mặt trước CCCD gắn chíp", fields: mt__cccd_ganChip },
  { id: 6, displayName: "Mặt sau CCCD gắn chíp", fields: ms__cccd_ganChip },
  { id: 7, displayName: "Bằng lái xe", fields: blx },
  { id: 8, displayName: "Passport", fields: passport },
  { id: 9, displayName: "Mặt trước Đăng ký xe", fields: mt__dkx },
  { id: 10, displayName: "Mặt sau Đăng ký xe", fields: ms__dkx },
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
      loaiGiayTo: 0,
      cotNoiDung: options[0].fields.map(function (item) {
        return item.field;
      }),
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
    formik.values.cotNoiDung = options[formik.values.loaiGiayTo].fields.map(
      function (item) {
        return item.field;
      }
    );
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
              {options[formik.values.loaiGiayTo].fields.map((field_item) => (
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
          <label>Tải lên hình ảnh</label>
          <div>
            <UploadImages changeImage={handleImage} />
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
