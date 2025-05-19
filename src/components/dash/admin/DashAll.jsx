import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
// import OrderStat from "./OrderStat";
import Chart from "react-apexcharts";
import "./custom.css";

const DashAll = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [tuduData, setTuduData] = useState([]);
  const [agendData, setAgendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cuti");

  const refreshDashboardData = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("dashboardData");
      localStorage.removeItem("assignmentData");
      localStorage.removeItem("agendaData");

      // Fetch dashboard data again
      await fetchDashboardData();
      // await getAssignmentData();
      // await getAgendaData();
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = getTokenFromCookie();

      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.ANALYS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData(response.data);
      console.table(response.data.jumlah_total);

      // Save to local storage
      localStorage.setItem("dashboardData", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  const getAssignmentData = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.TUDU}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Assignment data fetched:", response.data.data);
      setTuduData(response.data.data);
      localStorage.setItem(
        "assignmentData",
        JSON.stringify(response.data.data)
      );
      // console.table(response.data.data);
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };
  const getAgendaData = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.AGEND}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Assignment data fetched:", response.data.data);
      setAgendData(response.data.data);
      localStorage.setItem("agendaData", JSON.stringify(response.data.data));
      // console.table(response.data.data);
    } catch (error) {
      console.error("Error fetching Agenda data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // getAssignmentData();
    // getAgendaData();
    // refreshDashboardData();
  }, []);

  const chartData = dashboardData?.grafik_paket_masuk
    ? Object.values(dashboardData.grafik_paket_masuk)
    : [0, 0, 0];

  const chartLabels = dashboardData?.pemesanan?.completed_services
    ? Object.keys(dashboardData.pemesanan.completed_services)
    : ["No Data"];

  const chartColors = ["#9ED9F5", "#F3A0A2", "#E05679", "#FF4560"];
  const totalOrders = dashboardData?.jumlah_total || 0;

  const chartOptions = {
    series: chartData,
    options: {
      chart: {
        type: "donut",
      },
      labels: chartLabels,
      colors: chartColors,
      dataLabels: { enabled: false },
      legend: { show: false },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Paket",
                formatter: function (w) {
                  return totalOrders;
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="dashmain px-4 py-6 overflow-y-auto">
      <div className="sfsdxxvmvnbgk flex items-start gap-1">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>
        <button
          onClick={refreshDashboardData}
          className="text-black dark:text-white font-boldrounded-lg transition duration-300 flex items-center justify-center hover:rotate-180"
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
      <div className="grid grid-cols-2 md:grid-cols-3 max-md:grid-cols-1 gap-9">
        <div className="bg-gradient-to-r from-blue-400 via-blue-400 to-palet1 text-white capitalize rounded-xl p-5 gap-3 flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <strong>
              <span>Total Paket</span>
            </strong>
          </div>
          <div className="ml-1">
            <p className="text-lg font-bold">
              {dashboardData ? (
                dashboardData.jumlah_total
              ) : (
                <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
              )}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-palet2 via-palet2 to-palet3 text-white capitalize rounded-xl p-5 gap-3  flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <strong>
              <span>Paket Belum Diambil</span>
            </strong>
          </div>
          <div className="ml-1">
            <p className="text-lg font-bold">
              {dashboardData ? (
                dashboardData.jumlah_belum_diambil
              ) : (
                <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
              )}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 via-red-400 to-pink-300 text-white capitalize rounded-xl p-5 gap-3  flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <span className="font-bold">Paket Disita</span>
          </div>
          <div className="ml-1 w-full">
            <p className="text-lg">
              <div className="flex justify-between gap-3">
                <div className="text-center flex items-center gap-1">
                  <p className="font-bold">{dashboardData?.jumlah_disita}</p>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="feslen w-full flex gap-9 mt-6 max-md:flex-col">
        {/* Diagram line/area pesanan */}
        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 h-fit w-2/3 max-md:w-full rounded-xl p-4 border-2 transition duration-300 transform hover:scale-105">
          <h3 className="text-palettxt dark:text-white text-xl font-semibold">
            Grafik Paket
          </h3>
          <div className="w-full h-auto p-3 grid place-items-center dark:text-white">
            {/* <OrderStat /> */}
            <div className=" rounded-lg px-1 w-fit flex flex-col items-center dark:text-white">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                width="250"
              />

              <div className="mt-1 flex flex-wrap items-center justify-center w-3/4 text-sm">
                {chartLabels.map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mr-4 mb-2"
                  >
                    <div
                      className="w-3 h-2 rounded-full"
                      style={{ backgroundColor: chartColors[index] }}
                    ></div>{" "}
                    <span>{label}</span>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagram donut performa */}
        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 h-auto w-1/3 max-md:w-full rounded-xl p-4 border-2 shadow-sm transition duration-300 transform">
          <div className="flex justify-between">
            <h3 className="text-palettxt text-center dark:text-white text-xl font-semibold">
              List Paket
            </h3>
            <div className="w-7 h-7 p-1 grid place-items-center rounded-full bg-blue-200 backdrop-blur-sm bg-opacity-55">
              <span className="m-auto text-sm">
                {dashboardData?.perizinan?.total ?? "0"}
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="relative my-5 w-full">
              <div className="flex border gap-1 border-gray-200 px-2 rounded-lg overflow-hidden">
                <div
                  className={`absolute top-1 left-1 w-1/2 h-[80%] bg-hoper rounded-md transition-all duration-300`}
                  style={{
                    transform:
                      activeTab === "cuti"
                        ? "translateX(0%)"
                        : "translateX(100%)",
                  }}
                ></div>

                {/* Tab Buttons */}
                <button
                  onClick={() => setActiveTab("cuti")}
                  className={`relative flex-1 py-2 text-center rounded-md transition-all duration-300 ${
                    activeTab === "cuti"
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Masuk
                </button>
                <button
                  onClick={() => setActiveTab("izin")}
                  className={`relative flex-1 py-2 text-center rounded-md transition-all duration-300 ${
                    activeTab === "izin"
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Keluar
                </button>
              </div>
            </div>
            <div className="oversafsfcxxwsfs overflow-y-auto max-h-52">
              {activeTab === "cuti" && (
                <ul>
                  {dashboardData?.paket_terbaru?.length > 0 ? (
                    dashboardData.paket_terbaru.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 mt-2">
                        <div className="ikonsked w-11 h-11 p-1 m-0 border border-gray-400 text-center rounded-full grid place-items-center bg-palet1 dark:bg-gray-500">
                          <span className="uppercase dark:text-gray-300">
                            ic
                          </span>
                        </div>
                        <div className="kfgxasdsd  flex-col">
                          <strong className="dark:text-white capitalize">
                            {detail.nama_paket}
                          </strong>
                          <p className="dark:text-white text-sm text-gray-600 capitalize">
                            {detail.tipe}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <li>
                      {dashboardData?.perizinan?.details?.cuti
                        ? "empty"
                        : "not found"}
                    </li>
                  )}
                </ul>
              )}
              {activeTab === "izin" && (
                <ul>
                  {dashboardData?.paket_keluar?.length > 0 ? (
                    dashboardData.paket_keluar.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 mt-2">
                        <div className="ikonsked w-11 h-11 p-1 m-0 border border-gray-400 text-center rounded-full grid place-items-center bg-palet1 dark:bg-gray-500">
                          <span className="uppercase dark:text-gray-300">
                            ic
                          </span>
                        </div>
                        <div className="kfgxasdsd  flex-col">
                          <strong className="dark:text-white capitalize">
                            {detail.nama_paket}
                          </strong>
                          <p className="dark:text-white text-sm text-gray-600 capitalize">
                            {detail.tipe}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <li>
                      {dashboardData?.perizinan?.details?.izin
                        ? "empty"
                        : "not found"}
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-9 mt-6 w-full max-md:flex-col">
        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm p-3 w-1/2 max-md:w-full">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">To Do</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-500">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  No
                </th>
                <th className="px-3 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Tugas
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Deadline
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
                    </tr>
                  ))}
                </>
              ) : tuduData.length === 0 ? (
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-200 transition duration-200">
                  <td
                    colSpan="4"
                    className="px-4 py-11 text-sm text-gray-700 dark:text-white text-center"
                  >
                    No data for today🎉
                  </td>
                </tr>
              ) : (
                tuduData.map((task, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-800 dark:text-white capitalize">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-white">
                      <span
                        className={`inline-flex items-center text-nowrap px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 flex dark:text-white">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-slate-600 dark:border-gray-400 border-2 rounded-xl shadow-sm p-4 w-auto">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">
            List Agenda
          </h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-500">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  No
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Tugas
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Start
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  End
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {agendData.length === 0 ? (
                <>
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-5 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-5 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-10 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-10 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-10 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-10 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                </>
              ) : agendData.length > 0 ? (
                agendData.map((agenda, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 dark:hover:bg-gray-500 transition duration-200 cursor-default"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white capitalize">
                      {agenda.agenda_name}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 dark:text-white">
                      {new Date(agenda.start_time).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      {new Date(agenda.end_time).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-sm text-gray-700 dark:text-white text-center"
                  >
                    No agenda for today
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashAll;
