import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import { getTokenFromCookie } from "../../../../auth/localdt";
// import Spinner from "../fragment/Spinner";
import toast, { Toaster } from "react-hot-toast";

const BAS = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const cachedRek = localStorage.getItem("rekCache");
  
    if (cachedRek) {
      const { data, timestamp } = JSON.parse(cachedRek);
  
      const cacheDuration = 5 * 60 * 1000; 
      const now = new Date().getTime();
  
      if (now - timestamp < cacheDuration) {
        setAccounts(data); 
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
      const response = await axios.get(`${API_URL}${ENDPOINTS.REK}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rekData = response.data;
      setAccounts(rekData);
      // console.table(rekData);
      setLoading(false);

      localStorage.setItem(
        "rekCache",
        JSON.stringify({ data: rekData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching accounts:", error);
      console.error("Error fetching accounts:", error);
    }
  };

 

  return (
    <div className="container w-full py-5">
      <div className="feslen w-full items-center justify-between flex">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          All Account
        </h2>

      </div>

      
      <div className="bg-white overflow-x-auto dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Bank Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Atas Nama
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                No Rekening
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
              accounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="px-4 py-4 text-gray-700 text-sm dark:text-white">
                    {account.id}
                  </td>
                  <td className="px-4 py-4">
                    <input
                      className="focus:outline-none w-24 dark:bg-gray-700 text-sm text-gray-700 dark:text-white"
                      type="text"
                      value={account.bank_name}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-4 w-32 capitalize text-sm text-gray-700 dark:text-white">
                    <input
                      className="focus:outline-none capitalize dark:bg-gray-700 dark:text-white"
                      type="text"
                      value={account.atas_nama}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                    readOnly
                      className="focus:outline-none dark:bg-gray-700 text-sm text-gray-700 dark:text-white"
                      type="number"
                      value={account.norek}
                      
                    />
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

export default BAS;
