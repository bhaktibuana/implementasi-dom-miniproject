import React from "react";
import "./SignUpContent.css";

const SignUpContent = () => {
  return (
    <>
      <div className="signup-content-container">
        <div className="signup-background-container">
          <img src={require("../../img/img-sign-bg.jpg")} alt="sign-bg" />
        </div>

        <div className="signup-card-container">
          <div className="signup-card">
            <p>Create your account for free!</p>

            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                  placeholder="insert your full name"
                />
              </div>
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

              <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="insert your password"
                />
              </div>
              <button type="submit" className="btn container-fluid btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpContent;
