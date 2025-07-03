import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { PostsProvider } from "./contexts/PostsContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <PostsProvider>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route element={<Layout />}>
                <Route
                  path="/feed"
                  element={
                    <ProtectedRoute>
                      <Feed />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </PostsProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
