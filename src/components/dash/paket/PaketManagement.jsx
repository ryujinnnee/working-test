import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const PaketManagement = () => {
  const [paketList, setPaketList] = useState([]);
  const [trashList, setTrashList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_paket: "",
    tanggal_diterima: "",
    kategori: "",
    penerima_paket: "",
    asrama: "",
    pengirim_paket: "",
    isi_paket_yang_disita: "",
    status: "Belum Diambil",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalTrash, setShowModalTrash] = useState(false);

  const token = getTokenFromCookie();
  const [asramaList, setAsramaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [santriList, setSantriList] = useState([]);

  useEffect(() => {
    fetchPaket();
    fetchSantri()
    getAsrama();
    getKategoriPaket();
    fetchTrashs();
  }, []);

  const getAsrama = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.DORMGET}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAsramaList(response.data.asramas);
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

  const getKategoriPaket = async () => {
    try {
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.KATEGORIPAKETGET}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API Response:", response.data.Kategori); // Periksa respons API

      if (response.status === 200) {
        setKategoriList(response.data.Kategori); // Atur kategoriList
      } else {
        console.error("Failed to fetch kategori:", response.status);
      }
    } catch (error) {
      console.error("Error fetching kategori paket:", error);
      toast.error("Gagal mengambil data kategori paket");
    }
  };

  const fetchPaket = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.PAKETGET}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const paketData = response.data.data;
      setPaketList(paketData);
      localStorage.setItem("paketList", JSON.stringify(paketData));
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching paket");
      console.error(error);
    }
  };
  const fetchTrashs = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.TRASHPAKET}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const paketTrData = response.data.data;
      setTrashList(paketTrData);
      localStorage.setItem("pakeTrashtList", JSON.stringify(paketTrData));
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching trashed paket");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePaket = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.PAKETPOST}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaketList([...paketList, response.data.data]);
      setFormData({
        nama_paket: "",
        tanggal_diterima: "",
        kategori: "",
        penerima_paket: "",
        asrama: "",
        pengirim_paket: "",
        isi_paket_yang_disita: "",
        status: "Belum Diambil",
      });
      setShowModal(false);
      localStorage.removeItem("paketList");
      fetchPaket();
    } catch (error) {
      console.error("Error creating paket:", error);
      toast.error("Gagal menambah paket");
    }
  };

  const handleUpdatePaket = async (id_paket, updateee) => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.PAKETPUT.replace("{id}", id_paket)}`,
        updateee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.removeItem("paketList");
      fetchPaket();
      toast.success("Update paket berhasil");
    } catch (error) {
      console.error("Error response:", error.response); // Log the error response
      toast.error("Gagal update paket");
    }
  };

  const deletePaket = async (id_paket) => {
    try {
      await axios.delete(
        `${API_URL}${ENDPOINTS.PAKETDELETE.replace("{id}", id_paket)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("paketList");
      fetchPaket();
      toast.success("Paket dihapus");
    } catch (error) {
      toast.error("Gagal hapus paket");
      console.error(error);
    }
  };

  return (
    <div className="container w-full mx-auto px-4">
      <div className="flex justify-between my-3">
        <h2 className="text-3xl font-semibold dark:text-white">
          Manajemen Paket
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Tambah Paket
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
            {[
              "nama_paket",
              // "penerima_paket",
              "pengirim_paket",
              "isi_paket_yang_disita",
            ].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={field.replace(/_/g, " ")}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            ))}
            <label className="pt-2" htmlFor="penerima_paket">
              Penerima Paket
            </label>
            <input
              type="text"
              name="penerima_paket"
              value={formData.penerima_paket}
              onChange={handleInputChange}
              placeholder="Cari Nama Santri"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
            {santriList.length > 0 && (
              <ul className="border rounded mt-1">
                {santriList.map((santri) => (
                  <li
                    key={santri.nis}
                    onClick={() => {
                      setFormData({ ...formData, penerima_paket: santri.NIS });
                    }}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {santri.nama_santri}
                  </li>
                ))}
              </ul>
            )}
            <label className="pt-2" htmlFor="tanggal_diterima">
              Tanggal Diterima
            </label>
            <input
              type="date"
              name="tanggal_diterima"
              value={formData.tanggal_diterima}
              onChange={handleInputChange}
              placeholder="Tanggal Diterima"
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            >
              <option value="">Pilih Kategori</option>
              {kategoriList.map((kategori) => (
                <option key={kategori.id_kategori} value={kategori.id_kategori}>
                  {kategori.nama_kategori} {/* Pastikan ini adalah string */}
                </option>
              ))}
            </select>
            
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            >
              <option value="Belum Diambil">Belum Diambil</option>
              <option value="diambil">Sudah Diambil</option>
            </select>
            <button
              onClick={handleCreatePaket}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan Paket
            </button>
          </div>
        </div>
      )}
      {showModalTrash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-700 p-5 rounded shadow-md w-full max-w-md space-y-3">
            <span
              className="text-black dark:text-white cursor-pointer float-right"
              onClick={() => setShowModalTrash(false)}
            >
              &times;
            </span>
            <h1>sampah</h1>
            <div className="space-y-2">
              {trashList.map((trash) => (
                <div key={trash.id_paket} className="p-2 border rounded">
                  <p>{trash.nama_paket}</p>
                  <p>Penerima: {trash.penerima_paket}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-slate-700 p-5 rounded shadow overflow-x-auto mt-5">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              {[
                "ID",
                "Nama Paket",
                "Tanggal Diterima",
                "Kategori",
                "Penerima",
                "Asrama",
                "Pengirim",
                "Isi Disita",
                "Status",
                "Terakhir Update",
                "Aksi",
              ].map((th) => (
                <th
                  key={th}
                  className="px-4 py-2 text-left text-sm font-medium dark:text-white text-gray-700"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paketList.map((p) => (
              <tr
                key={p.id_paket}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.id_paket}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  <input
                    type="text"
                    value={p.nama_paket}
                    onBlur={(e) =>
                      handleUpdatePaket(p.id_paket, {
                        ...p,
                        nama_paket: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      const updateRolees = paketList.map((s) =>
                        s.id_paket === p.id_paket
                          ? { ...s, nama_paket: e.target.value }
                          : s
                      );
                      setPaketList(updateRolees);
                    }}
                    className="bg-transparent border-none focus:outline-none w-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.tanggal_diterima}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.kategori.nama_kategori}{" "}
                  {/* Akses nama_kategori dari objek kategori */}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.santri ? p.santri.nama_santri : p.penerima_paket}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.asrama.nama_asrama}{" "}
                  {/* Akses nama_asrama dari objek asrama */}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.pengirim_paket}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.isi_paket_yang_disita}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.status}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  {p.updated_at ? timeSince(new Date(p.updated_at)) : "Unknown"}
                </td>
                <td className="px-4 py-2 text-sm dark:text-white">
                  <button
                    onClick={() => deletePaket(p.id_paket)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trashList.length > 0 && (
          <button
            onClick={() => setShowModalTrash(true)}
            className="fixed bottom-4 right-4 m-4 p-2 bg-red-500 text-white rounded-full shadow-lg z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-5 5m-5 -5v-2a2 2 0 00-2 2H5a2 2 0 002 2v3a2 2 0 002 2h11a2 2 0 002-2v-3a2 2 0 00-2-2m-1-1h-4m-5 0a2 2 0 00-2 2v1h16v-1a2 2 0 00-2-2M5 11v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z"
              />
            </svg>
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default PaketManagement;
