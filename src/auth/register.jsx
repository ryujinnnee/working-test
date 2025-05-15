import React, { useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../auth/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [userType, setUserType] = useState("staff");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${API_URL}${ENDPOINTS.REGISTER_STAFF}`, {
        name,
        email,
        password,
        password_confirmation,
        user_type: userType,
      });
      toast.success("Registration Success");
      setTimeout(() => {
        navigate("/login");
      }, 1300);
    } catch (error) {
      setError("Registration failed: " + error.response.data.message);
      toast.error("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://friendz.id/wp-content/uploads/2024/07/logomain.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={name.split(" ")[0]}
                  onChange={(e) => setName(`${e.target.value} ${name.split(" ")[1] || ""}`)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={name.split(" ")[1] || ""}
                  onChange={(e) => setName(`${name.split(" ")[0]} ${e.target.value}`)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                Re-type Password
              </label>
              <div className="mt-2">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="user_type" className="block text-sm font-medium leading-6 text-gray-900">
                  Position
                </label>
                <div className="text-sm relative group">
                  <a href="#" className="font-semibold text-blue-400 hover:text-indigo-500">
                    What is this?
                  </a>
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-gray-700 text-white text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Posisi Anda Saat ini
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="staff"
                    checked={userType === "staff"}
                    onChange={() => setUserType("staff")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">Staff</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="freelancer"
                    checked={userType === "freelancer"}
                    onChange={() => setUserType("freelancer")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">Freelance</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="magang"
                    checked={userType === "magang"}
                    onChange={() => setUserType("magang")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2">Intern</span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-blue-400 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;