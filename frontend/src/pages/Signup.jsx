import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "../axiosInstance";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/ui/FormInput";
import ErrorMessage from "../components/ui/ErrorMessage";

const Signup = () => {
  //States
  const [error, setError] = useState();

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  // Handlers
  const onSubmit = (entries) => {
    if (entries.password !== entries.password_confirmation) {
      setError("Password confirmation doesn't match");
      return;
    }

    axios
      .post(`/signup`, { user: entries })
      .then((res) => {
        if (res.status === 200) {
          // Getting JWT from response headers
          const jwt = res.headers.authorization?.split(" ")[1];

          // Login and redirect to Feed
          if (jwt) {
            login(jwt);
            navigate("/feed");
          }
        }
      })
      .catch((err) => {
        setError(err.response.data.errors[0]);
      });
  };

  return (
    <>
      <p className="mb-6 text-center text-lg">Signin up</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-72">
        <FormInput
          id="name"
          type="text"
          labelText="Name"
          containerClasses="mt-2"
          formState={formState}
          {...register("name", {
            required: "Name required.",
          })}
        />
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
          id="password"
          type="password"
          labelText="Password"
          containerClasses="mt-2"
          formState={formState}
          {...register("password", {
            required: "Password required.",
            minLength: {
              value: 6,
              message: "Password must be min. 6 characters.",
            },
          })}
        />
        <FormInput
          type="password"
          containerClasses="mt-2"
          id="password_confirmation"
          labelText="Password confirmation"
          formState={formState}
          {...register("password_confirmation", {
            required: "Password confirmation required.",
            minLength: {
              value: 6,
              message: "Password must be min. 6 characters.",
            },
          })}
        />

        <Button style="outline" type="submit" className="mx-auto mt-6 w-full">
          Submit
        </Button>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account ?
        </p>
        <Link to="/login">
          <Button
            style="inline"
            type="submit"
            className="inline-block w-full text-sm"
          >
            Log in
          </Button>
        </Link>
      </form>

      <div>{error && <ErrorMessage>{error}</ErrorMessage>}</div>
    </>
  );
};

export default Signup;
