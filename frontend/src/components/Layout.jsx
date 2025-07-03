import { Outlet } from "react-router";
import Button from "./ui/Button";
import { useAuth } from "../contexts/AuthContext";
import MenuItems from "../components/menu/MenuItems";
import ProfileInfo from "../components/menu/ProfileInfo";
import PostsSearch from "../components/posts/PostsSearch";
import { SearchProvider } from "../contexts/SearchContext";
import KinogrooveLogo from "../assets/kinogroove.svg?react";

const Layout = () => {
  const { isLogged, logout } = useAuth();
  return (
    <div className="mx-auto my-8 grid max-w-7xl grid-cols-12 gap-6">
      {/* Left column */}
      <nav className="col-span-3 h-26 w-full">
        <KinogrooveLogo className="w-40" />
        <ProfileInfo />
        <MenuItems />
        {isLogged && (
          <Button style="inline" onClick={logout} className="mt-8">
            Log out
          </Button>
        )}
      </nav>

      {/* Main content */}
      <div className="col-span-6">
        <Outlet />
      </div>

      {/* Right column */}
      <div className="col-span-3">
        <SearchProvider>
          <PostsSearch />
        </SearchProvider>
      </div>
    </div>
  );
};

export default Layout;
