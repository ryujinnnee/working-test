import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URL, ENDPOINTS, URL_BASE } from "../auth/api";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../auth/localdt";
import { fetchDetail } from "../components/dash/admin/profile/fetchDetail";
import { createDetail } from "../components/dash/admin/profile/createDetail";

const ProfileUpd = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [name, setName] = useState("");
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    email_verified_at: "",
  });
  const [userData, setUserData] = useState({});
  // const [detailData, setDetailData] = useState(null);
  const [detailData, setDetailData] = useState({
    gender: "",
    dob: "",
    hobby: "",
    sosmed_link: "",
    address: "",
    phone_number: "",
    identity_number: "",
    university: "",
    profile_photo: null,
    cover_photo: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [staffDetail, setStaffDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle antara mode read-only dan edit
  };

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
        // const  kunData = response.data;
        // console.table(response.data.dat);
        const fullName = response.data.name.split(" "); // Memisahkan nama
        setUserData(response.data);
        setUpdateData({
          firstName: fullName[0] || "", // Setel first name
          lastName: fullName.slice(1).join(" ") || "", // Setel last name
          email: response.data.email,
          email_verified_at: response.data.email_verified_at,
        });
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      toast.error("Gagal mendapatkan data pengguna");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserData(); // Panggil fungsi untuk mendapatkan data pengguna saat komponen dimuat
    const getDetail = async () => {
      try {
        const data = await fetchDetail(); // Panggil fungsi fetchDetail
        setDetailData(data.data); // Simpan data yang diambil ke state
        setLoading(false);
      } catch (err) {
        setError(err.message); // Tangani error dan simpan di state
        setLoading(false);
      }
    };
    getDetail();
  }, [userData.id]); // Gunakan array kosong agar fungsi ini hanya dipanggil sekali saat komponen dimuat

  const requestEmailVerification = async () => {
    const token = getTokenFromCookie();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.VERMEL}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Email verification request sent successfully.");
      } else {
        toast.error("Failed to send email verification request.");
      }
    } catch (error) {
      console.error("Error sending email verification request:", error);
      toast.error("Failed to send email verification request.");
    }
  };

  const updateProfile = async () => {
    const token = getTokenFromCookie();

    if (!token) {
      navigate("/login");
      return;
    }

    const { firstName, lastName, email } = updateData;

    // Validasi: Semua field harus terisi
    if (!firstName || !lastName || !email) {
      toast.error("Semua field harus diisi");
      return;
    }

    // Validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Format email tidak valid");
      return;
    }

    // Gabungkan firstName dan lastName menjadi satu field 'name'
    const updatePayload = {
      ...updateData, // Tetap kirim semua data lainnya (seperti email)
      name: `${firstName} ${lastName}`, // Gabungkan firstName dan lastName
    };

    console.log("Data yang dikirim ke server:", updatePayload);

    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.CHAPROF.replace("{id}", userData?.id)}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response dari server:", response);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Profil berhasil diperbarui!");
        setUserData(updatePayload);
      } else {
        toast.error("Gagal memperbarui profil, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        "Terjadi kesalahan saat memperbarui profil. Silakan coba lagi."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const updatePassword = async (
    currentPassword,
    newPassword,
    passwordConfirmation
  ) => {
    const token = getTokenFromCookie();

    if (!token) {
      navigate("/login");
      return;
    }

    if (newPassword !== passwordConfirmation) {
      toast.error("Password baru dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.CHPW.replace("{id}", userData.id)}`,
        {
          old_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password berhasil diperbarui!"); // Tampilkan pesan sukses
        setCurrentPassword("");
        setNewPassword("");
        setPasswordConfirmation("");
      } else {
        toast.error("Gagal memperbarui password, silakan coba lagi."); // Tampilkan pesan kesalahan
      }
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response || error.message
      );
      toast.error(
        "Terjadi kesalahan saat memperbarui password. Silakan coba lagi."
      ); // Tampilkan pesan kesalahan
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createDetail(detailData); // Menggunakan state yang sama
      console.log("Detail created successfully:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error creating detail:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDetailData((prevDetail) => ({
      ...prevDetail,
      [name]: files ? files[0] : value, // Menangani file jika ada
    }));
  };

  return (
    <div className="w-full" style={{ height: "80dvh" }}>
      {/* <h1 className="mb-3 text-3xl dark:text-white">Profile Page</h1> */}
      <div className="relative mt-3" style={{ width: "20%" }}>
        <div className="tabs flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
              activeTab === "profile"
                ? "text-blue-500 font-medium text-xl"
                : "text-gray-500 font-medium text-xl"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
              activeTab === "details"
                ? "text-blue-500 font-medium text-xl"
                : "text-gray-500 font-medium text-xl"
            }`}
          >
            Detail
          </button>
        </div>
        <div
          className={`absolute bottom-0 h-1 w-1/2 bg-blue-200 transition-all duration-300 ease-in-out ${
            activeTab === "profile" ? "left-0" : "left-1/2"
          }`}
        />
      </div>
      {activeTab === "profile" && (
        <div className="profileline flex w-full h-3/4 mt-11 mx-3 gap-3 max-lg:flex-col">
          <div className="proflef w-1/2 max-lg:w-full h-full">
            <span className="text-lg dark:text-gray-200 font-normal">
              Personal Information
            </span>
            <div className="lefprof flex flex-col mt-4 space-y-4 w-10/12">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={updateData.firstName}
                    onChange={(e) =>
                      setUpdateData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={updateData.lastName}
                    onChange={(e) =>
                      setUpdateData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full px-5 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex gap-1 items-center justify-between">
                  {updateData.email_verified_at ? (
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                  ) : (
                    <div className="flex gap-1">
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <span className="block mb-2 text-xs italic font-medium text-gray-700 dark:text-gray-300">
                        not verified
                      </span>
                      <button
                        onClick={requestEmailVerification}
                        className="text-sm mb-2 ml-3 text-blue-500 hover:text-blue-700"
                      >
                        Request Verification
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={updateData.email}
                  onChange={(e) =>
                    setUpdateData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>

              <button
                onClick={updateProfile}
                className="w-full px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-palet3 to-palet2 rounded-xl hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform duration-200 transform hover:translate-y-1"
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="profrig w-1/2 h-full max-lg:w-full max-lg:mt-5">
            <span className="text-lg dark:text-gray-200 font-normal">
              Password Manager
            </span>
            <div className="flex w-10/12 flex-col gap-3 mt-3">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Mengubah tipe input berdasarkan state
                id="currentPassword"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)} // Update state untuk password saat ini
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Mengubah tipe input berdasarkan state
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update state untuk password baru
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <label
                htmlFor="retypePassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Retype New Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Mengubah tipe input berdasarkan state
                id="retypePassword"
                placeholder="Retype New Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)} // Update state untuk konfirmasi password
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <label
                htmlFor="showPassword"
                className="mt-2 text-sm text-blue-500"
              >
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)} // Toggle visibilitas password
                />
                Show Passwords
              </label>
              <button
                type="button"
                onClick={() =>
                  updatePassword(
                    currentPassword,
                    newPassword,
                    passwordConfirmation
                  )
                } // Pastikan nilai dikirim dengan benar
                className="w-full px-4 py-2 text-base font-semibold text-white bg-gradient-to-r from-palet3 to-palet2 rounded-xl hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-pink-300 transition-transform duration-200 transform hover:translate-y-1"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "details" && (
        <div className="detprof w-full mt-11 mx-3">
          <span className="text-lg dark:text-gray-200 font-normal">
            Detail Profile
          </span>
          {detailData && (
            <div>
              {/* <form className="space-y-6 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Gender
                    </label>
                    <input
                      type="text"
                      value={detailData.gender}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={detailData.dob}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hobby
                    </label>
                    <input
                      type="text"
                      value={detailData.hobby}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Social Media Link
                    </label>
                    <input
                      type="text"
                      value={detailData.sosmed_link}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={detailData.address}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={detailData.phone_number}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Identity Number
                    </label>
                    <input
                      type="text"
                      value={detailData.identity_number}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      University
                    </label>
                    <input
                      type="text"
                      value={detailData.university}
                      readOnly
                      className="mt-2 block w-3/4 px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </form> */}
              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                {/* Gender */}

                <div className="flex w-full justify-between">
                  <div className="lefom w-3/4">
                    <div className="derndate flex w-full gap-1">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="gender"
                          className="text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                          <input
                            id="gender-male"
                            name="gender"
                            type="radio"
                            value="male"
                            checked={detailData.gender === "male"}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`mr-2 ${
                              isEditing
                                ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                : "border-transparent bg-gray-100 cursor-not-allowed"
                            }`}
                          />
                          <label
                            htmlFor="gender-male"
                            className="text-sm font-medium text-gray-700"
                          >
                            Male
                          </label>
                          <input
                            id="gender-female"
                            name="gender"
                            type="radio"
                            value="female"
                            checked={detailData.gender === "female"}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`ml-4 ${
                              isEditing
                                ? "border-gray-300 border focus:ring-indigo-500 focus:border-indigo-500"
                                : "border-transparent bg-gray-100 cursor-not-allowed"
                            }`}
                          />
                          <label
                            htmlFor="gender-female"
                            className="text-sm font-medium text-gray-700"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                      {/* Date of Birth */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="dob"
                          className="text-sm font-medium text-gray-700"
                        >
                          Date of Birth
                        </label>
                        <input
                          id="dob"
                          name="dob"
                          type="date"
                          value={detailData.dob}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                            isEditing
                              ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                              : "border-transparent bg-gray-100 cursor-not-allowed"
                          }`}
                          required
                        />
                      </div>
                    </div>
                    {/* Sosmed Link */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="sosmed_link"
                        className="text-sm font-medium text-gray-700"
                      >
                        Social Media Link
                      </label>
                      <input
                        id="sosmed_link"
                        name="sosmed_link"
                        type="url"
                        value={detailData.sosmed_link}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Hobby */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="hobby"
                        className="text-sm font-medium text-gray-700"
                      >
                        Hobby
                      </label>
                      <input
                        id="hobby"
                        name="hobby"
                        type="text"
                        value={detailData.hobby}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="address"
                        className="text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={detailData.address}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="phone_number"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        value={detailData.phone_number}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* University */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="university"
                        className="text-sm font-medium text-gray-700"
                      >
                        University
                      </label>
                      <input
                        id="university"
                        name="university"
                        type="text"
                        value={detailData.university}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Identity Number */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="identity_number"
                        className="text-sm font-medium text-gray-700"
                      >
                        Identity Number
                      </label>
                      <input
                        id="identity_number"
                        name="identity_number"
                        type="file"
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                          isEditing
                            ? "border-gray-300 border border-dashed focus:ring-indigo-500 focus:border-indigo-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                      {detailData.identity_number ? (
                        <p>
                          <a
                            href={`${"http://127.0.0.1:8000/"}${
                              detailData.identity_number
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11h2v-2h-2v2zm0-4h2V7h-2v2z" />
                            </svg>
                            ktp
                          </a>
                        </p>
                      ) : (
                        <p>No file uploaded</p>
                      )}
                    </div>

                    {/* Profile Photo */}
                    <div className="mergppnpc flex">
                      <div className="flex flex-col">
                        <label
                          htmlFor="profile_photo"
                          className="text-sm font-medium text-gray-700"
                        >
                          Profile Photo
                        </label>
                        <input
                          id="profile_photo"
                          name="profile_photo"
                          type="file"
                          onChange={handleChange}
                          readOnly={!isEditing}
                          className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                            isEditing
                              ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                              : "border-transparent bg-gray-100"
                          }`}
                        />
                        {detailData.profile_photo ? (
                          <p>
                            <a
                              href={`${"http://127.0.0.1:8000/"}${
                                detailData.profile_photo
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11h2v-2h-2v2zm0-4h2V7h-2v2z" />
                              </svg>
                              profile pic
                            </a>
                          </p>
                        ) : (
                          <p>No file uploaded</p>
                        )}
                      </div>

                      {/* Cover Photo */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="cover_photo"
                          className="text-sm font-medium text-gray-700"
                        >
                          Cover Photo
                        </label>
                        <input
                          id="cover_photo"
                          name="cover_photo"
                          type="file"
                          onChange={handleChange}
                          readOnly={!isEditing}
                          className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                            isEditing
                              ? "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                              : "border-transparent bg-gray-100"
                          }`}
                        />
                        {detailData.cover_photo ? (
                          <p>
                            <a
                              href={`${"http://127.0.0.1:8000/"}${
                                detailData.cover_photo
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11h2v-2h-2v2zm0-4h2V7h-2v2z" />
                              </svg>
                              cover pic
                            </a>
                          </p>
                        ) : (
                          <p>No file uploaded</p>
                        )}
                      </div>
                    </div>
                    {/* penutup left form */}
                  </div>

                  <div className="rigtfom w-auto">
                    <div className="flex gap-2 justify-between">
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="px-4 py-2 rounded-md transition duration-300 ease-in-out dark:text-white"
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                      {isEditing && (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
              </form>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ProfileUpd;
