# FORMIK vs YUP

---

## 1. Formik

Form field management:

- Used by `hook`:

```js
const formik = useFormik({
  initialValues: {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  validationSchema: Yup.object({
    full_name: Yup.string()
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required!"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Required!"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Password's not match")
      .required("Required!"),
  }),
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },
});
```

then `<form>...</form>` can access via `formik` variable:

```jsx
<form onSubmit={formik.handleSubmit}>
  <div>
    <label>Full Name</label>
    <input
      type="text"
      name="full_name"
      value={formik.values.fullname}
      onChange={formik.handleChange}
    />
    {formik.errors.full_name && formik.touched.full_name && (
      <p>{formik.errors.full_name}</p>
    )}
  </div>
  <div>
    <label>Email</label>
    <input
      type="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
    />
    {formik.errors.email && formik.touched.email && (
      <p>{formik.errors.email}</p>
    )}
  </div>
  <div>
    <label>Password</label>
    <input
      type="password"
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
    />
    {formik.errors.password && formik.touched.password && (
      <p>{formik.errors.password}</p>
    )}
  </div>
  <div>
    <label>Confirm Password</label>
    <input
      type="password"
      name="confirm_password"
      value={formik.values.confirm_password}
      onChange={formik.handleChange}
    />
    {formik.errors.confirm_password && formik.touched.confirm_password && (
      <p>{formik.errors.confirm_password}</p>
    )}
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
```

- Used by `<Formik></Formik>` **component**:

```js
<Formik
  initialValues={{ email: "", password: "" }}
  validate={(values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    /* and other goodies */
  }) => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {errors.email && touched.email && errors.email}
      <input
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {errors.password && touched.password && errors.password}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )}
</Formik>
```

- Formik properties:
  - `dirty: boolean` == ` inital_Value ? false : true`
  - `errors: { [field: string]: string }` ? `validationSchema` (Yup)

* Ref:
  - https://formik.org/docs/overview
  - https://viblo.asia/p/react-form-validation-voi-formik-yup-maGK7Jgb5j2
