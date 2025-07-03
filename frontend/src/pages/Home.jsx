import { Link } from "react-router";
import { Navigate } from "react-router";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import KinogrooveLogo from "../assets/kinogroove.svg?react";

const Home = () => {
  // Hooks
  const { isLogged } = useAuth();

  // Redirect to feed if logged, if not show welcome page
  if (isLogged) return <Navigate to="/feed" />;

  return (
    <div className="text-center">
      <div className="mx-auto -mt-4 w-72">
        <KinogrooveLogo />
      </div>

      <p className="mt-8">
        You need an account to view and share your grooves !
      </p>

      <Link to="/signup">
        <Button className="mt-6 w-72">Create Account</Button>
      </Link>

      <p className="mt-6">Already have an account ?</p>

      <Link to="/login">
        <Button type="outline" className="mt-6 w-72">
          Log in
        </Button>
      </Link>
    </div>
  );
};

export default Home;
