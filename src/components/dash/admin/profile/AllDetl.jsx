import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS, URL_BASE } from "../../../../auth/api";
import { getTokenFromCookie } from "../../../../auth/localdt";
// import Spinner from "../fragment/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllDetail } from "./fetchAllDetail";

function AllDetl() {
  const [staffDetails, setStaffDetails] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const token = getTokenFromCookie();
  useEffect(() => {
    const getDetailAll = async () => {
      try {
        // const { staffDetails, userDetails } = await fetchAllDetail(); // Ambil data dari fetchAllDetail
        // const { staffDetails} = await fetchAllDetail(); // Ambil data dari fetchAllDetail
        const data = await fetchAllDetail();
        setStaffDetails(data); // Set staffDetails
        // setUserDetails(userDetails); // Set userDetails
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching details");
      }
    };
    getDetailAll();
  }, []);
  const exportDT = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.RKPAGTDTL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "member-detail.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Data Berhasil Dieksport");
    } catch (error) {
      toast.error("Error Export Data CSV");
      console.error("Error Export Data CSV", error);
    }
  };
  return (
    <div className="dark:bg-gray-900 container py-8">
      <div className="bg-white overflow-x-auto mt-1 dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="dark:text-white text-3xl font-semibold">
            Staff Details
          </h1>

          <button onClick={exportDT} class="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
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
                {" "}
                <g id="Interface / Download">
                  {" "}
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#f1f1f1"
                    d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                    id="Vector"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
            Download
            <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
              Download
            </div>
          </button>
        </div>

        <div className="dark:bg-gray-800 rounded-md py-3 px-1">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-700 text-gray-300">
                <th className="p-4">ID</th>
                <th className="p-4">Profile</th>
                <th className="p-4">Gender</th>
                <th className="p-4">DOB</th>
                <th className="p-4">Hobby</th>
                <th className="p-4">Phone</th>
                <th className="p-4">University</th>
                <th className="p-4">Address</th>
                <th className="p-4">Sosmed</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {staffDetails.length > 0 ? (
                staffDetails.map((staff, index) => (
                  <tr
                    key={index}
                    className="bg-gray-700 border-b border-gray-600"
                  >
                    <td className="p-4">{staff.id}</td>
                    <td className="p-4">
                      <img
                        src={`${URL_BASE}/${staff.profile_photo}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-4 capitalize">{staff.gender}</td>
                    <td className="p-4">
                      {new Date(staff.dob).toLocaleDateString()}
                    </td>
                    <td className="p-4">{staff.hobby}</td>
                    <td className="p-4">{staff.phone_number}</td>
                    <td className="p-4">{staff.university}</td>
                    <td className="p-4">{staff.address}</td>
                    <td className="p-4">
                      <a
                        href={staff.sosmed_link}
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
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
                      <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                        <div className="h-2 w-7 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                        <div className="h-2 w-7 bg-gray-300 rounded"></div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default AllDetl;
