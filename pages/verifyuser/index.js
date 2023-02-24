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
  token: yup.string().min(6).required("Please enter token!"),
});

function VerifyUser() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;
    const response = await axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL +
          `Author/VerifyUser?` +
          new URLSearchParams(data).toString(),
        data
      )
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
      router.replace(`/login`);
    }
  };
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      token: "",
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
          <h1 className="h3 mb-3 fw-normal">Account Verification</h1>
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
              type="text"
              className="form-control"
              id="floatingInput"
              name="token"
              placeholder="Token"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.token}
            />
            {formik.touched.token && formik.errors.token ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.token}
              </p>
            ) : null}
            <label htmlFor="token">Token</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Verify
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022 MikeMilly</p>
        </form>
      </main>
    </Fragment>
  );
}

export default VerifyUser;
