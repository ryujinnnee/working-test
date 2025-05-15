import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../style/tooltip.css";
import "../style/remove.css";
// import Spinner from "../fragment/Spinner";
import { API_URL, ENDPOINTS } from "../../auth/api";
import { getTokenFromCookie } from "../../auth/localdt";
import { timeSince } from "../../utils/timeUtils";

const Rei = () => {
  const [reimbData, setreimbData] = useState([]); // To store izin data
  const [loading, setLoading] = useState(true); // For loading state
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [editingReim, setEditReim] = useState(null); // For editing task
  const [users, setUsers] = useState([]); // User selection data

  const [newReim, setNewReim] = useState({});

  const handleNewClick = () => {
    setEditReim(null);
    setNewReim({
      jenis: "",
      desc: "",
      bukti: "",
      nominal: "",
      status: "",
    }); // Set new izin state kosong
    setShowModal(true);
  };
  const token = getTokenFromCookie();
  // console.log(token);

  useEffect(() => {
    fetchIzinAll();
    fetchReimb();
  }, []);

  const fetchIzinAll = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.REI}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.reimb;
      setreimbData(data);
      console.table(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching izin data");
      console.error("Error:", error);
    }
  };

  const fetchReimb = async () => {
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

  const createReimbs = async () => {
    try {
      const formData = new FormData();
      formData.append("jenis", newReim.jenis);
      formData.append("desc", newReim.desc);
      formData.append("bukti", newReim.bukti); // file input
      //   formData.append("status", newReim.status);
      formData.append("nominal", newReim.nominal);
      // formData.append("status", newReim.status);

      console.log("Form Data:", formData); // Log form data

      const token = getTokenFromCookie();
      const userResponse = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userResponse.data.id;

      const response = await axios.post(
        `${API_URL}${ENDPOINTS.REIC.replace("{id}", userId)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data); // Log response data
      fetchIzinAll();
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
    setEditReim(izin);
    setShowModal(true);
  };

  const updateReimbs = async () => {
    try {
      const formData = new FormData();
      formData.append("jenis", editingReim.jenis);
      formData.append("desc", editingReim.desc);
      formData.append("nominal", editingReim.nominal);
      formData.append("status", editingReim.status);

      //   if (newReim.bukti) {
      //     formData.append("bukti", newReim.bukti ?? "");
      //   }

      //   formData.append("nominal", newReim.nominal ?? editingReim.nominal);
      // //   formData.append("end_day", newReim.end_day ?? editingReim.end_day);
      //   formData.append("status", newReim.status ?? editingReim.status);

      console.log("Form Data:", formData);
      const token = getTokenFromCookie();
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.REIUA.replace("{id}", editingReim.id)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      fetchIzinAll();
      setShowModal(false);
      setEditReim(null);
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
        `${API_URL}${ENDPOINTS.REID.replace("{id}", id)}`,
        deletee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchIzinAll();
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
            Reimbursement
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
                <th className="px-3 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Pemohon
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Kategori
                </th>
                {/* <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                Description
              </th> */}
                {/* <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                Doc
              </th> */}
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Desc
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Nominal
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
                  Modify
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-500 dark:text-gray-300">
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
              ) : reimbData.length > 0 ? (
                reimbData.map((izin, index) => (
                  <tr
                    key={izin.id}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 text-sm capitalize transition-colors"
                  >
                    <td className="px-3 py-3 dark:text-white text-xs">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 dark:text-white text-xs">
                      {izin.nama_pemohon}
                    </td>
                    <td className="px-4 py-3 dark:text-white text-xs">
                      {izin.jenis}
                    </td>
                    {/* <td className="px-4 py-3">{izin.desc}</td> */}
                    {/* <td className="px-4 py-3 text-xs text-gray-400 italic">
                    {izin.bukti ? (
                      <a href={`http://127.0.0.1:8000${izin.bukti}`} target="_blank" rel="noreferrer">
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
                    <td className="px-4 py-3 dark:text-white text-xs">
                      {izin.desc}
                    </td>
                    <td className="px-4 py-3 dark:text-white text-xs">
                      {izin.nominal}
                    </td>

                    <td className="px-4 py-3 dark:text-white text-xs text-gray-700">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs capitalize font-medium ${
                          izin.status === "approved"
                            ? "bg-green-100 text-green-800 bg-opacity-65"
                            : izin.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 bg-opacity-65"
                            : "bg-red-100 text-red-800 bg-opacity-65"
                        }`}
                      >
                        {izin.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 dark:text-white">
                      <p className="text-xs">
                        {izin.updated_at
                          ? timeSince(new Date(izin.updated_at))
                          : "Unknown"}
                      </p>
                    </td>
                    <td className="px-3 py-3 dark:text-white flex space-x-3">
                      <button
                        onClick={() => handleEditClick(izin)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => deleteIzin(izin.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 ml-4"
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

            <h2 className="text-xl font-bold mb-4">
              {editingReim ? "Detail Reimburst" : "Pengajuan Baru"}
            </h2>

            <div className="mb-4">
              <label
                htmlFor="jenis"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              <select
                id="jenis"
                value={editingReim ? editingReim.jenis : newReim.jenis}
                onChange={(e) =>
                  editingReim
                    ? setEditReim({ ...editingReim, jenis: e.target.value })
                    : setNewReim({ ...newReim, jenis: e.target.value })
                }
                className="w-full capitalize p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                <option value="dinas">dinas</option>
                <option value="operasonal">operasional</option>
                <option value="transport">Transport</option>
                <option value="lainnya">lainnya</option>
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
                value={editingReim ? editingReim.desc : newReim.desc}
                onChange={(e) =>
                  editingReim
                    ? setEditReim({ ...editingReim, desc: e.target.value })
                    : setNewReim({ ...newReim, desc: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
              />
            </div>
            <div className="lineemodaldoc flex">
              <div className="mb-4">
                <label
                  htmlFor="bukti"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bukti{" "}
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <input
                  type="file"
                  id="bukti"
                  onChange={(e) =>
                    setNewReim({ ...newReim, bukti: e.target.files[0] })
                  }
                  disabled={!!editingReim} // Disable if editingReim is true
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                />
              </div>

              {editingReim && editingReim.bukti && (
                <div className="mb-4">
                  <span className="block text-sm font-medium text-gray-700">
                    Recent
                  </span>
                  <a
                    href={`http://127.0.0.1:8000${editingReim.bukti}`} // Path atau URL file
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
            <div className="mergedatee flex flex-col w-full">
              <div className="mb-4">
                <label
                  htmlFor="nominal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nominal
                </label>
                {/* <input
                id="nominal"
                type="number"
                value={editingReim ? editingReim.nominal : newReim.nominal}
                onChange={(e) =>
                  editingReim
                    ? setEditReim({
                        ...editingReim,
                        nominal: e.target.value,
                      })
                    : setNewReim({ ...newReim, nominal: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
              /> */}
                <div className="relative mt-2 text-gray-500">
                  <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                    Rp
                  </span>
                  <input
                    type="number"
                    placeholder="10000"
                    value={
                      editingReim
                        ? editingReim.nominal.toString().split(".")[0]
                        : newReim.nominal.toString().split(".")[0]
                    }
                    onChange={(e) =>
                      editingReim
                        ? setEditReim({
                            ...editingReim,
                            nominal: e.target.value,
                          })
                        : setNewReim({ ...newReim, nominal: e.target.value })
                    }
                    className="w-full pl-11 py-3 appearance-none bg-transparent outline-none border focus:ring-2 focus:ring-palet2 shadow-sm rounded-lg"
                  />
                </div>
              </div>

              {editingReim && (
                <div className="mb-4">
                  <label
                    htmlFor="updated_at"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Modified
                  </label>
                  <div className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2">
                    <p>
                      {editingReim.updated_at
                        ? new Date(editingReim.updated_at).toLocaleDateString()
                        : "No date available"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {editingReim && (
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={editingReim.status}
                  onChange={(e) =>
                    setEditReim({ ...editingReim, status: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-palet2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="review">Review</option>
                </select>
              </div>
            )}

            <button
              className="w-full bg-gradient-to-r from-palet3 to-palet2 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={editingReim ? updateReimbs : createReimbs}
            >
              <strong>{editingReim ? "Perbarui" : "Ajukan"}</strong>
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Rei;
