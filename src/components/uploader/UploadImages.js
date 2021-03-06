import React, { useEffect, useRef } from "react";
import "./uploadImages.css";
const UploadImages = (props) => {
  const ref = useRef();
  const [state, setState] = React.useState({
    file: null,
    base64URL: "",
  });

  useEffect(() => {
    ref.current.value = "";
    setState({
      file: null,
      base64URL: "",
    });
    console.log(props.isReset);
    console.log(state);
  }, [props.isReset]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      // console.log("done");
    });
  };

  const onImageChange = (e) => {
    let { file } = state;
    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        // console.log("File Is", file);
        setState({
          base64URL: result,
          file,
        });
        props.changeImage(file);
      })
      .catch((err) => {
        props.changeImage({ file: null, base64URL: "null img" });
      });

    setState({ file: e.target.files[0] });
  };

  return (
    <input
      className="customUploadImg"
      type="file"
      multiple
      accept="image/*"
      onChange={onImageChange}
      ref={ref}
    />
  );
};

export default UploadImages;
