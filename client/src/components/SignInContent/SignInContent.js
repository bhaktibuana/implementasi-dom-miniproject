import React from "react";
import "./SignInContent.css";

const SignInContent = () => {
  return (
    <>
      <div className="signin-content-container">
        <div className="signin-background-container">
          <img src={require("../../img/img-sign-bg.jpg")} alt="sign-bg" />
        </div>

        <div className="signin-card-container">
          <div className="signin-card">
            <p>Sign in and enjoy your shopping</p>

            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="insert your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="insert your password"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn container-fluid btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInContent;
