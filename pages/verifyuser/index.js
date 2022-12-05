import { Fragment, useState } from "react";

function VerifyUser() {
  const [emailAddress, setEmailAddress] = useState("");
  const [token, setToken] = useState("");

  const handleEmailAddressChange = (value) => {
    setEmailAddress(value);
  };
  const handleTokenChange = (value) => {
    setToken(value);
  };

  const verifyuserHandler = async (e) => {
    e.preventDefault();

    const data = {
      emailAddress: emailAddress,
      token: token,
    };

    const options = {
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_API_URL + `Author/VerifyUser`,
    };
    fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `Author/VerifyUser?` +
        new URLSearchParams(data).toString(),
      options
    )
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
          onSubmit={verifyuserHandler}
        >
          <h1 className="h3 mb-3 fw-normal">Account Verification</h1>

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
              placeholder="Token"
              onChange={(e) => handleTokenChange(e.target.value)}
            />
            <label htmlFor="floatingPassword">Token</label>
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
