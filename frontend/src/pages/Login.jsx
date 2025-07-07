import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "../axiosInstance";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import FormInput from "../components/ui/FormInput";
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
        setError(err.response.data);
      });
  };

  return (
    <div>
      <p className="mb-6 text-center text-lg">Please log in</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-72">
        <FormInput
          id="email"
          type="email"
          labelText="E-mail"
          formState={formState}
          {...register("email", {
            required: "Email required.",
          })}
        />
        <FormInput
          id="password"
          type="password"
          labelText="Password"
          containerClasses="mt-4"
          formState={formState}
          {...register("password", {
            required: "Password required.",
            minLength: {
              value: 6,
              message: "Password must be min. 6 characters.",
            },
          })}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button style="outline" type="submit" className="mx-auto mt-6 w-full">
          Submit
        </Button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account ?
        </p>
        <Link to="/signup">
          <Button
            style="inline"
            type="submit"
            className="inline-block w-full text-sm"
          >
            Sign up
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
