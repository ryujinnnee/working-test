import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import { timeSince } from "../../../utils/timeUtils";
import toast, { Toaster } from "react-hot-toast";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id_role: "", nama_role: "" }); // Gunakan id_role
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
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.ROLESTO}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoles([...roles, response.data]);
      setFormData({ id_role: "", nama_role: "" }); // Gunakan id_role
      setShowModal(false);

      localStorage.removeItem("rolesCache");

      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleUpdate = async (id_role, updatedRole) => { // Terima id_role
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

  const deleteService = async (id_role, deletee) => { // Terima id_role
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
        <h2 className="text-3xl font-semibold m-0 p-0 dark:text-white">All Roles</h2>
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
          <div className="modal-content bg-white dark:bg-slate-600 p-4 rounded-s">
            <span className="close text-black dark:text-white cursor-pointer bg-primary rounded-full p-1" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <input
              type="text"
              name="nama_role"
              required
              value={formData.nama_role}
              onChange={handleInputChange}
              placeholder="Type"
              className="mr-2 dark:focus:outline-none"
            />
            <button onClick={handleCreate} type="submit" className="bg-primary text-white px-4 py-2 rounded hover:translate-y-1 transition">
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
                <tr key={role.id_role}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                  <td className="px-4 py-3 w-11 text-sm text-gray-700 dark:text-white">{role.id_role}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-white">
                    <input
                      className="focus:outline-none"
                      type="text"
                      value={role.nama_role}
                      onBlur={(e) =>
                        handleUpdate(role.id_role, { // Gunakan role.id_role
                          ...role,
                          nama_role: e.target.value,
                        })
                      }
                      onChange={(e) => {
                        const updateRolees = roles.map((s) =>
                          s.id_role === role.id_role ? { ...s, nama_role: e.target.value } : s // Gunakan s.id_role dan role.id_role
                        );
                        setRoles(updateRolees);
                      }}
                    />
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
                      className={role.id_role >= 1 && role.id_role <= 3 ? "cursor-not-allowed text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500" : "text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"}
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