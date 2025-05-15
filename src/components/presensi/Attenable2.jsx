import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../auth/api";
import { getTokenFromCookie } from "../../auth/localdt";

const Attenable2 = () => {
  const [time, setTime] = useState("");
  const [currentAttendance, setCurrentAttendance] = useState([]);
  // const [allAttendance, setAllAttendance] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: "Asia/Jakarta" }));
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(intervalId);
  }, []);

  const getUserData = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      toast.error("Gagal mendapatkan data pengguna");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserData();
    // getAllPresences();
    getPresencesByUserId();
  }, []);

  const handleCheckIn = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }

    const userId = userData.id;
    if (!userId) {
      toast.error("ID pengguna tidak ditemukan");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.PRESLOG.replace("{id}", userId)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newAttendance = {
          id: response.data.id,
          masuk: response.data.masuk,
          keluar: "On Duty",
          status: "Hadir",
        };
        setCurrentAttendance((prevState) => [...prevState, newAttendance]);
        // setAllAttendance((prevState) => [...prevState, newAttendance]);
        toast.success("berhasil masuk");
        getPresencesByUserId();
        // getAllPresences();
      } else {
        toast.error(`${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(` ${error.response?.data?.message || error.message}`);
    }
  };

  const handleCheckOut = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }

    const userId = userData.id;
    if (!userId) {
      toast.error("ID pengguna tidak ditemukan");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.PRESOUT.replace("{id}", userId)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newAttendance = {
          id: response.data.id,
          keluar: response.data.keluar,
          status: "Off",
        };
        setCurrentAttendance((prevState) => [...prevState, newAttendance]);
        // setAllAttendance((prevState) => [...prevState, newAttendance]);
        toast.success("berhasil keluar");
        getPresencesByUserId();
        // getAllPresences();
      } else {
        toast.error(`${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`);
    }
  };


  const getPresencesByUserId = async (userId) => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.GETPRESUSER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCurrentAttendance(response.data);
      } else {
        toast.error(
          `Gagal mengambil presensi pengguna: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      toast.error(
        `Gagal mengambil presensi pengguna: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full items-center min-h-96 px-5">
      <div className="firsfxfsdfs flex justify-between w-full mt-3 max-md:flex-col">
      <div className="lefsdfsdfxxxadsf flex flex-col justify-between">
          <h1 className="text-3xl font-bold max-md:px-5 dark:text-white">
            Presensi Anggota
          </h1>
          <div className="mb-5 w-full bg-white dark:bg-slate-600 dark:border-gray-400 border rounded-md">
            <h2
              className="flex items-center justify-between p-2  capitalize rounded-lg cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div className="text-sm dark:text-white flex">
                <svg
                  className="w-5 h-5 me-2 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Informasi
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${
                  open ? "-rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </h2>
            {open && (
              <div
                className={`p-2 bg-white dark:bg-slate-700 rounded-lg overflow-hidden transition-max-height duration-300 ease-in-out ${
                  open ? "max-h-40" : "max-h-0"
                }`}
              >
                {" "}
                {/* Animasikan max-height */}
                <p className="text-xs dark:text-white">
                  Anda harus terhubung dengan koneksi wifi kantor untuk presensi
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="dip">
          <div className="bg-white shadow-lg rounded-lg py-8 px-8 mb-8 w-fit">
            <div className="text-md text-gray-600">Indonesia Time</div>
            <div
              className="text-6xl max-md:text-5xl max-md:w-72 font-bold text-gray-800 mb-4 w-96"
              id="clock"
            >
              {" "}
              {time}
            </div>
          </div>

          <div className="flex gap-5 mb-4">
            <button
              onClick={handleCheckIn}
              className="bg-green-500 w-1/2 hover:bg-green-600 text-white font-bold py-3 px-9 rounded-lg transition duration-300 flex items-center justify-center hover:translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 8v4l4-2z" />
              </svg>
              Present
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-red-500 w-1/2 hover:bg-red-600 text-white font-bold py-3 px-9 rounded-lg transition duration-300 flex items-center justify-center hover:translate-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 13H5v-2h14v2z" />
                <path d="M19 13H5v-2h14v2z" />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      </div>
      <div className="firsfxfsdfs grid place-items-center gap-3 w-full mt-3">
        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm p-3 w-full max-md:w-full">
          <div className="outerforfirstline flex items-center justify-between">
            <h2 className="text-xl font-bold mb-2 dark:text-white">
              Presensi Anda
            </h2>
            <button
              onClick={getPresencesByUserId}
              className=" text-black dark:text-white font-boldrounded-lg transition duration-300 flex items-center justify-center hover:rotate-180"
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.70422 3.21094C3.19866 3.70312 2.82916 4.25 2.59583 4.85156C2.49861 5.07032 2.34304 5.23438 2.12915 5.34375C1.89582 5.4349 1.6528 5.44401 1.40002 5.37109C1.16669 5.27995 0.991667 5.13411 0.875 4.93359C0.777778 4.71485 0.768048 4.48698 0.845825 4.25C1.15694 3.41146 1.67228 2.65496 2.39172 1.98048C3.24728 1.17842 4.22919 0.640655 5.33752 0.367188C6.42641 0.111987 7.52497 0.111987 8.6333 0.367188C9.74161 0.622388 10.7236 1.15101 11.5792 1.95308L12.8042 0.804688C13.0375 0.604155 13.2903 0.558584 13.5625 0.667984C13.8347 0.777317 13.9805 0.977843 14 1.26958V4.76953C13.9611 5.17057 13.7278 5.38932 13.3 5.42578H13.0667H9.56665C9.25554 5.40756 9.04172 5.27084 8.92505 5.01563C8.80838 4.76042 8.85691 4.52343 9.0708 4.30469L10.2667 3.18359C9.31392 2.34505 8.21527 1.92578 6.97083 1.92578C5.74583 1.92578 4.657 2.35416 3.70422 3.21094ZM0 7.83203C0.0388889 7.43099 0.272173 7.21224 0.699951 7.17578H0.93335H4.43335C4.74446 7.19401 4.95828 7.33072 5.07495 7.58594C5.19162 7.84114 5.14309 8.07813 4.9292 8.29688L3.73328 9.41797C4.68606 10.2565 5.78473 10.6758 7.02917 10.6758C8.25418 10.6758 9.34302 10.2474 10.2958 9.39063C10.8014 8.89844 11.1708 8.35156 11.4042 7.75C11.5014 7.53125 11.657 7.36719 11.8708 7.25781C12.1042 7.16667 12.3472 7.15755 12.6 7.23047C12.8333 7.32162 13.0083 7.46745 13.125 7.66797C13.2417 7.88672 13.2514 8.11458 13.1542 8.35156C12.843 9.1901 12.3277 9.94661 11.6083 10.6211C10.7527 11.4232 9.77081 11.9609 8.66248 12.2344C7.57359 12.4896 6.47503 12.4896 5.3667 12.2344C4.25837 11.9792 3.27634 11.4505 2.42078 10.6484L1.1958 11.7969C0.962469 11.9974 0.709722 12.043 0.4375 11.9336C0.165278 11.8242 0.0194445 11.6237 0 11.332V8.05078V7.83203Z"
                  fill="#000"
                  className="dark:text-white"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-400 hover:bg-gray-200">
                  <th className="px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    Masuk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    Keluar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    Modified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  Array(2)
                    .fill()
                    .map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : currentAttendance.length > 0 ? (
                  currentAttendance.map((attendance, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-300 transition-colors duration-200"
                    >
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            attendance.status === "Early"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {attendance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                        {attendance.masuk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                        {attendance.keluar || (
                          <span className="text-gray-500 italic">null</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-white">
                        {attendance.updated_at ? new Date(attendance.updated_at).toLocaleDateString() : (
                          <span className="text-gray-500 italic">null</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-xs text-gray-700 dark:text-white">
                      <p>Anda belum pernah melakukan presensi</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Attenable2;
