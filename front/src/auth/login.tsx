import React, { useState } from "react";
import { Wrapper, Full } from "../components/Wrapper";
import { useHistory } from "react-router-dom";

const parseJwt = (token: string) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const LoginRoute = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await LoginRoute(email, password);
    if (result.error) {
      alert(result.error);
    } else {
      const token_value = parseJwt(result.token);
      const obj = {
        email: token_value.user_email,
        id: token_value.user_id,
        admin: token_value.admin,
        token: result.token,
      };
      localStorage.setItem("auth", JSON.stringify(obj));
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <Full>
        <form
          onSubmit={handleSubmit}
          className="login"
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
