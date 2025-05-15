import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../../auth/localdt";
import Cat from "../../../assets/ketfig.gif";
const Dashboard2 = () => {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    gender: "",
    dob: "",
    address: "",
    hobby: "",
    sosmed_link: "",
    identity_number: "",
    university: "",
    phone_number: "",
  });
  const [userData, setUserData] = useState({});

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
        setUserData(response.data.id);
        setUpdateData({
          gender: response.data.gender || "",
          dob: response.data.dob || "",
          address: response.data.address || "",
          hobby: response.data.hobby || "",
          sosmed_link: response.data.sosmed_link || "",
          identity_number: response.data.identity_number || "",
          university: response.data.university || "",
          phone_number: response.data.phone_number || "",
        });
        console.log("gw adalah", response.data.id);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      toast.error("Gagal mendapatkan data pengguna");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateDetail = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resid = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const aydi = resid.data.id;
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.CRETDTL.replace("{id}", aydi)}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("cek data kirim:", response); // Log response for debugging

      if (response.status === 200) {
        toast.success("Detail berhasil diperbarui!");
        setUserData(updateData);
      } else {
        toast.error(`Gagal memperbarui detail: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating detail:", error);
      if (error.response) {
        toast.error(
          `Gagal memperbarui detail: ${error.response.status} - ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        toast.error("Gagal memperbarui detail: No response from server");
      } else {
        toast.error(`Gagal memperbarui detail: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="gif-container">
        <img 
          src={Cat} 
          alt="Descriptive alt text" 
          className="w-2/3 mx-auto h-auto rounded-xl mb-1" 
        />
      </div>
      <h2 className="text-xl font-semibold mb-3">Lengkapi Profile Anda</h2>
      <p className="text-gray-600 mb-5 text-sm text-center w-1/3">
        Status akun anda saat ini <strong>pending</strong>, Hubungi admin
        jika anda telah melengkapi form profile.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 w-3/5">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Mencegah refresh
            updateDetail(); // Memanggil fungsi untuk memperbarui data
          }}
        >
          <div className="flex mb-4">
            <div className="mb-4 w-1/2 flex">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  id="gender-male"
                  type="radio"
                  value="male"
                  checked={updateData.gender === "male"}
                  onChange={(e) =>
                    setUpdateData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                />
                <label className="text-sm text-gray-700 mr-3" htmlFor="gender-male">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  id="gender-female"
                  type="radio"
                  value="female"
                  checked={updateData.gender === "female"}
                  onChange={(e) =>
                    setUpdateData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                />
                <label
                  className="text-sm text-gray-700"
                  htmlFor="gender-female"
                >
                  Female
                </label>
              </div>
            </div>
            <div className="mb-4 w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dob"
                type="date"
                placeholder="Date of Birth"
                value={updateData.dob}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={updateData.address}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hobby"
              >
                Hobby
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hobby"
                type="text"
                placeholder="Hobby"
                value={updateData.hobby}
                onChange={(e) =>
                  setUpdateData((prev) => ({ ...prev, hobby: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sosmed_link"
              >
                Social Media Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sosmed_link"
                type="text"
                placeholder="Social Media Link"
                value={updateData.sosmed_link}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    sosmed_link: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="identity_number"
              >
                Identity Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="identity_number"
                type="number"
                placeholder="Identity Number"
                value={updateData.identity_number}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    identity_number: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="university"
              >
                University
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="university"
                type="text"
                placeholder="University"
                value={updateData.university}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    university: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone_number"
                type="number"
                placeholder="Phone Number"
                value={updateData.phone_number}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button
            className="bg-palet1 w-full hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            
          >
            Perbarui Profile
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard2;
