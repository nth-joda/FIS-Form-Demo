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