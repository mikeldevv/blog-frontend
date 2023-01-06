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
  firstname: yup
    .string()
    .min(3, "Must have First Name")
    .required("First Name is required!"),
  lastname: yup
    .string()
    .min(3, "Must have Last Name")
    .required("Last Name is required!"),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 character")
    .required("Password is required!"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required!"),
});

function SignUp() {
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const onSubmit = async (values) => {
    const { ...data } = values;
    const response = await axios
      .post(process.env.NEXT_PUBLIC_API_URL + `Author/Register`, data)
      .catch((err) => {
        if (err && err.response) console.log("Error: ", err);
      });

    if (response && response.data) {
      setSuccess(response.data.message);
      router.replace(`/verifyuser`);
    }
  };
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      description: "",
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
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          {success ? (
            <p style={{ textTransform: "capitalize", color: "green" }}>
              {success}
            </p>
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
              name="firstname"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.firstname}
              </p>
            ) : null}

            <label htmlFor="firstname">First Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.lastname}
              </p>
            ) : null}

            <label htmlFor="lastname">Last Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.username}
              </p>
            ) : null}

            <label htmlFor="username">Username</label>
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

          <div className="form-floating">
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p style={{ textTransform: "capitalize", color: "red" }}>
                {formik.errors.description}
              </p>
            ) : null}

            <label htmlFor="description">Description</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign Up
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022 MikeMilly</p>
        </form>
      </main>
    </Fragment>
  );
}

export default SignUp;
