import { Fragment, useState } from "react";

function SignUp() {
  const [emailAddress, setEmailAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const handleEmailAddressChange = (value) => {
    setEmailAddress(value);
  };
  const handleFirstNameChange = (value) => {
    setFirstname(value);
  };
  const handleLastNameChange = (value) => {
    setLastname(value);
  };
  const handleUsernameChange = (value) => {
    setUsername(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const data = {
      EmailAddress: emailAddress,
      FirstName: firstname,
      LastName: lastname,
      Username: username,
      Password: password,
      Description: description,
    };

    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + `Author/Register`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(process.env.NEXT_PUBLIC_API_URL + `Author/Register`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <main className="form-signin">
        <form
          style={{
            margin: "50px 0",
          }}
          onSubmit={signupHandler}
        >
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => handleEmailAddressChange(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="First Name"
              onChange={(e) => handleFirstNameChange(e.target.value)}
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Last Name"
              onChange={(e) => handleLastNameChange(e.target.value)}
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating">
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Description"
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
            <label htmlFor="floatingInput">Description</label>
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
