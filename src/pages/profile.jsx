import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../auth/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { getTokenFromCookie, removeToken } from "../auth/localdt";
import { handleLogout } from "../auth/logoutUtil";
import Joyride from "react-joyride";

const Profile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    profile_photo: "",
    cover_photo: "",
    name: "",
    email: "",
    email_verified_at: "",
  });

  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   id: "",
  //   sta: "",
  // });
 
 
  

  useEffect(() => {
    
    const fetchData = async () => {
      const cachedProf = localStorage.getItem("rekProf");

      if (cachedProf) {
        const { data, timestamp } = JSON.parse(cachedProf);

        const cacheDuration = 5 * 60 * 1000;
        const now = new Date().getTime();

        if (now - timestamp < cacheDuration) {
          setUserData(data);
          // setLoading(false);
          return;
        }
      }
      try {
        const token = getTokenFromCookie();

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userDetails = response.data.data?.[0] || response.data;

        if (userDetails) {
          setUserData({
            name: userDetails.name || "",
            email: userDetails.email || "",
            profile_photo: userDetails.profile_photo || "",
            cover_photo: userDetails.cover_photo || "",
            email_verified_at: userDetails.email_verified_at || "",
          });

          localStorage.setItem(
            "rekProf",
            JSON.stringify({
              data: userDetails,
              timestamp: new Date().getTime(),
            })
          );
        } else {
          throw new Error("User data not found in response");
        }
        console.table(userDetails); // Debugging untuk memastikan data benar
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        navigate("/login");
      }
    };

    fetchData();
  }, []);
  
    
  return (
    <div className="grid place-items-center" style={{ height: "80dvh" }}>
      <div className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-xl dark:text-white w-80">
        <div className="flex flex-col items-center mb-4">
          <div className="outerimage w-full relative">
            <img
              src={
                userData.profile_photo
                  ? `${"https://dbsf.friendz.id/"}${userData.profile_photo}`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt="Profile"
              className="rounded-full object-cover mb-3 w-20 h-20 absolute bottom-0 left-1/2 transform -translate-x-1/2"
            />
            <img
              className="w-full h-32 object-cover rounded-t-lg"
              src={
                userData.cover_photo
                  ? `${"https://dbsf.friendz.id/"}${userData.cover_photo}`
                  : "https://dummyimage.com/hd1080"
              }
              alt="cover_photo"
            />
          </div>
          <p className="text-xl font-semibold mt-2 capitalize">
            {userData.name}
          </p>
          <p className={`text-sm ${userData.email_verified_at ? "text-gray-800 dark:text-white" : "text-red-500 dark:text-red-500"}`}>
            {userData.email}
          </p>
          
          
        </div>

        <div className="w-full mt-3 px-6 py-6 flex justify-between">
          <button
            className="element-pertama flex px-4 py-2 text-white bg-gradient-to-r from-palet3 to-palet2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/update-profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 17.25V21h3.75L17.81 12L6.75 3v14.25z" />
              <path d="M19.5 13.5H4.5v-9h15v9z" />
              <path d="M13.5 10.5h-9v-9h9v9z" />
            </svg>
            Edit Profile
          </button>
          <button
            id="element-kedua"
            className="flex px-4 py-2 text-white bg-red-500 hover:translate-y-1 rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm-1-8V3l5 4-5 4V9h-9V5h9z" />
            </svg>
            Logout
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-dvh grid place-items-center w-full z-50">
              <div className="relative my-auto mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Konfirmasi Logout
                  </h3>
                  <div className="mt-2 px-7 py-3">
                    <p className="text-sm text-gray-500">
                      Apakah anda yakin akan logout?
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-4 py-3 mx-auto">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-500 text-white transition-all text-base font-medium rounded-md w-24 mr-2 hover:-translate-x-1 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        handleLogout();
                      }}
                      className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md transition-all w-24 hover:translate-y-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-orange-300 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
