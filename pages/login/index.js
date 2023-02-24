import { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Enter a valid Email format")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 character")
    .required("Password is required!"),
});

function Login() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `Author/Login`,
        data
      );
      if (response?.data) {
        setError(null);
        setSuccess(response.data.message);
        // set localstorage for logged in user and auth token

        localStorage.setItem("jwt", response.data?.data?.accessToken);

        formik.resetForm();
      }
    } catch (error) {
      if (error && error.response) setError(error.response.data.message);
      setSuccess(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Fragment>
      <main className="form-signin">
        <form
          style={{
            margin: "50px 0",
          }}
          onSubmit={formik.handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          {!error && success ? (
            <p style={{ textTransform: "capitalize", color: "green" }}>
              {success}
            </p>
          ) : (
            ""
          )}

          {!success && error ? (
            <p style={{ textTransform: "capitalize", color: "red" }}>{error}</p>
          ) : (
            ""
          )}

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="emailAddress"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailAddress}
            />
            {formik.touched.emailAddress && formik.errors.emailAddress ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.emailAddress}
              </p>
            ) : null}

            <label htmlFor="emailAddress">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.password}
              </p>
            ) : null}

            <label htmlFor="password">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign In
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022 MikeMilly</p>
        </form>
      </main>
    </Fragment>
  );
}

export default Login;
