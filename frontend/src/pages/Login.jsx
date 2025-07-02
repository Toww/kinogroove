import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../axiosInstance";
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import { useAuth } from "../contexts/AuthContext";
import ErrorMessage from "../components/ui/ErrorMessage";

const Login = () => {
  //States
  const [error, setError] = useState();

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  // Handlers
  const onSubmit = (entries) => {
    axios
      .post("/login", { user: entries })
      .then((res) => {
        if (res.status === 200) {
          // Getting JWT from response headers
          const jwt = res.headers.authorization?.split(" ")[1];

          // If JWT is found, login and redirect to homepage
          if (jwt) {
            login(jwt);
            navigate("/feed");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          type="email"
          labelText="E-mail"
          containerClasses="mt-2"
          formState={formState}
          {...register("email", {
            required: "Email required.",
          })}
        />
        <FormInput
          id="password  "
          type="password"
          labelText="Password"
          containerClasses="mt-2"
          formState={formState}
          {...register("password", {
            required: "Password required.",
          })}
        />
        <Button type="submitInput" label="Submit" />
      </form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default Login;
