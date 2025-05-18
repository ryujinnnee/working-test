import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const Asrama = () => {
  const [asramas, setAsramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id_asrama: "", nama_asrama: "", gedung: "" });
  const [showModal, setShowModal] = useState(false);
  const token = getTokenFromCookie();

  useEffect(() => {
    localStorage.removeItem("asramaCache");
    fetchAsramas();
  }, []);

  const fetchAsramas = async () => {
    const cachedAsramas = localStorage.getItem("asramaCache");

    if (cachedAsramas) {
      const { data, timestamp } = JSON.parse(cachedAsramas);
      const cacheDuration = 5 * 60 * 1000;
      const now = new Date().getTime();

      if (now - timestamp < cacheDuration) {
        setAsramas(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.DORMGET}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const asramasData = response.data.asramas; // Asumsi response memiliki key 'asramas'

      setAsramas(asramasData);
      setLoading(false);

      localStorage.setItem(
        "asramaCache",
        JSON.stringify({ data: asramasData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching asramas:", error);
      console.error("Error fetching asramas:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.DORMPOST}`, // Asumsi ada endpoint DORMPOST
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAsramas([...asramas, response.data.data]); // Asumsi response memiliki key 'data'
      setFormData({ id_asrama: "", nama_asrama: "", gedung: "" });
      setShowModal(false);
      localStorage.removeItem("asramaCache");
      fetchAsramas();
      toast.success("Created Asrama Success");
    } catch (error) {
      toast.error("Error creating asrama:", error);
      console.error("Error creating asrama:", error);
    }
  };

  const handleUpdate = async (id_asrama, updatedAsrama) => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.DORMPUT.replace("{id}", id_asrama)}`, // Asumsi ada endpoint DORMPUT
        updatedAsrama,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("asramaCache");
      fetchAsramas();
      toast.success("Update Asrama Success");
    } catch (error) {
      toast.error("Error updating asrama:", error);
      console.error("Error updating asrama:", error);
    }
  };

  const deleteAsrama = async (id_asrama) => {
    try {
        await axios.delete(
            `${API_URL}${ENDPOINTS.DORMDELETE.replace("{id}", id_asrama)}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      localStorage.removeItem("asramaCache");
      fetchAsramas();
      toast.success("Asrama Deleted");
    } catch (error) {
      toast.error("Error deleting asrama:", error);
      console.error("Error deleting asrama:", error);
    }
  };

  return (
    <div className="container w-full mx-auto px-4">
      <div className="hsdfpkxxasda flex justify-between my-3">
        <h2 className="text-3xl font-semibold m-0 p-0 dark:text-white">Data Asrama</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-palet1 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Tambah Asrama
        </button>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 mx-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white dark:bg-slate-600 p-4 rounded-s">
            <span className="close text-black dark:text-white cursor-pointer bg-primary rounded-full p-1" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <input
              type="text"
              name="nama_asrama"
              required
              value={formData.nama_asrama}
              onChange={handleInputChange}
              placeholder="Nama Asrama"
              className="mr-2 dark:focus:outline-none w-full py-2 px-3 border rounded dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              name="gedung"
              required
              value={formData.gedung}
              onChange={handleInputChange}
              placeholder="Gedung"
              className="mr-2 dark:focus:outline-none w-full py-2 px-3 border rounded dark:bg-slate-700 dark:text-white mt-2"
            />
            <button onClick={handleCreate} type="submit" className="bg-primary text-white px-4 py-2 rounded hover:translate-y-1 transition mt-3">
              Buat
            </button>
          </div>
        </div>
      )}
      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                ID
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Nama Asrama
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Gedung
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Modified
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
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
                    <td className="px-6 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              asramas.map((asrama) => (
                <tr key={asrama.id_asrama}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                  <td className="px-4 py-3 w-11 text-sm text-gray-700 dark:text-white">{asrama.id_asrama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                    <input
                      className="focus:outline-none dark:bg-transparent dark:text-white"
                      type="text"
                      value={asrama.nama_asrama}
                      onBlur={(e) =>
                        handleUpdate(asrama.id_asrama, {
                          ...asrama,
                          nama_asrama: e.target.value,
                        })
                      }
                      onChange={(e) => {
                        const updatedAsramas = asramas.map((a) =>
                          a.id_asrama === asrama.id_asrama ? { ...a, nama_asrama: e.target.value } : a
                        );
                        setAsramas(updatedAsramas);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                    <input
                      className="focus:outline-none dark:bg-transparent dark:text-white"
                      type="text"
                      value={asrama.gedung}
                      onBlur={(e) =>
                        handleUpdate(asrama.id_asrama, {
                          ...asrama,
                          gedung: e.target.value,
                        })
                      }
                      onChange={(e) => {
                        const updatedAsramas = asramas.map((a) =>
                          a.id_asrama === asrama.id_asrama ? { ...a, gedung: e.target.value } : a
                        );
                        setAsramas(updatedAsramas);
                      }}
                    />
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-700 dark:text-white">
                    {asrama.updated_at
                      ? timeSince(new Date(asrama.updated_at))
                      : "Unknown"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-white">
                    <button
                      onClick={() => deleteAsrama(asrama.id_asrama)}
                      className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Asrama;