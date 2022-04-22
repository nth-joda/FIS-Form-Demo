import "./App.css";

import FormikForm from "./components/Forms/FormikForm";
import MyForm from "./components/Forms/MyForm";
import PopupForm from "./components/popupForm/PopupForm";

function App() {
  return (
    <div className="App">
      {/* <p>----------FORM------------</p>
      <MyForm />
      <p>----------FORM - FORMIK COMPONENT------------</p>
      <FormikForm /> */}
      <PopupForm />
    </div>
  );
}

export default App;
