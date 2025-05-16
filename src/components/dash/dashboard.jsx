import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import DarkModeToggle from "../../utils/DarkMode";
import Logo from "../../assets/friendzlogo.png";
import { fetchProfilePhoto } from "../dash/admin/profile/fetchProfilePhoto";
// import { useInpo } from "./admin/useInpo";
import { timeSince } from "../../utils/timeUtils";
import Joyride from "react-joyride";

const Dashboard = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hideForToday, setHideForToday] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const { inpo, loading, fetchInpo } = useInpo();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [userName, setUserName] = useState(() => {
    try {
      const storedData = localStorage.getItem("dtUser");
      return storedData ? JSON.parse(storedData).username || "" : "";
    } catch (error) {
      console.error("Failed to parse userData:", error);
      return "";
    }
  });
  
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([
    {
      target: "#nav1",
      content:
        "Sans dulu freend! Semua fitur ada di sini. Tinggal klik-klik, urusan kelar. Yuk, jelajahi apa aja yang bisa lo lakuin!",
      // spotlightClicks: true,
      placement: "right",
    },
    {
      target: "#prof",
      content:
        "Ini nih, tempat lo bikin profil kece😎. Jangan lupa isi bio, biar orang tau lo siapa.",
    },
    {
      target: "#themmm",
      content:
        "Lu suka yang gelap biar vibe-nya misterius?🥶 Atau terang biar ngejreng? Cus, ubah gaya lo di sini✨",
    },
    {
      target: "#notipp",
      content:
        "Ping!🔔 Semua update penting masuk ke sini. Nggak perlu khawatir FOMO, karena kita nggak bakal biarin lo ketinggalan apa-apa.👌",
    },
  ]);
  const handleClickStart = (event) => {
    event.preventDefault();
    setRun(true);
    setTimeout(() => {
      const beaconButton = document.querySelector(".react-joyride__beacon");
      if (beaconButton) {
        beaconButton.click();
      }
    }, 100);
  };

  const handleClickOutside = (event) => {
    const button = document.getElementById("notipp");
    if (button && !button.contains(event.target)) {
      setShowModal(false); // Menutup modal jika klik di luar tombol
    }
  };

  
  useEffect(() => {
    
    

    
  }, []);

  
  return (
    <div className="bg-bag-primary dark:bg-bg-negmod min-h-dvh">
      <nav className="fixed top-0 z-50 w-full bg-bag-primary dark:bg-bg-negmod dark:text-white -border-b--static7 dark:border-gray-700 dark:border-b border-b-2 border-solid">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm md:hidden text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className="flex items-center">
                <a href="#" className="flex ms-2 md:me-3">
                  <img src="https://static.vecteezy.com/system/resources/previews/011/883/287/original/modern-letter-c-colorful-logo-with-watter-drop-good-for-technology-logo-company-logo-dummy-logo-bussiness-logo-free-vector.jpg" className="h-8 me-3" alt="Friendz Logo" />
                  {/* <img src={Logo} className="h-8 me-3" alt="Friendz Logo" /> */}
                </a>
                
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={handleClickStart}>?</button>
              <Joyride
                steps={steps}
                run={run}
                showProgress={true}
                continuous
                showSkipButton
                scrollToFirstStep={true}
                styles={{
                  options: {
                    zIndex: 1000,
                  },
                }}
              />
              <div className="flex items-center ms-3 gap-3">
                

                <DarkModeToggle />
                <div className="flex items-center gap-2" id="prof">
                  <Link to={"/profile"}>
                    <button
                      type="button"
                      className="flex text-sm items-center gap-2 rounded-full dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* <img src="" alt="" /> */}
                      {profilePhoto ? (
                        <img
                          src={`https://dbsf.friendz.id/${profilePhoto}`}
                          alt="Profile"
                          className="w-10 h-10 rounded-full border-2 border-gray-300"
                        />
                      ) : (
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          alt="Dummy Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <h2 className="capitalize text-sm">
                        Hi, <strong>{userName ? userName : "Guest"}!</strong>
                      </h2>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-bag-primary border-r sm:translate-x-0 dark:bg-bg-negmod dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-bag-primary dark:bg-bg-negmod">
          <ul className="space-y-2 font-medium" id="nav1">
            <li>
              <Link to="/dashboard">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-hoper group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/santri-all">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-hoper dark:hover:bg-gray-700 group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                   Santri
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/member-all">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-hoper  dark:hover:bg-gray-700 group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap text-bag-primary-dark dark:text-white">
                    Paket
                  </span>
                  {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span> */}
                </a>
              </Link>
            </li>
            <li>
              <Link to="/schedule">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-hoper dark:hover:bg-gray-700 group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="flex-shrink-0 w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    <span>Laporan</span>
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/roles">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-hoper dark:hover:bg-gray-700 group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    User
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/backup">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-hoper dark:hover:bg-gray-700 group focus:bg-hoper focus:dark:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-palet2 transition duration-75 dark:text-gray-400 group-hover:text-palet3 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Settings
                  </span>
                </a>
              </Link>
            </li>
            
            
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 h-full dark:bg-bg-negmod">
        <div className="p-4 border-2 -border--static7 border-dashed rounded-lg dark:border-gray-600 mt-14 overflow-auto">
          <Outlet />
        </div>
        <footer className="text-sm font-light text-center mt-4 text-gray-400 dark:text-white">
          <p>&copy;2024 All rights reserved. Develop by RahmatDev. </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
