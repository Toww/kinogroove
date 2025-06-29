import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../axiosInstance";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", {
        user: { email, password },
      });
      // Getting JWT from response headers
      const jwt = res.headers.authorization?.split(" ")[1];

      // If JWT is found, login and redirect to homepage
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
