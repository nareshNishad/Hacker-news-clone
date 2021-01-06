import React, { useState } from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { ErrorMessage, Form, FormField, SubmitButton } from "../forms";
import Header from "../Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Register() {
  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = ({ name, email, password }) => {
    const requestBody = {
      query: `mutation {createUser(userInput: {name: "${name}" , email: "${email}", password: "${password}"}) { name }}`,
    };

    fetch("https://login-setup.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          return setError(resData.errors[0].message);
        }
        sessionStorage.setItem("user", resData.data.createUser.name);
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
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
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
          <FormField name="password" placeholder="Password" type="password" />
          <ErrorMessage error={error} visible={error} />

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
