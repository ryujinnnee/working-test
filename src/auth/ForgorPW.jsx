import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import React from "react";
// import { API_URL, ENDPOINTS } from "./api";
import { API_URL, ENDPOINTS } from "../auth/api";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}${ENDPOINTS.FORPW}`, {
        email,
      });

      if (response.status === 200) {
        toast.success("Password Berhasil Direset, silakan periksa email anda");
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
        toast.error(response.data.message);
        console.log(response);
      }
      setError("");
    } catch (err) {
      setError(err.response.data.error || "Terjadi kesalahan saat mengirim email.");
      setMessage("");
    }finally {
      setIsLoading(false); // Add this line
    }
  };


return (
  <>
    <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Friendz"
          src="https://friendz.id/wp-content/uploads/2024/07/logomain.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Lupa Password?
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            
            <div className="relative max-w-sm mt-2">
            <svg
              className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="johndoe@mail.co"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-blue-400 shadow-sm rounded-lg"
            />
          </div>
          </div>
  
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Reset"
              )}
            </button>
          </div>
        </form>
        {message && (
            <div className="oterrorrrsx border border-green-300 bg-green-50 p-3 rounded-md text-center mt-5 text-green-700">
            <p>
              {message}
            </p>
            </div>
          )}
          {error && (
            <div className="oterrorrrsx border border-red-300 bg-red-50 p-3 rounded-md text-center mt-5 text-red-700">
            <p>
              {error}
            </p>
            </div>
          )}
        <p className="mt-5 text-center text-sm text-gray-500">
          Back to login?{" "}
          <Link to="/login">
            <a
              href="#"
              className="font-semibold leading-6 text-blue-400 hover:text-indigo-500"
            >
              Click Here
            </a>
          </Link>
        </p>
      </div>
    </div>
    <Toaster />
  </>
);
};
export default ForgotPassword;