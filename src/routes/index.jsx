// Import react router dom
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Import view homepage
import Home from "../home.jsx";
import Login from "../auth/login.jsx";

// Import view posts index
import PostIndex from "../view/index.jsx";
import Profile from "../pages/profile.jsx";
import { AuthProvider } from "../auth/AuthContex.jsx";
import Register from "../auth/register.jsx";
import ProfileUpd from "../pages/UpdateProf.jsx";
import Dashboard from "../components/dash/dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route "/" */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<ProfileUpd />} />

            {/* Route "/posts" */}
            <Route path="posts" element={<PostIndex />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const MainLayout = () => {
  return (
    <div className="Appss">
      <div className="AppGlass">
        tester
        {/* <Sidebar />
        <Outlet /> */}
      </div>
    </div>
  );
};

export default App;
