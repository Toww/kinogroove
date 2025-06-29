import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import LinkButton from "../components/ui/LinkButton";

const Home = () => {
  // Hooks
  const { isLogged } = useAuth();

  // Redirect to feed if logged, if not show welcome page
  if (isLogged) return <Navigate to="/feed" />;

  return (
    <div className="text-center">
      <h2 className="text-teal-400 font-bold text-lg mb-2">
        Welcome to Kinogroove !
      </h2>

      <p>You need an account to view and share your grooves !</p>

      <LinkButton url="/signup" label="Create Account" className="mt-4" />

      <p className="mt-4">Already have an account ?</p>

      <LinkButton url="/login" label="Log in" className="mt-4" />
    </div>
  );
};

export default Home;
