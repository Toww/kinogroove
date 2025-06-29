import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  // Hooks
  const { isLogged, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="my-8 mx-auto max-w-2xl">
      {isLogged && (
        <nav className="flex justify-between border-b pb-2 mb-8 text-right w-full">
          <span>Welcome</span>
          <button
            className="inline-block cursor-pointer leading-none underline"
            onClick={logout}
          >
            Log out
          </button>
        </nav>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
