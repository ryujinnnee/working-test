import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import { getTokenFromCookie } from "../../../../auth/localdt";
// import Spinner from "../fragment/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { timeSince } from "../../../../utils/timeUtils";
const Pay = () => {
  const [paymData, setPaymData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetPayments();
  }, []);

  const fetPayments = async () => {
    const cachedPay = localStorage.getItem("payCache");

    if (cachedPay) {
      const { data, timestamp } = JSON.parse(cachedPay);

      const cacheDuration = 5 * 60 * 1000;
      const now = new Date().getTime();

      if (now - timestamp < cacheDuration) {
        setPaymData(data);
        setLoading(false);
        return;
      }
    }
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.PAYALL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payData = response.data.data;
      console.table(response.data.data);
      setPaymData(payData);
      // console.table(rekData);
      setLoading(false);

      localStorage.setItem(
        "payCache",
        JSON.stringify({ data: payData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching payment:", error);
      console.error("Error fetching payment:", error);
    }
  };
  return (
    <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
      <h1 className="text-3xl">Bukti Pembayaran</h1>
      <div className="w-full" style={{ minHeight: "50dvh" }}>
        
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-sm mb-3">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Id Pesanan
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Atas Nama
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Nama Bank
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Norek
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                bukti
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                Modified
              </th>
              
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                  <div className="h-2 bg-gray-300 rounded"></div>
                </td>
                {/* Kolom skeleton lainnya */}
              </tr>
            ) : paymData.length > 0 ? (
              paymData.map((data, index) => (
                <tr
                  key={data.id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors dark:text-white"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">{data.pemesanan_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white capitalize">{data.atas_nama}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">{data.nama_bank}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">{data.norek}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white italic">
                    {data.bukti ? (
                      <a
                        href={`http://127.0.0.1:8000${data.bukti}`}
                        target="_blank"
                        rel="noreferrer"
                      >
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
                  </td>
                  
                  <td className="px-4 py-3">
                    {data.updated_at
                    ? timeSince(new Date(data.updated_at))
                    : "Unknown"}
                    </td>
                </tr>
              ))
            ) : (
              <tr className="hover:bg-gray-50 transition-colors duration-300">
                <td colSpan={10} className="px-4 py-3 text-center">
                  belum ada yang bayar nih:|
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    
  );
};
export default Pay;
