import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../axiosInstance";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/signup", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      // Getting JWT from response headers
      const jwt = res.headers.authorization?.split(" ")[1];

      // login and redirect to Feed
      if (jwt) {
        login(jwt);
        navigate("/feed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default Signup;
