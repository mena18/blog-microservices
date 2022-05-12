import React from "react";
import { Wrapper, Full } from "../components/Wrapper";

export default function Login() {
  return (
    <Wrapper>
      <Full>
        <form
          className="login"
          id="signup_form"
          method="post"
          action="{% url 'account_signup' %}"
        >
          <div className="form-group">
            <label htmlFor="id_email" className="active">
              E-mail
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="E-mail address"
              id="id_email"
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_password" className="active">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              id="id_password"
            />
          </div>

          <div className="form-group" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-success">
              Log in
            </button>
          </div>
        </form>
      </Full>
    </Wrapper>
  );
}
