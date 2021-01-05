import React, { useState } from "react";
import * as Yup from "yup";

import { ErrorMessage, Form, FormField, SubmitButton } from "../forms";
import Header from "../Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Register() {
  const [error, setError] = useState();
  const handleSubmit = ({ email, password }) => {
    console.log({ email, password });
  };
  return (
    <div>
      <Header />
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60vh",
            justifyContent: "center",
          }}
        >
          <h4>Sign Up</h4>
          <FormField name="name" placeholder="Name" />
          <FormField name="email" placeholder="Email" />
          <FormField name="password" placeholder="Password" />

          <SubmitButton
            title="Register"
            customStyle={{ backgroundColor: "#ff742b" }}
          />
        </div>
      </Form>
    </div>
  );
}

export default Register;
