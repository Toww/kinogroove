import { Outlet } from "react-router";

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
