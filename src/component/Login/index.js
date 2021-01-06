import React, { useState } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { ErrorMessage, Form, FormField, SubmitButton } from "../forms";
import Header from "../Header";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login() {
  const [loginFailed, setLoginFailed] = useState(false);
  const history = useHistory();

  const handleSubmit = ({ email, password }) => {
    setLoginFailed(false);
    const requestBody = {
      query: `query {login( email: "${email}", password: "${password}") { userId } }`,
    };

    fetch("https://login-setup.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log({ res });
        if (res.status !== 200 && res.status !== 201) {
          setLoginFailed(true);
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          return setLoginFailed(true);
        }
        sessionStorage.setItem("user", resData.data.login.userId);
        history.push("/");
        console.log({ resData });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60vh",
            justifyContent: "center",
          }}
        >
          <h4>Sign In</h4>
          <FormField name="email" placeholder="Email" />
          <FormField name="password" placeholder="Password" type="password" />
          <SubmitButton
            title="Login"
            customStyle={{ backgroundColor: "#ff742b" }}
          />
        </div>
      </Form>
    </div>
  );
}

export default Login;
