import React, { useState } from "react";
import { Wrapper, Full } from "../components/Wrapper";
import { useHistory } from "react-router-dom";

const SignupRoute = async (
  email: string,
  password: string,
  password2: string
) => {
  const response = await fetch("http://localhost:8000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      password2,
    }),
  });
  const data = await response.json();
  return data;
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== password2) {
      alert("passwords don't match");
      return;
    }

    const result = await SignupRoute(email, password, password2);

    if (result.error) {
      if (typeof result.error === "object") {
        alert(Object.values(result.error)[0]);
      } else {
        alert(result.error);
      }
    } else {
      alert("user created successfully you can login now");
      history.push("/login");
    }
  };

  return (
    <Wrapper>
      <Full>
        <form
          onSubmit={handleSubmit}
          className="signup"
          id="signup_form"
          method="post"
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
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
