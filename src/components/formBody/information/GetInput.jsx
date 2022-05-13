import React, {useState, useEffect} from 'react'
import "./information.css"

import { useFormik } from "formik";
import * as Yup from "yup";

import UploadImages from "../../uploader/UploadImages";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CND from "../../../cotNhanDang copy 2.json"

const initialLoaiGiayToID = 1;
const data = CND.data;
const GetInput = (props) => {

    const [chosen_loaiGiayTo, setChosen_loaiGiayTo] = useState(initialLoaiGiayToID);
    const [checked_list, setChecked_list] = useState([]);
    const [isReset,setIsReset] = useState(false);
    const setInitialData = (id) =>{
        setChosen_loaiGiayTo(id);
        setChecked_list(data.find(x => x.id === id)? data.find(x => x.id === id).fields.map(item => item) : [])
    }
    useEffect(() => {
        data && data.find(x => x.id === initialLoaiGiayToID) ? setInitialData(initialLoaiGiayToID) : setInitialData(0);
    },[])

    useEffect(() => {
        formik.resetForm();
        setChecked_list(data.find(x => x.id === chosen_loaiGiayTo) ? data.find(x => x.id === chosen_loaiGiayTo).fields.map(item => item) : [])
        console.log(chosen_loaiGiayTo)
        props.onReset();
        setIsReset(!isReset)
    },[chosen_loaiGiayTo])

    const handleFrontImage = (img) => {
        formik.setFieldValue("frontImage", img);
    }
    const handleBackImage = (img) => {
        formik.setFieldValue("backImage", img);
    }

    const handleSubmit = () => {
        if (formik.values.cotNoiDung.length <=0)
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        if( formik.values.loaiGiayTo === 1 && (Object.keys(formik.values.frontImage).length <=0 ))
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        if( formik.values.loaiGiayTo === 3 && ((Object.keys(formik.values.frontImage).length <=0 ) && Object.keys(formik.values.backImage).length <=0) )
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        props.onReset();
        setIsReset(!isReset);
        formik.resetForm();
        alert("Đã lưu thông tin")
        setInitialData(initialLoaiGiayToID);
        
    }

    const onPreview = () => {
        formik.values.cotNoiDung = [...checked_list];
        formik.values.loaiGiayTo = chosen_loaiGiayTo;
        console.log("Preview: ",formik.values);
        console.log(checked_list);
        if (formik.values.cotNoiDung.length <=0)
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        if( formik.values.loaiGiayTo === 1 && (Object.keys(formik.values.frontImage).length <=0 ))
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        if( formik.values.loaiGiayTo === 3 && ((Object.keys(formik.values.frontImage).length <=0 ) && Object.keys(formik.values.backImage).length <=0) )
        {
            alert("Điền đầy đủ các mục bắt buộc");
            return;
        }
        props.onBindingPreview(formik.values);
    }

    const onHandleClose = () => {
        props.onReset();
        setIsReset(!isReset);
        formik.resetForm();
        alert("Đang đóng");
        setInitialData(initialLoaiGiayToID);
    }



    const formik = useFormik({
        initialValues: {
        fileType: "image",
        loaiGiayTo: chosen_loaiGiayTo,
        cotNoiDung: checked_list,
        frontImage: {},
        backImage: {},
        },
        validationSchema: Yup.object({
            fileType: Yup.string().required("Required!"),
            cotNoiDung: Yup.array().required("Required!"),
        }),
        onSubmit: (values) => {
            if (formik.values.cotNoiDung.length <=0)
            {
                alert("Điền đầy đủ các mục bắt buộc");
                return;
            }
            if( formik.values.loaiGiayTo === 1 && (Object.keys(formik.values.frontImage).length <=0 ))
            {
                alert("Điền đầy đủ các mục bắt buộc");
                return;
            }
            if( formik.values.loaiGiayTo === 3 && ((Object.keys(formik.values.frontImage).length <=0 ) && Object.keys(formik.values.backImage).length <=0) )
            {
                alert("Điền đầy đủ các mục bắt buộc");
                return;
            }
            props.onReset();
            setIsReset(!isReset);
            formik.resetForm();
            alert("Đã lưu thông tin thành cộng");
            setInitialData(initialLoaiGiayToID);
        },
    });

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
                    value={chosen_loaiGiayTo}
                    name="loaiGiayTo"
                    sx={{ width: "100%" }}>
                {
                    data.map(item => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                            onClick={(e) => {setChosen_loaiGiayTo(item.id)}}>
                                {item.displayName}
                                
                        </MenuItem>
                    ))
                }
                </TextField>
            </div>
            </div>

            <div className="formField">
            <label className="required">
                Cột thông tin sẽ nhận dạng <span className="warning-sign">(*)</span>
                {formik.values.cotNoiDung === [] ||
                !formik.values.frontImage ||
                !formik.values.backImage ? (
                <p className="warning-message">
                    {"Cột thông tin sẽ nhận dạng không được trống"}
                </p>
                ) : null}
            </label>
            <div className="formField__input">
                <div className="formField__input-multiCheck">
                {
                    
                    data.find(x => x.id == chosen_loaiGiayTo) ? data.find(x => x.id === chosen_loaiGiayTo).fields.map(item =>(
                        <label key={checked_list.find(x => x == item.field)? item.field+"_checked" : item.field}>
                            <input 
                                type="checkbox"
                                defaultChecked={true}
                                //checked={checked_list.find(x => x.field === item.field)? true : false}
                                className="multi-input"
                                name="cotNoiDung"
                                value={item.field}
                                onChange={(e) => { e.target.checked === true ? setChecked_list([...checked_list, item]): setChecked_list([...checked_list.filter(x => x.field !== item.field)])}}
                            />
                            {item.dpName}
                        </label>
                    )) : null

                    // formik.values.cotNoiDung.map(item => 
                    //   item.map(i => 
                    //     (<label key={i.field}>
                    //       <input
                    //         type="checkbox"
                    //         defaultChecked="checked"
                    //         className="multi-input"
                    //         name="cotNoiDung"
                    //         value={i.field}
                    //         onChange={formik.handleChange}
                    //       />
                    //       {i.dpName}
                    //     </label>)
                    //   )
                    // )
                }
                </div>
            </div>
            </div>
            {
            (chosen_loaiGiayTo === 1 || chosen_loaiGiayTo === 3) && (
                <div className="formField">
                <label>
                Tải lên hình ảnh mặt trước <span className="warning-sign">(*)</span>
                </label>
                <div>
                <UploadImages changeImage={handleFrontImage} isReset={isReset} />
                {/* TODO: reset name of element "input file" in Information component */}
                </div>
            </div>
            )
            }

            {
            (chosen_loaiGiayTo === 2 || chosen_loaiGiayTo === 3) && (
                <div className="formField">
                    <label>
                        Tải lên hình ảnh mặt sau <span className="warning-sign">(*)</span>
                    </label>
                <div>
                <UploadImages changeImage={handleBackImage} isReset={isReset}/>
                {/* TODO: reset name of element "input file" in Information component */}
                </div>
            </div>
            )
            }


            <div className="cta">
            <button type="button" onClick={onPreview} className="btn btn-primary">
                Xem trước
            </button>
            <button type="button" onClick={handleSubmit} className="btn btn-primary">
                Thực hiện
            </button>
            <button type="button" onClick={onHandleClose} className="btn btn-red">
                Đóng
            </button>
            </div>
        </form>
        </div>
    );
}

export default GetInput