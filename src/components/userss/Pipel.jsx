// components/Pipel.js

import React, { useState, useEffect } from "react";
// import useFetchUsers from '../hooks/useFet';
import toast, { Toaster } from "react-hot-toast";
// import { timeSince } from '../utils/timeUt';
import useFetchUsers from "./fetall.jsx";
import { timeSince } from "../../utils/timeUtils.js";
import "../../App.css";
import Spinner from "../fragment/Spinner.jsx";
import { API_URL, ENDPOINTS } from "../../auth/api.js";
import { getTokenFromCookie, removeToken } from "../../auth/localdt.js";
import axios from "axios";

const Pipel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const token = getTokenFromCookie();

  const {
    users,
    currentPage,
    lastPage,
    editingUser,
    setEditingUser,
    handleUpdate,
    handleChange,
    handlePageChange,
  } = useFetchUsers();

  const handleButtonClick = async (userId) => {
    try {
      setIsLoading(true);
      setLoadingUserId(userId);
      await handleUpdate(userId);
    } finally {
      setIsLoading(false);
      setLoadingUserId(null);
    }
  };

  const handlePageChangeWithLoading = async (page) => {
    setLoading(true);
    handlePageChange(page);
    setLoading(false);
  };

  const exportDT = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.RKPAGT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "member-lengap.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Data Berhasil Dieksport");
    } catch (error) {
      toast.error("Error Export Data CSV");
      console.error("Error Export Data CSV", error);
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  return (
    <div className="container px-2 w-full">
      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold dark:text-white">All Users</h2>
          <p className="text-gray-800 dark:text-white text-xs capitalize animate-pulse duration-1000">
            {" "}
            <span className="text-red-400">teks warna merah</span> = belum
            verifikasi email
          </p>
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-white tracking-wider"
              >
                Modified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <>
                {[1, 2].map((_, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-400 transition duration-200"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-3 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              Array.isArray(users) &&
              users.map((user) => (
                <tr
                  key={user.id}
                  // className="odd:bg-bag-primary even:bg-secondary even:bg-opacity-20 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  className="even:bg-opacity-20 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 text-sm text-gray-700 dark:text-white"
                >
                  <td className="px-1 py-4">
                    <div className="px-1 text-sm text-gray-700 dark:text-white">
                      {users.indexOf(user) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      className="bg-transpa w-24 focus:accent-accent focus:outline-none capitalize"
                      value={
                        editingUser && editingUser.id === user.id
                          ? editingUser.name
                          : user.name
                      }
                      onChange={(e) =>
                        handleChange(user.id, "name", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <input
                      className={`bg-transpa focus:outline-none ${
                        user.email_verified_at === null ? "text-red-500" : ""
                      }`}
                      type="email"
                      value={
                        editingUser && editingUser.id === user.id
                          ? editingUser.email
                          : user.email
                      }
                      onChange={(e) =>
                        handleChange(user.id, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-4">
                    <select
                      className="bg-transpa"
                      value={
                        editingUser && editingUser.id === user.id
                          ? editingUser.user_type_id
                          : user.user_type_id
                      }
                      onChange={(e) =>
                        handleChange(user.id, "user_type_id", e.target.value)
                      }
                    >
                      <option value="1">CEO</option>
                      <option value="2">Dev</option>
                      <option value="3">HR</option>
                      <option value="4">PM</option>
                      <option value="5">Staff</option>
                      <option value="6">Editor</option>
                      <option value="7">Magang</option>
                      <option value="8">User</option>
                      <option value="10">Freelancer</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className="bg-transpa"
                      value={
                        editingUser && editingUser.id === user.id
                          ? editingUser.status
                          : user.status
                      }
                      onChange={(e) =>
                        handleChange(user.id, "status", e.target.value)
                      }
                    >
                      {/* <select className="text-center align-baseline inline-flex px-4 py-3 items-center font-semibold text-[.95rem] leading-none text-black colprim rounded-lg" */}
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleButtonClick(user.id)}
                      style={{ transition: "ease" }}
                      className="py-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 rounded-md font-light text-sm relative whitespace-nowrap"
                    >
                      {loadingUserId === user.id ? <Spinner /> : "Update"}
                    </button>
                  </td>
                  <td className="px-1 py-4 text-xs">
                    {/* <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-black bg-orange-200 rounded-lg"> In Progress </span> */}
                    <div className="ketket">
                      {user.updated_at
                        ? timeSince(new Date(user.updated_at))
                        : "Unknown"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChangeWithLoading(currentPage - 1)}
              className="px-3 py-2 bg-secondary text-palettxt rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <span className="mx-2 dark:text-white">
              {currentPage} of {lastPage}
            </span>
            <button
              disabled={currentPage === lastPage}
              onClick={() => handlePageChangeWithLoading(currentPage + 1)}
              className="px-3 py-2 bg-secondary text-palettxt rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
          {/* <button
            onClick={exportDT}
            className="bg-palet3 text-white px-3 py-2 rounded-lg hover:translate-y-1 transition-all"
          >
            Download
          </button> */}
           {/* From Uiverse.io by 3bdel3ziz-T  */}
          <button onClick={exportDT} class="cursor-pointer group/download relative flex gap-1 px-8 py-4 bg-palet3 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 font-semibold shadow-xl active:shadow-inner transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="24px"
              width="24px"
            >
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Interface / Download">
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#f1f1f1"
                    d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                    id="Vector"
                  ></path>
                </g>
              </g>
            </svg>
            Download
            <div class="absolute text-xs uppercase scale-0 rounded-md py-2 px-2 bg-palet2 left-2/4 mb-3 bottom-full group-hover/download:scale-100 origin-bottom transition-all duration-300 shadow-lg before:content-[''] before:absolute before:top-full before:left-2/4 before:w-3 before:h-3 before:border-solid before:bg-palet3 before:rotate-45 before:-translate-y-2/4 before:-translate-x-2/4">
              anggota-lengkap.CSV
            </div>
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Pipel;
