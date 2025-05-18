import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]); // Ubah nama state menjadi 'users'
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id_user: "", nama_user: "", "username": "", "password": "", "password_confirmation" : "" }); // Sesuaikan dengan data user
  const [showModal, setShowModal] = useState(false);

  const token = getTokenFromCookie();

  useEffect(() => {
    localStorage.removeItem("usersCache"); // Ubah cache key
    fetchUsers(); // Ubah nama fungsi fetch
  }, []);

  const fetchUsers = async () => { // Ubah nama fungsi fetch
    const cachedUsers = localStorage.getItem("usersCache"); // Ubah cache key

    if (cachedUsers) {
      const { data, timestamp } = JSON.parse(cachedUsers);

      const cacheDuration = 5 * 60 * 1000;
      const now = new Date().getTime();

      if (now - timestamp < cacheDuration) {
        setUsers(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.USERALL}`, { // Ubah endpoint
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usersData = response.data.users; // Sesuaikan dengan struktur respons

      setUsers(usersData);
      setLoading(false);

      localStorage.setItem(
        "usersCache",
        JSON.stringify({ data: usersData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching users:", error); // Ubah pesan error
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.REGISTER_STAFF}`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers([...users, response.data]);
      setFormData({ id_user: "", nama_user: "", username: "" });
      setShowModal(false);

      localStorage.removeItem("usersCache"); // Ubah cache key
      toast.success("Update Success");
      fetchUsers(); // Ubah nama fungsi fetch
    } catch (error) {
      console.error("Error creating user:", error); // Ubah pesan error
    }
  };

  const handleUpdate = async (id_user, updatedUser) => { // Ubah parameter
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.USERPUT.replace("{id}", id_user)}`, // Ubah endpoint
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("usersCache"); // Ubah cache key

      fetchUsers(); // Ubah nama fungsi fetch
      toast.success("Update Success");
    } catch (error) {
      toast.error("Error updating users:", error); // Ubah pesan error
      console.error("Error updating users:", error);
    }
  };

  const deleteUser = async (id_user, deletee) => { 
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.USERDELETE.replace("{id}", id_user)}`, // Ubah endpoint
        deletee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("usersCache"); // Ubah cache key

      fetchUsers(); // Ubah nama fungsi fetch
      toast.success("Data Deleted");
    } catch (error) {
      toast.error("Error deleting user:", error); // Ubah pesan error
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container w-full mx-auto px-4">
      <div className="hsdfpkxxasda flex justify-between my-3">
        <h2 className="text-3xl font-semibold m-0 p-0 dark:text-white">All Users</h2> {/* Ubah judul */}
        <button
          onClick={() => {
            setShowModal(true);
            setFormData({ id_user: "", nama_user: "" }); // Reset form saat membuka modal
          }}
          className="bg-gradient-to-r from-blue-500 to-palet1 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          New User {/* Ubah teks tombol */}
        </button>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 mx-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content transition-all duration-700 ease-in-out bg-white dark:bg-slate-700 px-6 py-3 rounded-md shadow-lg w-full max-w-md">
            <div className="flex items-center flex-row-reverse mb-4">
              <div className="flex space-x-2">
                <div
                  className="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition duration-200"
                  onClick={() => setShowModal(false)}
                ></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 cursor-pointer hover:scale-110 transition duration-200"></div>
                <div className="w-4 h-4 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition duration-200"></div>
              </div>
              <h3 className="text-lg w-full text-center font-semibold dark:text-white">Create New User</h3> {/* Ubah judul modal */}
            </div>

            {/* Form Input */}
            <div className="mb-4">
              <label htmlFor="nama_user" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Nama
              </label>
              <input
                type="text"
                id="nama_user"
                name="nama_user"
                required
                value={formData.nama_user}
                onChange={handleInputChange}
                placeholder="Nama Lengkap"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-slate-800 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nama_user" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                placeholder="user3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-slate-800 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nama_user" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-slate-800 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nama_user" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Password Confirmation
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
                value={formData.password_confirmation}
                onChange={handleInputChange}
                placeholder="ulangi password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-slate-800 dark:border-gray-600 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200 mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                type="submit"
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-palet1 transition duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-700 flex gap-3 dark:border-gray-600 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-500">
          <thead className="bg-gray-100 dark:bg-gray-600">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Id
              </th>
              <th className="px-5 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Nama {/* Ubah nama kolom */}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Username {/* Ubah nama kolom */}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Modified
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
            {loading ? (
              <>
                {[1, 2].map((_, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                      <div className="h-2 w-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              users.map((user) => ( // Ubah nama variabel
                <tr
                  key={user.id_user} // Sesuaikan key
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-4 py-3 w-11 text-sm text-gray-700 dark:text-gray-300">{user.id_user}</td> {/* Sesuaikan data */}
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      className="focus:outline-none dark:bg-slate-800 dark:text-white"
                      type="text"
                      value={user.nama_user} // Sesuaikan data
                      onBlur={(e) =>
                        handleUpdate(user.id_user, { // Sesuaikan parameter
                          ...user,
                          nama_user: e.target.value, // Sesuaikan properti
                        })
                      }
                      onChange={(e) => {
                        const updatedUsers = users.map((u) => // Ubah nama variabel
                          u.id_user === user.id_user ? { ...u, nama_user: e.target.value } : u // Sesuaikan kondisi dan properti
                        );
                        setUsers(updatedUsers); 
                      }}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      className="focus:outline-none dark:bg-slate-800 dark:text-white"
                      type="text"
                      value={user.username} // Sesuaikan data
                      onBlur={(e) =>
                        handleUpdate(user.id_user, { // Sesuaikan parameter
                          ...user,
                          username: e.target.value, // Sesuaikan properti
                        })
                      }
                      onChange={(e) => {
                        const updatedUsers = users.map((u) => // Ubah nama variabel
                          u.id_user === user.id_user ? { ...u, username: e.target.value } : u // Sesuaikan kondisi dan properti
                        );
                        setUsers(updatedUsers); 
                      }}
                    />
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-700 dark:text-gray-300">
                    {user.updated_at
                      ? timeSince(new Date(user.updated_at))
                      : "Unknown"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <button
                      onClick={() => deleteUser(user.id_user)} // Sesuaikan fungsi dan parameter
                      disabled={user.id_user >= 1 && user.id_user <= 3} // Contoh kondisi disable
                      className={
                        user.id_user >= 1 && user.id_user <= 3
                          ? "cursor-not-allowed text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                          : "text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default User;