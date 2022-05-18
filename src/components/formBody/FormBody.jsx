import React from "react";
import "./formBody.css";
import Preview from "./preview/Preview";
import axios from "axios";
import GetInput from "./information/GetInput";

const front_CMND =
  "MIIBSwIBADCCASwGByqGSM44BAEwggEfAoGBAP1/U4EddRIpUt9KnC7s5Of2EbdSPO9EAMMeP4C2USZpRV1AIlH7WT2NWPq/xfW6MPbLm1Vs14E7gB00b/JmYLdrmVClpJ+f6AR7ECLCT7up1/63xhv4O1fnxqimFQ8E+4P208UewwI1VBNaFpEy9nXzrith1yrv8iIDGZ3RSAHHAhUAl2BQjxUjC8yykrmCouuEC/BYHPUCgYEA9+GghdabPd7LvKtcNrhXuXmUr7v6OuqC+VdMCz0HgmdRWVeOutRZT+ZxBxCBgLRJFnEj6EwoFhO3zwkyjMim4TwWeotUfI0o4KOuHiuzpnWRbqN/C/ohNWLx+2J6ASQ7zKTxvqhRkImog9/hWuWfBpKLZl6Ae1UlZAFMO/7PSSoEFgIUJJGQo2h4cGnA4OkjSvZIgbpUXrE=";
const fake_key = `lorem ipsum dolor sit amet, consectetur adipiscing`;
const real_url = `http://118.69.123.51:8088/c12-service/detect-text-in-image/mobile/detect-image`;
const fake_url = `abc.xyz.com`;
const two_Sided_CMND =
  "MIIBSwIBADCCASwGByqGSM44BAEwggEfAoGBAP1/U4EddRIpUt9KnC7s5Of2EbdSPO9EAMMeP4C2USZpRV1AIlH7WT2NWPq/xfW6MPbLm1Vs14E7gB00b/JmYLdrmVClpJ+f6AR7ECLCT7up1/63xhv4O1fnxqimFQ8E+4P208UewwI1VBNaFpEy9nXzrith1yrv8iIDGZ3RSAHHAhUAl2BQjxUjC8yykrmCouuEC/BYHPUCgYEA9+GghdabPd7LvKtcNrhXuXmUr7v6OuqC+VdMCz0HgmdRWVeOutRZT+ZxBxCBgLRJFnEj6EwoFhO3zwkyjMim4TwWeotUfI0o4KOuHiuzpnWRbqN/C/ohNWLx+2J6ASQ7zKTxvqhRkImog9/hWuWfBpKLZl6Ae1UlZAFMO/7PSSoEFgIUJJGQo2h4cGnA4OkjSvZIgbpUXrE=";

const FormBody = () => {
  const [preview, setPreview] = React.useState("");
  const [jsonRes, setJsonRes] = React.useState({});
  const [vRes, setVRes] = React.useState({});
  const [messageCode, setMessageCode] = React.useState({
    message: "",
    code: "undefined",
  });
  function handleReset() {
    setPreview("");
    setJsonRes({});
    if (messageCode.code !== "undefined") {
      console.log("msg code", messageCode);
      setMessageCode({
        message: "Không có dữ liệu đầu vào",
        code: "noinput",
      });
    }
  }
  const handlePreview = (values) => {
    setPreview(values);
    let body = {};
    let getResponse = {};
    let getVResponse = {};

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
    });
    axios
      .post(real_url, body)
      .then((res) => {
        const arrayChecked = values.cotNoiDung;
        if (res.data.code === "OK") {
          console.log(res);
          if (res.data.result !== null) {
            const data = JSON.parse(res.data.result.jsonResult);
            if (data && arrayChecked !== undefined) {
              let list_ob = [];
              let vList_ob = [];
              data.map((item) => {
                let dataInfo = item.info;
                let infor_list = {};
                let vInfor_list = {};
                for (let i = 0; i < arrayChecked.length; i++) {
                  // let object = dataInfo[arrayChecked[i]] ? { [arrayChecked[i].field]: dataInfo[arrayChecked[i].field] }: {};
                  Object.assign(
                    infor_list,
                    dataInfo[arrayChecked[i].field]
                      ? {
                          [arrayChecked[i].field]:
                            dataInfo[arrayChecked[i].field],
                        }
                      : {}
                  );
                  Object.assign(
                    vInfor_list,
                    dataInfo[arrayChecked[i].field]
                      ? {
                          [arrayChecked[i].dpName]:
                            dataInfo[arrayChecked[i].field],
                        }
                      : {}
                  );
                }
                if (item.type === "9_id_card_back") {
                  let back_Ob = { side: "back_CMND", infor_list };
                  let vBack_Ob = { mặt: "Mặt sau CMND", vInfor_list };
                  list_ob.push(back_Ob);
                  vList_ob.push(vBack_Ob);
                } else if (item.type === "9_id_card_front") {
                  let front_Ob = { side: "front_CMND", infor_list };
                  let vFront_Ob = { mặt: "Mặt trước CMND", vInfor_list };
                  list_ob.push(front_Ob);
                  vList_ob.push(vFront_Ob);
                }
              });
              Object.assign(getResponse, list_ob);
              Object.assign(getVResponse, vList_ob);
              console.log("Get respone: ", getResponse);
              console.log("Get V respone: ", getVResponse);
              setJsonRes(getResponse);
              setVRes(getVResponse);
            } else {
              setJsonRes(res.data.message);
              setVRes(res.data.message);
            }
          }
        }
        setMessageCode({
          code: res.data.code,
          message: res.data.message,
        });
        if (!res.data.result) {
          setMessageCode({
            code: "error",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log("error at axios req: ", err);
        setMessageCode({
          code: "otherError",
          message: err.message,
        });
      });
    getResponse = {};
    console.log("Body: ", body);
    body = {};
  };

  return (
    <div className="formBody">
      {/* <Information onBindingPreview={handlePreview} /> */}
      <GetInput onBindingPreview={handlePreview} onReset={handleReset} />
      <Preview
        preview={preview}
        vRes={vRes}
        jsonRes={jsonRes}
        messageCode={messageCode}
      />
      {/* {console.log("passing to", jsonRes)} */}
    </div>
  );
};

export default FormBody;
