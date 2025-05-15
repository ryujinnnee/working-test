import React, { useState, useEffect } from "react";
import { fetchAllOrderSt } from "./fetchOrderStaf"; // Import fungsi fetch Anda

const OrdrST = () => {
  const [ordersData, setOrdersData] = useState(null); // Inisialisasi dengan null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderAll = async () => {
      try {
        const data = await fetchAllOrderSt();
        setOrdersData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getOrderAll();
  }, []);

  if (loading) {
    return (
      <div className="py-8" style={{ height: "80dvh" }}>
        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm p-3 max-md:w-full">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>
    ); // Tampilkan loading skeleton
  }

  if (error) {
    return <div>Error: {error}</div>; // Tampilkan pesan error
  }

  if (!ordersData || !ordersData.status) { // Pengecekan tambahan
    return <div>Data tidak tersedia atau format data salah.</div>;
  }

  if (Object.keys(ordersData.status).length === 0) {
    return (
      <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm p-3 max-md:w-full mt-3">
        <span className="text-xs dark:text-white capitalize">tidak ada projek klien yang sedang anda hanlde.</span>;
      </div>
      
    );
    
    
  }

  // Proses data untuk ditampilkan dalam tabel
  const processedData = Object.keys(ordersData.status).map((key) => ({
    id: key,
    nama_layanan: ordersData.nama_layanan?.[0]?.[0] || "-", // Menggunakan optional chaining dan default value
    jumlah: ordersData.jumlah?.[0]?.[0] || "-", // Menggunakan optional chaining dan default value
    desc: ordersData.desc?.[0] || "-", // Menggunakan optional chaining dan default value
    name: ordersData.name?.[0] || "-",// Menggunakan optional chaining dan default value
    status: ordersData.status[key],
  }));

  return (
    <div className="py-8" style={{ height: "80dvh" }}>
      <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm px-3 py-4 max-md:w-full mt-3">
        <h1 className="text-2xl font-semibold dark:text-white mb-3">Order Dari Klien</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">No</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Klien</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Nama Layanan</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Jumlah</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Deskripsi</th>
                <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {processedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200 text-sm">
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{item.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{item.nama_layanan}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{item.jumlah}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{item.desc}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdrST;