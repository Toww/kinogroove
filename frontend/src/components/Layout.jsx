import { Outlet, useNavigate } from "react-router";
import Button from "./ui/Button";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  // Hooks
  const { isLogged, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto my-8 max-w-2xl">
      {isLogged && (
        <nav className="mb-8 flex w-full justify-between border-b pb-2 text-right">
          <span>Welcome</span>
          <Button type="inline" label="Log out" onClick={logout} />
        </nav>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
