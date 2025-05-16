import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./custom.css";
import StoryContainer from "../story/Storyhom";
import Logo from "../../assets/friendzlogo.png";

const Guest2 = () => {
  const [showStories, setShowStories] = useState(false);

  const handleShowStories = () => {
    setShowStories(true);
  };

  const handleCloseStories = () => {
    setShowStories(false);
  };

  return (
    <div className="relative overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <Link to="/">
          {/* <a href="#" className="flex ms-2 md:me-3"> */}
            <img
              src="https://thursinaiibs.sch.id//assets/upload/Thursina_logo_white-min.png"
              className="h-9 me-24"
              alt="Friendz Logo"
            />
            {/* <img src={Logo} className="h-8 me-3" alt="Friendz Logo" /> */}
          {/* </a> */}
        </Link>
        {/* <Link
          to="/login"
          className="py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-palet1 rounded hover:bg-blue-700 transition" style={{zIndex: "999999999"}}
        >
          Note
        </Link> */}
        {!showStories ? (
          <button
            onClick={handleShowStories}
            className="py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-palet1 rounded-md hover:bg-blue-700 hover:bg-gradient-to-r hover:from-palet1 hover:to-blue-400 transition duration-1000"
            style={{ zIndex: "999999999" }}
          >
            Update Note
          </button>
        ) : (
          <StoryContainer onClose={handleCloseStories} />
        )}
      </header>
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
        <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
      </div>

      <div className="relative mt-11">
        <div className="max-w-[85rem] mx-auto my-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid place-items-center">
          <div className="max-w-2xl text-center mx-auto text-pretty">
            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-palet2 to-text text-transparent dark:from-blue-400 dark:to-violet-400">
              Be Bold with Us
            </p>

            <div className="mt-5 max-w-2xl">
              <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                aplikasi{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-palet3 to-palet2">
                  paket santri
                </span>{" "}
              </h1>
            </div>

            <div className="mt-5 max-w-3xl">
              <p className="text-base text-gray-600 text-center dark:text-neutral-400 text-pretty">
                Aplikasi Paket Santri adalah solusi digital komprehensif yang dirancang khusus untuk mempermudah pengelolaan kebutuhan dan aktivitas santri di lingkungan pondok pesantren. 
              </p>
            </div>

            <div className="mt-8 gap-3 flex justify-center">
              <Link to="/login">
                <a className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-transparent duration-1000 bg-gradient-to-l from-palet1 to-blue-600 text-white hover:bg-gradient-to-r hover:from-palet1 hover:to-blue-400 focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                  Get started
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </Link>
              <a
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="https://www.figma.com/proto/fFE5p9vdT2qdRB7Uz65S6A/FriendZEEE?node-id=117-3&p=f&t=3uNn3Ddh9CcAQpJc-1&scaling=scale-down&content-scaling=fixed&page-id=70%3A2&starting-point-node-id=117%3A3"
                target="_blank"
              >
                <svg
                  className="shrink-0 size-4"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.875 18C8.531 18 9.875 16.656 9.875 15V12H6.875C5.219 12 3.875 13.344 3.875 15C3.875 16.656 5.219 18 6.875 18Z"
                    fill="#0ACF83"
                  ></path>
                  <path
                    d="M3.875 9C3.875 7.344 5.219 6 6.875 6H9.875V12H6.875C5.219 12 3.875 10.656 3.875 9Z"
                    fill="#A259FF"
                  ></path>
                  <path
                    d="M3.875 3C3.875 1.344 5.219 0 6.875 0H9.875V6H6.875C5.219 6 3.875 4.656 3.875 3Z"
                    fill="#F24E1E"
                  ></path>
                  <path
                    d="M9.87501 0H12.875C14.531 0 15.875 1.344 15.875 3C15.875 4.656 14.531 6 12.875 6H9.87501V0Z"
                    fill="#FF7262"
                  ></path>
                  <path
                    d="M15.875 9C15.875 10.656 14.531 12 12.875 12C11.219 12 9.87501 10.656 9.87501 9C9.87501 7.344 11.219 6 12.875 6C14.531 6 15.875 7.344 15.875 9Z"
                    fill="#1ABCFE"
                  ></path>
                </svg>
                Tutorial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest2;
