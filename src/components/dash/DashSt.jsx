import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import DarkModeToggle from "../../utils/DarkMode";
import Logo from "../../assets/friendzlogo.png";
import { fetchProfilePhoto } from "../dash/admin/profile/fetchProfilePhoto";
import { useInpo } from "./admin/useInpo";
import { timeSince } from "../../utils/timeUtils";

const Dashst = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hideForToday, setHideForToday] = useState(false);

  const { inpo, loading, fetchInpo } = useInpo();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [userName, setUserName] = useState("");


  const closeModal = () => {
    setModalIsOpen(false);
    if (hideForToday) {
      localStorage.setItem(
        "lastUpdateModalShown",
        new Date().toLocaleDateString()
      );
    }
  };

  const handleCheckboxChange = (event) => {
    setHideForToday(event.target.checked);
  };
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipSContent, setShowTooltip] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleMarkRead = () => {
    setUnreadCount(0); // Reset unread count to zero
    localStorage.setItem("unreadCount", 0); // Store the reset count in localStorage
  };

  const fetchNotificationsFromCache = () => {
    const cachedRek = localStorage.getItem("inpoCache");
    const storedUnreadCount = localStorage.getItem("unreadCount");

    if (storedUnreadCount) {
      setUnreadCount(parseInt(storedUnreadCount, 10)); // Ambil dari localStorage jika ada
    } else if (cachedRek) {
      try {
        const { data } = JSON.parse(cachedRek);
        if (Array.isArray(data)) {
          setUnreadCount(data.length);
          localStorage.setItem("unreadCount", data.length); // Simpan jumlah yang tidak terbaca di localStorage
        } else {
          setUnreadCount(0);
          localStorage.setItem("unreadCount", 0); // Simpan nol di localStorage
        }
      } catch (e) {
        console.error("Error parsing cache:", e);
        setUnreadCount(0);
        localStorage.setItem("unreadCount", 0); // Simpan nol di localStorage
      }
    } else {
      setUnreadCount(0);
      localStorage.setItem("unreadCount", 0); // Simpan nol di localStorage
    }
  };

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
              <a href="#" className="flex ms-2 md:me-3">
                  <img src="https://static.vecteezy.com/system/resources/previews/011/883/287/original/modern-letter-c-colorful-logo-with-watter-drop-good-for-technology-logo-company-logo-dummy-logo-bussiness-logo-free-vector.jpg" className="h-8 me-3" alt="Friendz Logo" />
                  {/* <img src={Logo} className="h-8 me-3" alt="Friendz Logo" /> */}
                </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 gap-3">
                <div className="relative">
                  <button
                    type="button"
                    className="relative px-3 py-2 text-gray-800 dark:text-white rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setShowModal((prev) => !prev)} // Toggle modal visibility
                    aria-label="Notifications"
                  >
                    <svg
                      width="23"
                      height="28"
                      viewBox="0 0 23 28"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dark:text-white"
                    >
                      <path
                        d="M11.5 28C13.0813 28 14.375 26.7077 14.375 25.1282H8.625C8.625 26.7077 9.91875 28 11.5 28ZM20.125 19.3846V12.2051C20.125 7.79692 17.7819 4.10667 13.6562 3.13026V2.15385C13.6562 0.962051 12.6931 0 11.5 0C10.3069 0 9.34375 0.962051 9.34375 2.15385V3.13026C5.2325 4.10667 2.875 7.78256 2.875 12.2051V19.3846L0 22.2564V23.6923H23V22.2564L20.125 19.3846ZM17.25 20.8205H5.75V12.2051C5.75 8.6441 7.92063 5.74359 11.5 5.74359C15.0794 5.74359 17.25 8.6441 17.25 12.2051V20.8205Z"
                        fill="currentColor"
                      />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute p-0 right-0 top-1 text-xs font-medium text-white bg-palet3 rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <div
                    className={`absolute z-10 w-72 right-0 pb-3 flex flex-col text-sm gap-1 text-white bg-gray-800 dark:bg-gray-700 rounded-t-xl rounded-b-lg tooltip ${
                      showModal ? "block" : "hidden"
                    }`}
                  >
                    <span className="my-3 mx-auto pt-1 capitalize font-medium">
                      You have{" "}
                      <span className="text-palet1">{unreadCount}</span> new
                      notifications!
                    </span>

                    <hr className="border-gray-700 dark:border-gray-600" />
                    <div className="oternotnotnot grid grid-cols-1 gap-1 h-48 overflow-y-auto scrollbar-custom">
                      {inpo.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex items-center mx-2 justify-between px-3 py-3 dark:bg-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setTooltipContent(notif.content);
                            setShowTooltip((prev) => !prev); // Toggle tooltip visibility
                          }} // Set tooltip content on click
                        >
                          <div className="flex gap-3 items-center">
                            <div
                              className="xxwokofk w-8 h-8 rounded-full grid place-items-center"
                              style={{
                                backgroundColor: `#${Math.floor(
                                  Math.random() * 16777215
                                ).toString(16)}`,
                              }}
                            >
                              <svg
                                className="flex-shrink-0 w-4 h-4 text-white bg-opacity-45 transition duration-75 group-hover:text-palet3 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                              </svg>
                            </div>
                            <div className="xxfsjfdjsljflsdjfjs flex flex-col capitalize">
                              <p className="text-sm font-medium dark:text-white group">
                                {notif.title.length > 21
                                  ? `${notif.title.substring(0, 21)}...`
                                  : notif.title}
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-600 dark:bg-gray-500 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <span>{notif.title}</span>
                                </div>
                              </p>

                              <span className="text-xs font-light">
                                {notif.updated_at
                                  ? timeSince(new Date(notif.updated_at))
                                  : "Unknown"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {tooltipContent && (
                      <div className="relative z-11 mx-3 px-3 pb-3 pt-1 mb-1 bg-gray-600 rounded-lg mt-2 border-gray-500 border-2 border-dashed">
                        <span className="text-xs">detail:</span>
                        <p className="text-sm capitalize">{tooltipContent}</p>
                        <button
                          className="absolute top-1 right-2 text-white"
                          onClick={() => setTooltipContent("")} // Hide tooltip content
                          aria-label="Hide tooltip"
                        >
                          &times; {/* Close icon */}
                        </button>
                      </div>
                    )}

                    <hr className="border-gray-700 dark:border-gray-600" />

                    <button
                      className="mt-2 mx-auto text-xs w-auto font-normal text-palet1 rounded-lg hover:text-blue-400"
                      onClick={handleMarkRead}
                    >
                      Mark Read
                    </button>
                  </div>

                  {modalIsOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
                      <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 w-1/2 max-w-md">
                        <div className="xmfkeretqwer flex justify-between mb-3">
                          <h2 className="text-xl font-bold dark:text-white">
                            Informasi Terbaru
                          </h2>
                          <button
                            className="text-gray-900 hover:text-gray-700 dark:text-gray-300"
                            onClick={closeModal}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <hr />
                        <p className="dark:text-gray-300 mt-3">
                          Whats New?
                          <ul className="list-disc pl-6 mt-2">
                            {inpo.map((item) => (
                              <li key={item.id}>{item.title}</li>
                            ))}
                          </ul>
                        </p>
                        <div className="mt-6 flex items-center justify-end">
                          <label className="dark:text-gray-400 text-xs flex items-center">
                            <input
                              type="checkbox"
                              checked={hideForToday}
                              onChange={handleCheckboxChange}
                              className="mr-2 w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-lg focus:ring-transparent focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            Hide For Today
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <DarkModeToggle />
                <div className="flex items-center gap-2">
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
                          src={`https://dbsf.friendz.id//${profilePhoto}`}
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
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Role Management
                  </span>
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
                    <span>Schedule</span>
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/task">
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
                    Assignment
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/profile-all">
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
                    Profile User
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

export default Dashst;
