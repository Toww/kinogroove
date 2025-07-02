import { Link } from "react-router";
import { Navigate } from "react-router";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  // Hooks
  const { isLogged } = useAuth();

  // Redirect to feed if logged, if not show welcome page
  if (isLogged) return <Navigate to="/feed" />;

  return (
    <div className="text-center">
      <h2 className="mb-2 text-lg font-bold text-teal-400">
        Welcome to Kinogroove !
      </h2>

      <p>You need an account to view and share your grooves !</p>

      <Link to="/signup">
        <Button className="mt-4" label="Create Account" />
      </Link>

      <p className="mt-4">Already have an account ?</p>

      <Link to="/login">
        <Button className="mt-4" label="Log in" />
      </Link>
    </div>
  );
};

export default Home;
