import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const Santri = () => {
  const [santriList, setSantriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    NIS: "",
    nama_santri: "",
    alamat: "",
    id_asrama: "",
    total_paket_diterima: ""
  });
  const [showModal, setShowModal] = useState(false);
  const token = getTokenFromCookie();
  const [asramaList, setAsramaList] = useState([]);

  useEffect(() => {
    localStorage.removeItem("santriCache");
    fetchSantri();
    getAsrama();
  }, []);

  const getAsrama = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.DORMGET}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const asramaList = response.data.asramas;
      setAsramaList(asramaList);
      console.log("Asrama List:", asramaList);
    } catch (error) {
      console.error("Error fetching asrama:", error);
      toast.error("Gagal mengambil data asrama");
    }
  };

  const fetchSantri = async () => {
    const cached = localStorage.getItem("santriCache");

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const cacheDuration = 5 * 60 * 1000;
      const now = new Date().getTime();

      if (now - timestamp < cacheDuration) {
        setSantriList(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.SANTRIGET}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data.data;
      setSantriList(data);
      setLoading(false);
      localStorage.setItem(
        "santriCache",
        JSON.stringify({ data, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching santri");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.SANTRIPOST}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSantriList([...santriList, response.data]);
      setFormData({
        NIS: "",
        nama_santri: "",
        alamat: "",
        id_asrama: "",
        total_paket_diterima: ""
      });
      setShowModal(false);
      localStorage.removeItem("santriCache");
      fetchSantri();
    } catch (error) {
      console.error("Error creating santri:", error);
      toast.error("Gagal tambah santri");
    }
  };

  const handleUpdate = async (NIS, updated) => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.SANTRIPUT.replace("{nis}", NIS)}`,
        updated,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("santriCache");
      fetchSantri();
      toast.success("Update berhasil");
    } catch (error) {
      toast.error("Gagal update");
      console.error(error);
    }
  };

  const deleteSantri = async (NIS) => {
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.SANTRIDELETE.replace("{nis}", NIS)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("santriCache");
      fetchSantri();
      toast.success("Santri dihapus");
    } catch (error) {
      toast.error("Gagal hapus");
      console.error(error);
    }
  };
  
  return (
    <div className="container w-full mx-auto px-4">
      <div className="flex justify-between my-3">
        <h2 className="text-3xl font-semibold dark:text-white">Data Santri</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Tambah Santri
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-700 p-5 rounded shadow-md w-full max-w-md space-y-3">
            <span
              className="text-black dark:text-white cursor-pointer float-right"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            {["NIS", "nama_santri", "alamat", "total_paket_diterima"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={field}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            ))}
            <select
              name="id_asrama"
              value={formData.id_asrama}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            >
              <option value="">Select Asrama</option>
              {asramaList.map((asrama) => (
                <option key={asrama.id_asrama} value={asrama.id_asrama}>
                  {asrama.nama_asrama}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-700 p-5 rounded shadow overflow-x-auto mt-5">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              {["NIS", "Nama", "Alamat", "Asrama", "Total Paket", "Terakhir Update", "Aksi"].map((th) => (
                <th key={th} className="px-4 py-2 text-left text-sm font-medium dark:text-white text-gray-700">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-5">Loading...</td></tr>
            ) : (
              santriList.map((s) => (
                <tr key={s.NIS} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-2 text-sm dark:text-white">{s.NIS}</td>
                  <td className="px-4 py-2 text-sm dark:text-white">
                    <input
                      value={s.nama_santri}
                      onChange={(e) => {
                        const updated = santriList.map((x) =>
                          x.NIS === s.NIS ? { ...x, nama_santri: e.target.value } : x
                        );
                        setSantriList(updated);
                      }}
                      onBlur={() => handleUpdate(s.NIS, s)}
                      className="bg-transparent border-none focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm dark:text-white">{s.alamat}</td>
                  <td className="px-4 py-2 text-sm dark:text-white">{s.id_asrama}</td>
                  <td className="px-4 py-2 text-sm dark:text-white">{s.total_paket_diterima}</td>
                  <td className="px-4 py-2 text-sm dark:text-white">
                    {s.updated_at ? timeSince(new Date(s.updated_at)) : "Unknown"}
                  </td>
                  <td className="px-4 py-2 text-sm dark:text-white">
                    <button
                      onClick={() => deleteSantri(s.NIS)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Hapus
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

export default Santri;
