import React from "react";
import { Wrapper, Full } from "../components/Wrapper";

export default function signup() {
  return (
    <Wrapper>
      <Full>
        <form
          className="signup"
          id="signup_form"
          method="post"
          action="{% url 'account_signup' %}"
        >
          <div className="form-group">
            <label htmlFor="id_username" className="active">
              Username:
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
              minLength={1}
              maxLength={150}
              id="id_username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_email" className="active">
              E-mail (optional):
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="E-mail address"
              id="id_email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_password1" className="active">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              name="password1"
              placeholder="Password"
              required={false}
              id="id_password1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_password2" className="active">
              Password (again):
            </label>
            <input
              className="form-control"
              type="password"
              name="password2"
              placeholder="Password (again)"
              required={true}
              id="id_password2"
            />
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-success">
              Sign Up »
            </button>
          </div>
        </form>
      </Full>
    </Wrapper>
  );
}
