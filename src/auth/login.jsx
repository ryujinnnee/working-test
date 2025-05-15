import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../auth/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContex";
import toast, { Toaster } from "react-hot-toast";
import { setToken } from "./localdt";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [rememberUsername, setRememberUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberUsername(true);
    }
  }, []);

  const saveUsernameToLocalStorage = () => {
    if (rememberUsername) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setError("");

    try {
      saveUsernameToLocalStorage();
      const response = await axios.post(`${API_URL}${ENDPOINTS.LOGIN_STAFF}`, {
        username,
        password,
      });

      toast.success("Login successful!");
      setToken(response.data.access_token);
      setUserData(response.data.user)
      setIsLogin(true);
      
      setTimeout(() => navigate("/dashboard"), 1500);
    }catch (error) {
      console.error("Login error:", error);
      const errorMsg = error?.response?.data?.error || "Unknown error";
      toast.error("Login failed: " + errorMsg);
    }
     finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to continue
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <div className="relative max-w-sm mt-2">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14c2.5 0 4.5-2 4.5-4.5S14.5 5 12 5s-4.5 2-4.5 4.5S9.5 14 12 14zm0 2c-3 0-9 1.5-9 4.5V22h18v-1.5c0-3-6-4.5-9-4.5z"
                  />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="yourusername"
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-blue-400 shadow-sm rounded-lg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold text-blue-400 hover:text-indigo-500">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative max-w-sm mt-2">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15c1.5 0 2.7-1.2 2.7-2.7V10.5A2.7 2.7 0 0012 7.8a2.7 2.7 0 00-2.7 2.7v1.8C9.3 13.8 10.5 15 12 15zM5.4 21h13.2C19.2 21 20 20.2 20 19.2V17.7c0-1.1-.9-2-2-2H6.9c-1.1 0-2 .9-2 2v1.5C4.8 20.2 5.6 21 6.6 21z"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-blue-400 shadow-sm rounded-lg"
                />
              </div>
            </div>

            {/* Remember Username */}
            <div>
              <label className="inline-flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberUsername}
                  onChange={() => setRememberUsername(!rememberUsername)}
                  className="h-4 w-4 text-blue-400 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2">Remember Username</span>
              </label>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                // disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none disabled:opacity-70"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A7.96 7.96 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link to="/register" className="font-semibold text-blue-400 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
