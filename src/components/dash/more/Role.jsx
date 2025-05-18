import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_role: "",
    nama_role: "",
    menu: [],
  }); // Gunakan id_role

  const [editingMenuId, setEditingMenuId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState({}); // Untuk menyimpan menu yang dipilih saat edit
  const [allMenuItems, setAllMenuItems] = useState([
    "user & management",
    "paket",
    "santri",
    "laporan",
    "settings",
    "dashboard",
  ]);
  const [showModal, setShowModal] = useState(false);

  const token = getTokenFromCookie();

  useEffect(() => {
    localStorage.removeItem("rolesCache");
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const cachedRoles = localStorage.getItem("rolesCache");

    if (cachedRoles) {
      const { data, timestamp } = JSON.parse(cachedRoles);

      const cacheDuration = 5 * 60 * 1000;
      const now = new Date().getTime();

      if (now - timestamp < cacheDuration) {
        setRoles(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ROLEGET}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rolesData = response.data.Role;

      setRoles(rolesData);
      setLoading(false);

      localStorage.setItem(
        "rolesCache",
        JSON.stringify({ data: rolesData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      toast.error("Error fetching roles:", error);
      console.error("Error fetching roles:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      console.log("Data to be sent: ", formData); // Log the data to be sent
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.ROLESTO}`,
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRoles([...roles, response.data]);
      setFormData({ id_role: "", menu: [], nama_role: "" }); // Gunakan id_role
      setShowModal(false);

      localStorage.removeItem("rolesCache");

      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleUpdate = async (id_role, updatedRole) => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.TEPPUT.replace("{id}", id_role)}`,
        updatedRole,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("rolesCache");

      fetchRoles();
      toast.success("Update Success");
    } catch (error) {
      toast.error("Error updating roles:", error);
      console.error("Error updating roles:", error);
    }
  };

  const handleSaveMenu = async (id_role, updatedMenu) => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.TEPPUT.replace("{id}", id_role)}`, // Asumsi endpoint update sama
        { ...roles.find(r => r.id_role === id_role), menu: JSON.stringify(updatedMenu) }, // Kirim menu sebagai string JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      localStorage.removeItem("rolesCache");
      fetchRoles();
      toast.success("Menu Updated");
      setEditingMenuId(null);
    } catch (error) {
      toast.error("Error updating menu:", error);
      console.error("Error updating menu:", error);
    }
  };

  const deleteService = async (id_role, deletee) => {
    // Terima id_role
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.TEPDELETE.replace("{id}", id_role)}`,
        deletee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("rolesCache");

      fetchRoles();
      toast.success("Data Deleted");
    } catch (error) {
      toast.error("Error deleting role:", error);
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="container w-full mx-auto px-4">
      <div className="hsdfpkxxasda flex justify-between my-3">
        <h2 className="text-3xl font-semibold m-0 p-0 dark:text-white">
          All Roles
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-palet1 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          New Role
        </button>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 z-50 mx-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white dark:bg-slate-600 px-6 py-4 rounded-md w-96 flex flex-col">
            <div className="flex items-center flex-row-reverse mb-4">
              <div className="flex space-x-2">
                <div
                  className="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition duration-200"
                  onClick={() => setShowModal(false)}
                ></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 cursor-pointer hover:scale-110 transition duration-200"></div>
                <div className="w-4 h-4 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition duration-200"></div>
              </div>
              <h3 className="text-lg w-full text-center font-semibold dark:text-white">
                Create New User
              </h3>
              {/* Ubah judul modal */}
            </div>

            <label
              htmlFor="menu"
              className="text-sm font-medium text-gray-700 dark:text-white"
            >
              Nama Role
            </label>
            <input
              type="text"
              name="nama_role"
              required
              value={formData.nama_role}
              onChange={handleInputChange}
              placeholder="Type"
              className="mr-2 dark:focus:outline-none"
            />

            <div className="flex flex-col">
              <label
                htmlFor="menu"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Menu
              </label>
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="vue-checkbox"
                      type="checkbox"
                      name="menu"
                      value="user & management"
                      checked={formData.menu.includes("user & management")}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const { value } = e.target;
                        const newValue = isChecked
                          ? [...formData.menu, value]
                          : formData.menu.filter((item) => item !== value);
                        setFormData({ ...formData, menu: newValue });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      // for="vue-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      User & Management
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="react-checkbox"
                      type="checkbox"
                      name="menu"
                      value="paket"
                      checked={formData.menu.includes("paket")}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const { value } = e.target;
                        const newValue = isChecked
                          ? [...formData.menu, value]
                          : formData.menu.filter((item) => item !== value);
                        setFormData({ ...formData, menu: newValue });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="react-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Paket
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="react-checkbox"
                      type="checkbox"
                      name="menu"
                      value="laporan"
                      checked={formData.menu.includes("laporan")}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const { value } = e.target;
                        const newValue = isChecked
                          ? [...formData.menu, value]
                          : formData.menu.filter((item) => item !== value);
                        setFormData({ ...formData, menu: newValue });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="react-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Laporan
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="react-checkbox"
                      type="checkbox"
                      name="menu"
                      value="settings"
                      checked={formData.menu.includes("settings")}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const { value } = e.target;
                        const newValue = isChecked
                          ? [...formData.menu, value]
                          : formData.menu.filter((item) => item !== value);
                        setFormData({ ...formData, menu: newValue });
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="react-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Settings
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <button
              onClick={handleCreate}
              type="submit"
              className="bg-primary mt-3 text-white px-4 py-2 rounded hover:translate-y-1 transition"
            >
              Buat
            </button>
          </div>
        </div>
      )}
      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Id
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Menu
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Modified
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Actions
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
                    <td className="px-6 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              roles.map((role) => (
                <tr
                  key={role.id_role}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                  <td className="px-4 py-3 w-11 text-sm text-gray-700 dark:text-white">
                    {role.id_role}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                    <input
                      className="focus:outline-none"
                      type="text"
                      value={role.nama_role}
                      onBlur={(e) =>
                        handleUpdate(role.id_role, {
                          ...role,
                          nama_role: e.target.value,
                        })
                      }
                      onChange={(e) => {
                        const updateRolees = roles.map((s) =>
                          s.id_role === role.id_role
                            ? { ...s, nama_role: e.target.value }
                            : s
                        );
                        setRoles(updateRolees);
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {editingMenuId === role.id_role ? (
                        <div className="flex flex-col">
                          {allMenuItems.map((item) => (
                            <label
                              key={item}
                              className="inline-flex items-center"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                                value={item}
                                checked={selectedMenu[item]}
                                onChange={(e) => {
                                  setSelectedMenu({
                                    ...selectedMenu,
                                    [item]: e.target.checked,
                                  });
                                }}
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                            </label>
                          ))}
                          <div className="mt-2">
                            <button
                              onClick={() =>
                                handleSaveMenu(
                                  role.id_role,
                                  Object.keys(selectedMenu).filter(
                                    (key) => selectedMenu[key]
                                  )
                                )
                              }
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs mr-1"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditingMenuId(null)}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded text-xs"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span
                          className="text-xs italic cursor-pointer"
                          onClick={() => {
                            setEditingMenuId(role.id_role);
                            setSelectedMenu(
                              JSON.parse(role.menu || "{}").reduce(
                                (acc, curr) => ({ ...acc, [curr]: true }),
                                {}
                              )
                            );
                          }}
                        >
                          {role.menu
                            ? JSON.parse(role.menu).join(", ")
                            : "no data"}
                        </span>
                      )}
                    </td>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-700 dark:text-white">
                    {role.updated_at
                      ? timeSince(new Date(role.updated_at))
                      : "Unknown"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-white">
                    <button
                      onClick={() => deleteService(role.id_role)} // Gunakan role.id_role
                      disabled={role.id_role >= 1 && role.id_role <= 3} // Gunakan role.id_role
                      className={
                        role.id_role >= 1 && role.id_role <= 3
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

export default Role;
