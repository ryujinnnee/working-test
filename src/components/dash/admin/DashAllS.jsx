import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
// import OrderStat from "./OrderStat";
import Chart from "react-apexcharts";

const DashAllS = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [tuduData, setTuduData] = useState([]);
  const [agendData, setAgendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cuti");

  const chartData = dashboardData?.complated_services?.map(service => service.count) || [0, 0, 0, 0];
  const chartLabels = dashboardData?.complated_services?.map(service => service.name) || ["SMM", "Video Ads", "SEO", "Email marketing"];
  const chartColors = ["#9ED9F5", "#F3A0A2", "#E05679", "#FF4560"];
  const totalOrders = dashboardData?.total_orders || 0;

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
                label: "Total Order",
                formatter: function (w) {
                  return totalOrders; // Use actual total orders from API
                },
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        setDashboardData(response.data.data);
        console.table(response.data.data);
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
        console.table(response.data.data);
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
        console.table(response.data.data);
      } catch (error) {
        console.error("Error fetching Agenda data:", error);
      }
    };

    fetchDashboardData();
    getAssignmentData();
    getAgendaData();
  }, []);

  return (
    <div className="dashmain px-4 py-6 overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 max-md:grid-cols-1 gap-9">
        <div className="bg-gradient-to-r from-blue-400 via-blue-400 to-palet1 text-white capitalize rounded-xl p-5 gap-3 flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <strong>
              <span>Total Member</span>
            </strong>
          </div>
          <div className="ml-1">
            <p className="text-lg font-bold">
              {dashboardData ? (
                dashboardData.users.total
              ) : (
                <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
              )}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-palet2 via-palet2 to-pink-200 text-white capitalize rounded-xl p-5 gap-3  flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <strong>
              <span>assignment</span>
            </strong>
          </div>
          <div className="ml-1">
            <p className="text-lg font-bold">
              {dashboardData ? (
                dashboardData.assignments.total
              ) : (
                <div className="h-4 bg-gray-300 rounded w-4 animate-pulse"></div>
              )}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 via-red-400 to-pink-300 text-white capitalize rounded-xl p-5 gap-3  flex items-start justify-evenly flex-col shadow-sm hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div>
            <span className="font-bold">Presensi</span>
          </div>
          <div className="ml-1 w-full">
            <p className="text-lg">
              <div className="flex justify-between gap-3">
                <div className="text-center flex items-center gap-1">
                  <p className="font-bold">
                    {dashboardData?.presensi?.today?.total}
                  </p>
                  <p className="text-xs">today</p>
                </div>
                <div className="text-center flex items-center gap-1">
                  <p className="font-bold">
                    {dashboardData?.presensi?.today?.terlambat}
                  </p>
                  <p className="text-xs">late</p>
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
            Order Service
          </h3>
          <div className="w-full h-auto p-3 grid place-items-center">
            <div className=" rounded-lg px-1 w-fit flex flex-col items-center">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                width="250"
              />

              <div className="mt-1 flex flex-wrap items-center justify-center w-3/4">
                {chartLabels.map((label, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mr-4 mb-2"
                  >
                    <div
                      className="w-4 h-2 rounded-full"
                      style={{ backgroundColor: chartColors[index] }}
                    ></div>{" "}
                    {/* Membuat kotak legenda bulat */}
                    <span>{label}</span>{" "}
                    {/* Hanya menampilkan label, tanpa nilai persentase */}
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
              Info Hari ini!
            </h3>
            <div className="w-7 h-7 p-1 grid place-items-center rounded-full bg-blue-200 backdrop-blur-sm bg-opacity-55">
              <span className="m-auto text-sm">
                {dashboardData?.perizinan?.total ?? "0"}
              </span>
            </div>
          </div>
          <div className="w-full overflow-y-auto" style={{ height: "80%" }}>
            <div className="relative my-5" style={{ width: "100%" }}>
              <div className="tabs flex">
                <button
                  onClick={() => setActiveTab("cuti")}
                  className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
                    activeTab === "cuti"
                      ? "text-blue-800 font-medium text-sm"
                      : "text-gray-500 font-medium text-sm"
                  }`}
                >
                  Cuti
                </button>
                <button
                  onClick={() => setActiveTab("izin")}
                  className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
                    activeTab === "izin"
                      ? "text-blue-800 font-medium text-sm"
                      : "text-gray-500 font-medium text-sm"
                  }`}
                >
                  Izin
                </button>
              </div>
              <div
                className={`absolute bottom-0 h-1 w-1/2 bg-blue-200 transition-all rounded-md duration-300 ease-in-out ${
                  activeTab === "cuti" ? "left-0" : "left-1/2"
                }`}
              />
            </div>
            {activeTab === "cuti" && (
              <ul>
                {dashboardData?.perizinan?.details?.cuti?.length > 0 ? (
                  dashboardData.perizinan.details.cuti.map((detail, index) => (
                    <div key={index} className="flex items-center gap-3 mt-2">
                      <div className="ikonsked w-11 h-11 p-1 m-0 border border-gray-400 text-center rounded-full grid place-items-center bg-palet1 dark:bg-gray-500">
                        <span className="uppercase dark:text-gray-300">
                          {detail.nama_pemohon
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .join("")}
                        </span>
                      </div>
                      <div className="kfgxasdsd  flex-col">
                        <strong className="dark:text-white capitalize">
                          {detail.nama_pemohon}
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
                {dashboardData?.perizinan?.details?.izin?.length > 0 ? (
                  dashboardData.perizinan.details.izin.map((detail, index) => (
                    <div key={index} className="flex items-center gap-3 mt-2">
                      <div className="ikonsked w-11 h-11 p-1 m-0 border border-gray-400 text-center rounded-full grid place-items-center bg-palet1 dark:bg-gray-500">
                        <span className="uppercase dark:text-gray-300">
                          {detail.nama_pemohon
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .join("")}
                        </span>
                      </div>
                      <div className="kfgxasdsd  flex-col">
                        <strong className="dark:text-white capitalize">
                          {detail.nama_pemohon}
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
                    <td className="px-3 py-3 text-sm text-gray-800 dark:text-white">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex dark:text-white">
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
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {agenda.agenda_name}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 dark:text-white">
                      {new Date(agenda.start_time).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                      {new Date(agenda.end_time).toLocaleString()}
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

export default DashAllS;
