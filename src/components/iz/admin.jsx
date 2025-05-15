import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../style/tooltip.css";
import "../style/remove.css";
// import Spinner from "../fragment/Spinner";
import { API_URL, ENDPOINTS } from "../../auth/api";
import { getTokenFromCookie } from "../../auth/localdt";
import { timeSince } from "../../utils/timeUtils";

const Aiz = () => {
  const [izinData, setIzinData] = useState([]); // To store izin data
  const [loading, setLoading] = useState(true); // For loading state
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [editingIzin, setEditingIzin] = useState(null); // For editing task
  const [users, setUsers] = useState([]); // User selection data
  // const linkMain = useState("https://www.google.com");
  // const [newIzin, setNewIzin] = useState({

  //   title: "",
  //   description: "",
  //   doc_opt: "",
  //   for: [],
  //   deadline: "",
  //   status: "",
  // });
  const [newIzin, setNewIzin] = useState({});
  const handleNewClick = () => {
    setEditingIzin(null); // Bersihkan editingIzin
    setNewIzin({
      tipe: "",
      description: "",
      doc_opt: "",
      start_day: "",
      end_day: "",
      status: "",
    }); // Set new izin state kosong
    setShowModal(true);
  };
  const token = getTokenFromCookie();
  // console.log(token);

  useEffect(() => {
    fetchIzin();
    fetchUsers();
  }, []);

  const fetchIzin = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.GTIZ}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.izin.map((item) => ({
        ...item,
        for: Array.isArray(item.for) ? item.for : [item.for].filter(Boolean),
      }));
      setIzinData(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching izin data");
      console.error("Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ALLUS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userOptions = response.data.users.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsers(userOptions);
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error:", error);
    }
  };

  // const createIzin = async () => {
  //   try {
  //     const token = getTokenFromCookie();
  //     const userResponse = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const userId = userResponse.data.id;
  //     await axios.post(
  //       `${API_URL}${ENDPOINTS.CREIZ.replace("{id}", userId)}`,
  //       newIzin,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     fetchIzin();
  //     setShowModal(false);
  //     toast.success("Izin created successfully");
  //   } catch (error) {
  //     toast.error("Error creating izin");
  //     console.error("Error:", error);
  //   }
  // };

  const createIzin = async () => {
    try {
      const formData = new FormData();
      formData.append("tipe", newIzin.tipe);
      formData.append("desc", newIzin.desc);
      formData.append("doc_opt", newIzin.doc_opt); // file input
      formData.append("start_day", newIzin.start_day);
      formData.append("end_day", newIzin.end_day);
      // formData.append("status", newIzin.status);

      console.log("Form Data:", formData); // Log form data

      const token = getTokenFromCookie();
      const userResponse = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userResponse.data.id;

      const response = await axios.post(
        `${API_URL}${ENDPOINTS.CREIZ.replace("{id}", userId)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data); // Log response data
      fetchIzin();
      setShowModal(false);
      toast.success("Izin created successfully");
    } catch (error) {
      toast.error("Error creating izin");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      ); // Log error response
    }
  };

  const handleEditClick = (izin) => {
    setEditingIzin(izin);
    setShowModal(true);
  };

  // const updateIzin = async () => {
  //   try {
  //     await axios.post(
  //       `${API_URL}${ENDPOINTS.UPIZID.replace("{id}", editingIzin.id)}`,
  //       editingIzin,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     fetchIzin();
  //     setShowModal(false);
  //     setEditingIzin(null);
  //     toast.success("Izin updated successfully");
  //   } catch (error) {
  //     toast.error("Error updating izin");
  //     console.error("Error:", error);
  //   }
  // };

  const updateIzin = async () => {
    try {
      const formData = new FormData();
      formData.append("tipe", newIzin.tipe ?? editingIzin.tipe);
      formData.append("desc", newIzin.desc ?? editingIzin.desc);

      if (newIzin.doc_opt) {
        formData.append("doc_opt", newIzin.doc_opt ?? "");
      }

      formData.append("start_day", newIzin.start_day ?? editingIzin.start_day);
      formData.append("end_day", newIzin.end_day ?? editingIzin.end_day);
      formData.append("status", newIzin.status ?? editingIzin.status);

      console.log("Form Data:", formData);
      const token = getTokenFromCookie();
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.UPIZID.replace("{id}", editingIzin.id)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      fetchIzin();
      setShowModal(false);
      setEditingIzin(null);
      toast.success("Izin updated successfully");
    } catch (error) {
      toast.error("Error updating izin");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteIzin = async (id, deletee) => {
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.DELIZ.replace("{id}", id)}`,
        deletee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchIzin();
      toast.success("Izin deleted successfully");
    } catch (error) {
      toast.error("Error deleting izin");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 rounded-lg">
      <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <div className="flex justify-between items-center my-3 pb-1">
          <h1 className="text-3xl max-md:text-xl font-extrabold capitalize dark:text-white">
            izin management
          </h1>
          <button
            className="bg-gradient-to-r from-palet2 to-palet3 text-white px-6 py-3 max-md:px-3 max-md:py-2 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
            onClick={handleNewClick}
          >
            Pengajuan
          </button>
        </div>
        <div
          className="overflow-x-auto rounded-md"
          style={{ minHeight: "30dvh" }}
        >
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg dark:bg-gray-800 border border-gray-300 shadow-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr className="text-sm leading-normal bg-gray-100 dark:bg-gray-400 hover:bg-gray-200">
                <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Pemohon
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Tipe
                </th>
                {/* <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                Description
              </th> */}
                {/* <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                Doc
              </th> */}
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Start Day
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  End Day
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Modify
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Actions
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
                      <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                        <div className="h-2 w-7 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                        <div className="h-2 w-7 bg-gray-300 rounded"></div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : izinData.length > 0 ? (
                izinData.map((izin, index) => (
                  <tr
                    key={izin.id}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-3 py-3 text-sm dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-white">
                      {izin.nama_pemohon}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-white">
                      {izin.tipe}
                    </td>
                    {/* <td className="px-4 py-3">{izin.desc}</td> */}
                    {/* <td className="px-4 py-3 text-xs text-gray-400 italic">
                    {izin.doc_opt ? (
                      <a href={`http://127.0.0.1:8000${izin.doc_opt}`} target="_blank" rel="noreferrer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="16"
                          height="16"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM12 18H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V8h8v2z" />
                        </svg>
                      </a>
                    ) : (
                      "No Document"
                    )}
                  </td> */}
                    <td className="px-4 py-3 text-sm dark:text-white text-gray-700">
                      <p className="text-sm">
                        {new Date(izin.start_day).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-white text-gray-700">
                      <p className="text-sm">
                        {new Date(izin.end_day).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-white text-gray-700">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs capitalize font-medium ${
                          izin.status === "approved"
                            ? "bg-green-100 bg-opacity-65 text-green-800"
                            : izin.status === "pending"
                            ? "bg-yellow-100 bg-opacity-65 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {izin.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-white">
                      <p className="text-sm">
                        {izin.updated_at
                          ? timeSince(new Date(izin.updated_at))
                          : "Unknown"}
                      </p>
                    </td>
                    <td className="px-3 py-3 dark:text-white flex space-x-3">
                      <button
                        onClick={() => handleEditClick(izin)}
                        className="text-blue-500 text-sm hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => deleteIzin(izin.id)}
                        className="text-red-500 text-sm hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 ml-4"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-gray-50 transition-colors duration-300 dark:text-white">
                  <td colSpan={10} className="px-4 py-3 text-center">
                    no data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-blur-sm transition-all">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative w-full max-w-md">
            <div className="flex space-x-2 absolute top-4 right-4">
              <span
                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                onClick={() => setShowModal(false)}
              />
              <span
                className="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 transition"
                onClick={() => setShowModal(false)}
              />
              <span
                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                onClick={() => setShowModal(false)}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {editingIzin ? "Detail Izin" : "Pengajuan Baru"}
            </h2>

            <div className="mb-4">
              <label
                htmlFor="tipe"
                className="block text-sm font-medium text-gray-700"
              >
                Tipe
              </label>
              <select
                id="tipe"
                value={editingIzin ? editingIzin.tipe : newIzin.tipe}
                onChange={(e) =>
                  editingIzin
                    ? setEditingIzin({ ...editingIzin, tipe: e.target.value })
                    : setNewIzin({ ...newIzin, tipe: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
              >
                <option value="" disabled>
                  Pilih tipe
                </option>
                <option value="izin">Izin</option>
                <option value="cuti">Cuti</option>
                {/* <option value="sakit">Sakit</option> */}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                value={editingIzin ? editingIzin.desc : newIzin.desc}
                onChange={(e) =>
                  editingIzin
                    ? setEditingIzin({ ...editingIzin, desc: e.target.value })
                    : setNewIzin({ ...newIzin, desc: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
              />
            </div>
            <div className="lineemodaldoc flex">
              <div className="mb-4">
                <label
                  htmlFor="doc_opt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doc <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                {/* <input
                  type="file"
                  id="doc_opt"
                  onChange={(e) =>
                    setNewIzin({ ...newIzin, doc_opt: e.target.files[0] })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                /> */}
              </div>

              {/* {editingIzin && editingIzin.doc_opt && (
                <div className="mb-4">
                  <span className="block text-sm font-medium text-gray-700">
                    Recent
                  </span>
                  <a
                    href={`http://127.0.0.1:8000${editingIzin.doc_opt}`} // Path atau URL file
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </div>
              )} */}
            </div>
            <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer text-center p-4 md:p-8"
              >
                <svg
                  className="w-10 h-10 mx-auto"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                    stroke="#4F46E5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                  Click to{" "}
                  <span className="font-medium text-indigo-600">
                    Upload your file
                  </span>
                </p>
                {editingIzin && editingIzin.doc_opt && (
                  <a
                    href={`http://127.0.0.1:8000${editingIzin.doc_opt}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline capitalize text-sm"
                  >
                    recent doc
                  </a>
                )}
              </label>
              <input
                type="file"
                className="hidden"
                id="file"
                onChange={(e) =>
                  setNewIzin({ ...newIzin, doc_opt: e.target.files[0] })
                }
              />
            </div>
            <div className="mergedatee flex justify-between">
              <div className="mb-4">
                <label
                  htmlFor="start_day"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Day
                </label>
                <input
                  id="start_day"
                  type="date"
                  value={
                    editingIzin ? editingIzin.start_day : newIzin.start_day
                  }
                  onChange={(e) =>
                    editingIzin
                      ? setEditingIzin({
                          ...editingIzin,
                          start_day: e.target.value,
                        })
                      : setNewIzin({ ...newIzin, start_day: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_day"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Day
                </label>
                <input
                  id="end_day"
                  type="date"
                  value={editingIzin ? editingIzin.end_day : newIzin.end_day}
                  onChange={(e) =>
                    editingIzin
                      ? setEditingIzin({
                          ...editingIzin,
                          end_day: e.target.value,
                        })
                      : setNewIzin({ ...newIzin, end_day: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                />
              </div>
            </div>
            {editingIzin && (
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={editingIzin.status}
                  onChange={(e) =>
                    setEditingIzin({ ...editingIzin, status: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}

            <button
              className="w-full bg-gradient-to-r from-palet3 to-palet2 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={editingIzin ? updateIzin : createIzin}
            >
              <strong>{editingIzin ? "Perbarui" : "Ajukan"}</strong>
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Aiz;
