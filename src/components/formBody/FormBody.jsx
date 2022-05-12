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
  const handlePreview = (values) => {
    setPreview(values);
    let body = {};
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

    axios
    .post(
      real_url,
      body
    )
    .then((res) => {
      const arrayChecked = values.cotNoiDung;
      if (res.data.code === "OK") {
        console.log(res)
        if(res.data.result !== null){
          const data = JSON.parse(res.data.result.jsonResult);
          if (data && arrayChecked !== undefined) {
            var dataInfo = data[0].info;
            console.log("dtInfo, ArrChecked: ",dataInfo, arrayChecked);
            var arrayFinal = {};
            for (let i = 0; i < arrayChecked.length; i++) {
              var object = dataInfo[arrayChecked[i]] ? { [arrayChecked[i]]: dataInfo[arrayChecked[i]] } : {[arrayChecked[i]] : "undefined"};
              console.log("ai: "+i,arrayChecked[i]);
              Object.assign(arrayFinal, object);
            }
            console.log("final: asdsad ", arrayFinal);
            setJsonRes(arrayFinal);
            console.log("res ", res);
        }
        else {
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
    console.log("Body: ", body);
    body ={};
  };

  // useEffect(() => {

  //   if (preview.loaiGiayTo === 1) {
  //     const body = {
  //       key: real_key,
  //       imageFrontBase64: preview.frontImage.base64,
  //       imageType: "DangNhapChungMinhNhanDan",
  //     };
  //     axios
  //       .post(
  //         real_url,
  //         body
  //       )
  //       .then((res) => {
  //         const arrayChecked = preview.cotNoiDung;
  //         if (res.data.code === "OK") {
  //           console.log(res)
  //           const data = JSON.parse(res.data.result.jsonResult);
  //           if (data && arrayChecked !== undefined) {
  //             var dataInfo = data[0].info;
  //             console.log("dtInfo, ArrChecked: ",dataInfo, arrayChecked);
  //             var arrayFinal = {};
  //             for (let i = 0; i < arrayChecked.length; i++) {
  //               var object = dataInfo[arrayChecked[i]] ? { [arrayChecked[i]]: dataInfo[arrayChecked[i]] } : {[arrayChecked[i]] : "undefined"};
  //               console.log("ai: "+i,arrayChecked[i]);
  //               Object.assign(arrayFinal, object);
  //             }
  //             console.log("final: asdsad ", arrayFinal);
  //             setJsonRes(arrayFinal);
  //             console.log("res ", res);
  //           }
  //         }
  //         setMessageCode({
  //           code: res.data.code,
  //           message: res.data.message,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("error at axios req: ", err);
  //         alert(err.message);
  //       });
  //   }
  // }, [preview]);

  return (
    <div className="formBody">
      {/* <Information onBindingPreview={handlePreview} /> */}
      <GetInput onBindingPreview={handlePreview} />
      <Preview preview={preview} jsonRes={jsonRes} messageCode={messageCode} />
      {/* {console.log("passing to", jsonRes)} */}
    </div>
  );
};

export default FormBody;
