import React, { useState } from "react";
import * as Yup from "yup";

import { ErrorMessage, Form, FormField, SubmitButton } from "../forms";
import Header from "../Header";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login() {
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password }) => {
    console.log({ email, password });
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
          <FormField name="password" placeholder="Password" />
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
