import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-6xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
