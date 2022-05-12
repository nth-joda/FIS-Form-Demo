import React, { useEffect } from "react";
import "./formBody.css";
import Information from "./information/Information";
import Preview from "./preview/Preview";
import axios from "axios";
import GetInput from "./information/GetInput";


const front_CMND = "MIIBSwIBADCCASwGByqGSM44BAEwggEfAoGBAP1/U4EddRIpUt9KnC7s5Of2EbdSPO9EAMMeP4C2USZpRV1AIlH7WT2NWPq/xfW6MPbLm1Vs14E7gB00b/JmYLdrmVClpJ+f6AR7ECLCT7up1/63xhv4O1fnxqimFQ8E+4P208UewwI1VBNaFpEy9nXzrith1yrv8iIDGZ3RSAHHAhUAl2BQjxUjC8yykrmCouuEC/BYHPUCgYEA9+GghdabPd7LvKtcNrhXuXmUr7v6OuqC+VdMCz0HgmdRWVeOutRZT+ZxBxCBgLRJFnEj6EwoFhO3zwkyjMim4TwWeotUfI0o4KOuHiuzpnWRbqN/C/ohNWLx+2J6ASQ7zKTxvqhRkImog9/hWuWfBpKLZl6Ae1UlZAFMO/7PSSoEFgIUJJGQo2h4cGnA4OkjSvZIgbpUXrE=";
const fake_key = `lorem ipsum dolor sit amet, consectetur adipiscing`;
const real_url = `http://118.69.123.51:8088/c12-service/detect-text-in-image/mobile/detect-image`
const fake_url = `abc.xyz.com`
const two_Sided_CMND = "MIIBSwIBADCCASwGByqGSM44BAEwggEfAoGBAP1/U4EddRIpUt9KnC7s5Of2EbdSPO9EAMMeP4C2USZpRV1AIlH7WT2NWPq/xfW6MPbLm1Vs14E7gB00b/JmYLdrmVClpJ+f6AR7ECLCT7up1/63xhv4O1fnxqimFQ8E+4P208UewwI1VBNaFpEy9nXzrith1yrv8iIDGZ3RSAHHAhUAl2BQjxUjC8yykrmCouuEC/BYHPUCgYEA9+GghdabPd7LvKtcNrhXuXmUr7v6OuqC+VdMCz0HgmdRWVeOutRZT+ZxBxCBgLRJFnEj6EwoFhO3zwkyjMim4TwWeotUfI0o4KOuHiuzpnWRbqN/C/ohNWLx+2J6ASQ7zKTxvqhRkImog9/hWuWfBpKLZl6Ae1UlZAFMO/7PSSoEFgIUJJGQo2h4cGnA4OkjSvZIgbpUXrE="

const FormBody = () => {
  const [preview, setPreview] = React.useState("");
  const [jsonRes, setJsonRes] = React.useState({});
  const [messageCode, setMessageCode] = React.useState({
    message: "undefined",
    code: "undefined",
  });
  function handleReset(){
    setPreview("")
    setJsonRes({})
    setMessageCode({
      message: "Không có dữ liệu đầu vào",
      code: "noinput",
    })
  }
    const handlePreview = (values) => {
      setPreview(values);
      let body = {};
      let getResponse = {};
      
      if (values.loaiGiayTo === 1) {
          body = {
              key: front_CMND,
              imageFrontBase64: values.frontImage.base64,
              imageType: "DangNhapChungMinhNhanDan",
          };
      }

      if (values.loaiGiayTo === 3) {
          body = {
              key: two_Sided_CMND,
              imageFrontBase64: values.frontImage.base64,
              imageBackBase64: values.backImage.base64,
              imageType: "ChungMinhNhanDan",
          };
      }
      setMessageCode({
        message: "loading",
        code: "loading",
      })
      axios
      .post(
          real_url,
          body
      ).then((res) => {
          const arrayChecked = values.cotNoiDung;
          if (res.data.code === "OK") {
              console.log(res)
              if(res.data.result !== null){
                  const data = JSON.parse(res.data.result.jsonResult);
                  if (data && arrayChecked !== undefined) {
                      let list_ob = [];
                      data.map(item =>{
                          let dataInfo = item.info;
                          let infor_list = {};
                          for (let i = 0; i < arrayChecked.length; i++) {
                              let object = dataInfo[arrayChecked[i]] ? { [arrayChecked[i]]: dataInfo[arrayChecked[i]] }: {};
                              Object.assign(infor_list, object);
                          }
                          if(item.type === "9_id_card_back"){
                              let back_Ob = {"side": "back_CMND", infor_list};
                              list_ob.push(back_Ob);
                          }
                          else if(item.type === "9_id_card_front"){
                              let front_Ob = {"side": "front_CMND", infor_list};
                              list_ob.push(front_Ob);
                          }
                      });
                      Object.assign(getResponse,list_ob)
                      console.log("Get respone: ", getResponse);
                      console.log("listOb", list_ob);
                      setJsonRes(getResponse);
                  } else {
                      setJsonRes(res.data.message)
                  }
              }
          }
          setMessageCode({
              code: res.data.code,
              message: res.data.message,
          });
      })
      .catch((err) => {
          console.log("error at axios req: ", err);
          alert(err.message);
      });
      getResponse = {};
      console.log("Body: ", body);
      body ={};
  };

  return (
    <div className="formBody">
      {/* <Information onBindingPreview={handlePreview} /> */}
      <GetInput onBindingPreview={handlePreview} onReset={handleReset} />
      <Preview preview={preview} jsonRes={jsonRes} messageCode={messageCode}  />
      {/* {console.log("passing to", jsonRes)} */}
    </div>
  );
};

export default FormBody;
