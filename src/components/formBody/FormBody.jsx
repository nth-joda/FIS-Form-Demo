import React, { useEffect } from "react";
import "./formBody.css";
import Information from "./information/Information";
import Preview from "./preview/Preview";
import axios from "axios";

const FormBody = () => {
  const [preview, setPreview] = React.useState("");
  const [jsonRes, setJsonRes] = React.useState("");
  const handlePreview = (values) => {
    setPreview(values);
  };

  useEffect(() => {
    if (preview && preview.image.base64) {
      const body = {
        key: "MIIBSwIBADCCASwGByqGSM44BAEwggEfAoGBAP1/U4EddRIpUt9KnC7s5Of2EbdSPO9EAMMeP4C2USZpRV1AIlH7WT2NWPq/xfW6MPbLm1Vs14E7gB00b/JmYLdrmVClpJ+f6AR7ECLCT7up1/63xhv4O1fnxqimFQ8E+4P208UewwI1VBNaFpEy9nXzrith1yrv8iIDGZ3RSAHHAhUAl2BQjxUjC8yykrmCouuEC/BYHPUCgYEA9+GghdabPd7LvKtcNrhXuXmUr7v6OuqC+VdMCz0HgmdRWVeOutRZT+ZxBxCBgLRJFnEj6EwoFhO3zwkyjMim4TwWeotUfI0o4KOuHiuzpnWRbqN/C/ohNWLx+2J6ASQ7zKTxvqhRkImog9/hWuWfBpKLZl6Ae1UlZAFMO/7PSSoEFgIUJJGQo2h4cGnA4OkjSvZIgbpUXrE=",
        imageFrontBase64: preview.image.base64,
      };
      axios
        .post(
          `http://118.69.123.51:8081/c12-service/detect-text-in-image/mobile/detect-image`,
          body
        )
        .then((res) => {
          console.log(res);
          setJsonRes(res.data);
        })
        .catch((err) => {
          console.log("error at axios req: ", err);
          setJsonRes(JSON.stringify(err));
        });
    }
  }, [preview]);

  return (
    <div className="formBody">
      <Information onBindingPreview={handlePreview} />
      <Preview preview={preview} jsonRes={jsonRes} />
    </div>
  );
};

export default FormBody;
