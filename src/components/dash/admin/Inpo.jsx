import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
// import Spinner from "../fragment/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useInpo } from "./useInpo";

const Inp = () => {
  //   const [inpo, setInpo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const { inpo, loading, fetchInpo, handleCreate } = useInpo();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInpo();
  }, []);

  const onSubmit = async () => {
    const success = await handleCreate(formData);
    if (success) {
      setFormData({ id: "", title: "", content: "" });
      setShowModal(false);
    }
  };

  //   const fetchInpo = async () => {
  //     const cachedRek = localStorage.getItem("inpoCache");

  //     if (cachedRek) {
  //       const { data, timestamp } = JSON.parse(cachedRek);

  //       const cacheDuration = 5 * 60 * 1000;
  //       const now = new Date().getTime();

  //       if (now - timestamp < cacheDuration) {
  //         setInpo(data);
  //         setLoading(false);
  //         return;
  //       }
  //     }
  //     try {
  //       const token = getTokenFromCookie();
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }
  //       const response = await axios.get(`${API_URL}${ENDPOINTS.INP}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const rekData = response.data;
  //       setInpo(rekData);
  //       // console.table(rekData);
  //       setLoading(false);

  //       localStorage.setItem(
  //         "inpoCache",
  //         JSON.stringify({ data: rekData, timestamp: new Date().getTime() })
  //       );
  //     } catch (error) {
  //       toast.error("Error fetching inpo:", error);
  //       console.error("Error fetching inpo:", error);
  //     }
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleInputChangeNum = (event) => {
  //     // Ambil nilai input
  //     const { value } = event.target;

  //     // Hanya izinkan angka
  //     const numericValue = value.replace(/[^0-9]/g, "");

  //     // Update state dengan nilai numerik
  //     setFormData({ ...formData, norek: numericValue });
  //   };

  //   const handleCreate = async () => {
  //     try {
  //       const token = getTokenFromCookie();
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }
  //       const response = await axios.post(
  //         `${API_URL}${ENDPOINTS.INPN}`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setInpo([...inpo, response.data]);
  //       setFormData({ id: "", title: "", content: ""});
  //       setShowModal(false);
  //       toast.success("Broadcast Successful");
  //       localStorage.removeItem("inpoCache");
  //       fetchInpo();
  //     } catch (error) {
  //       console.error("Error creating inpo:", error);
  //       toast.error("err", error);
  //     }
  //   };

  const handleUpdate = async (id, updatedAccount) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.post(
        `${API_URL}${ENDPOINTS.INPU.replace("{id}", id)}`,
        updatedAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("inpoCache");
      fetchInpo();
      toast.success("Update Successful");
    } catch (error) {
      toast.error("Error updating inpo:", error);
      console.error("Error updating inpo:", error);
    }
  };

  const deleteInpo = async (id) => {
    try {
      const token = getTokenFromCookie();
      await axios.post(
        `${API_URL}${ENDPOINTS.INPD.replace("{id}", id)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("inpoCache");
      fetchInpo();
      toast.success("Broadcast Deleted");
    } catch (error) {
      toast.error("Error deleting inpo:", error);
      console.error("Error deleting inpo:", error);
    }
  };

  return (
    <div className="container w-full py-5">
      <div className="feslen w-full items-center justify-between flex">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          All Broadcast
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="mb-6 bg-gradient-to-r from-palet3 to-palet2 text-white px-5 py-2 rounded-xl shadow-lg hover:translate-y-1 duration-200"
        >
          New Message
        </button>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-20 backdrop-blur-sm transition-all">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative w-full max-w-md">
            <div className="flex space-x-2 absolute top-4 right-4">
              {/* Red circle */}
              <span
                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                onClick={() => setShowModal(false)}
              />
              {/* Yellow circle */}
              <span
                className="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 transition"
                onClick={() => setShowModal(false)}
              />
              {/* Green circle */}
              <span
                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                onClick={() => setShowModal(false)}
              />
            </div>

            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Broadcast New
            </h3>

            {/* Redesigned input field with an icon */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Title
            </label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.94 2.94a10 10 0 1114.12 14.12A10 10 0 012.94 2.94zM14 8h-4V6h4V4h-4a2 2 0 00-2 2v4h6v2H8v-2H6v2a2 2 0 002 2h6v-2h-4v-2z" />
                </svg>
              </span>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Info"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Other fields (Bank Name, Atas Nama, etc.) follow the same style */}
            <label className="block text-sm capitalize font-medium text-gray-700 dark:text-gray-200 mb-2">
              Content
            </label>
            <input
              type="text"
              name="content"
              required
              value={formData.content}
              onChange={handleInputChange}
              placeholder="pengumumam"
              className="w-full mb-4 px-4 py-2 capitalize border border-gray-300 rounded-lg focus:ring-2 focus:ring-palet3 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Rekening
            </label>
            <input
              type="text"
              name="norek"
              inputMode="numeric"
              required
              value={formData.norek}
              onChange={handleInputChangeNum}
              placeholder="123123"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            /> */}
            <button
              onClick={onSubmit}
              type="submit"
              className="w-full bg-gradient-to-r from-palet3 to-palet2 text-white font-medium px-4 py-2 rounded-lg shadow-lg hover:translate-y-1 duration-200"
            >
              Infokan
            </button>
          </div>
        </div>
      )}
      <div className="bg-white overflow-x-auto dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-200 capitalize">
            <thead className="bg-gray-100 dark:bg-gray-500">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  judul
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Konten
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  modified
                </th>
                <th className="px-9 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
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
                    </tr>
                  ))}
                </>
              ) : (
                inpo.map((inpos) => (
                  <tr
                    key={inpos.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 text-gray-700 text-sm dark:text-white">
                      {inpo.indexOf(inpos) + 1}
                    </td>
                    <td className="px-4 py-4">
                      <input
                        className="focus:outline-none capitalize w-24 dark:bg-gray-700 text-sm text-gray-700 dark:text-white"
                        type="text"
                        value={inpos.title}
                        readOnly
                      />
                    </td>
                    <td className="px-4 py-4 w-32 capitalize text-sm text-gray-700 dark:text-white">
                      <input
                        className="focus:outline-none capitalize dark:bg-gray-700 dark:text-white"
                        type="text"
                        value={inpos.content}
                        readOnly
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-white">
                      <span>
                        {new Date(inpos.updated_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-9 py-4">
                      <button
                        onClick={() => deleteInpo(inpos.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Inp;
