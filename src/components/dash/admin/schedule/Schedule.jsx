import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import { getTokenFromCookie } from "../../../../auth/localdt";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import Draggable from "react-draggable";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState();
  const [formData, setFormData] = useState({
    id: "",
    agenda_name: "",
    start_time: "",
    end_time: "",
    participants: [],
    // with_klien: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  useEffect(() => {
    getUserData();
    fetchUsers();
    fetchClients();
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.ALLAJEN}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching schedules:", error);
      console.error("Error fetching schedules:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      toast.error("Gagal mendapatkan data pengguna");
      navigate("/login");
    }
  };
  const deleteSchedule = async (id) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.DELJEN.replace("{id}", id)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchSchedules();
      toast.success("Schedule Deleted", response);
    } catch (error) {
      toast.error("Error deleting schedule:", error);
      console.error("Error deleting schedule:", error);
    }
  };

  const fetchUsers = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ALLUSER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userOptions = response.data.users.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsers(userOptions);
    } catch (error) {
      toast.error("Error fetching users:", error);
      console.error("Error fetching users:", error);
    }
  };
  const fetchClients = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ALLUSER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const clientOptions = response.data
        .filter((user) => user.user_type_id === 8) // Filter to get only the user with id 8
        .map((user) => ({
          value: user.id,
          label: user.name,
          role: user.user_type_id,
        }));
      setClients(clientOptions);
      console.table(clientOptions);
    } catch (error) {
      // toast.error("Error fetching clients:", error);
      console.error("Error fetching clients:", error);
    }
  };
  const handleCreate = async () => {
    try {
      const token = getTokenFromCookie();
      const userId = userData.id;
      if (!userId) {
        toast.error("ID pengguna tidak ditemukan");
        return;
      }
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.NEWAJEN.replace("{id}", userId)}`,
        { ...formData, participants: formData.participants },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSchedules([...schedules, response.data]);
      resetForm();
      toast.success("Agenda Berhasil dibuat");
      fetchSchedules();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Error creating schedule:", error);
    }
  };

  const handleUpdate = async () => {
    if (!currentSchedule) return;

    try {
      const token = getTokenFromCookie();

      // Ambil nilai participants dan pastikan itu adalah array
      const updatedParticipants = Array.isArray(formData.participants)
        ? formData.participants
        : formData.participants
        ? JSON.parse(formData.participants)
        : []; // Parsing jika itu adalah string

      const updatedData = {
        agenda_name: formData.agenda_name || currentSchedule.agenda_name,
        start_time: formData.start_time || currentSchedule.start_time,
        end_time: formData.end_time || currentSchedule.end_time,
        with_klien: formData.with_klien || currentSchedule.with_klien,
        participants: updatedParticipants,
      };

      console.log("Data yang akan diupdate:", updatedData); // Log untuk debug

      await axios.post(
        `${API_URL}${ENDPOINTS.UPAJEN.replace("{id}", currentSchedule.id)}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchSchedules();
      toast.success("Update Successful");
      setShowModal(false);
      setEditMode(false);
      resetForm();
    } catch (error) {
      toast.error("Error updating schedule:", error);
      console.error("Error updating schedule:", error);
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      id: schedule.id,
      agenda_name: schedule.agenda_name,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      participants: schedule.participants,
      with_klien: schedule.with_klien,
    });
    setCurrentSchedule(schedule);
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      agenda_name: "",
      start_time: "",
      end_time: "",
      participants: [],
      with_klien: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-4" style={{ minHeight: "70dvh" }}>
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Schedules
        </h2>
        <button
          onClick={() => {
            setEditMode(false);
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-palet1 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        >
          New Schedule
        </button>
      </div>
      <div className="bg-white overflow-x-auto dark:bg-slate-600 flex gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
      
        {loading ? (
          <p>Loading...</p>
        ) : (
          schedules.map((schedule) => (
            <Draggable>
            <div
              key={schedule.id}
              className="otrsked flex bg-opacity-15 backdrop-blur-2xl justify-between hover:translate-y-1 hover:shadow-md cursor-grab items-center bg-palet3 dark:bg-gray-700 max-w-full py-5 px-5 transition-all rounded-full dark:text-white"
            >
              <div className="oterrleftitemsch flex pr-5 items-center gap-2">
                <div className="ikonsked w-11 h-11 p-1 m-0 border border-white text-center rounded-full grid place-items-center bg-palet1 dark:bg-gray-500">
                  <span className="uppercase">
                    {schedule?.agenda_name
                      ?.split(" ")
                      ?.map((word) => word.charAt(0))
                      ?.join("")
                      ?.substring(0, 3) +
                      (schedule?.agenda_name
                        ?.split(" ")
                        ?.map((word) => word.charAt(0))
                        .join("").length > 3
                        ? "..."
                        : "") || ""}
                  </span>
                </div>
                <div className="flex flex-col gap-1 min-w-32">
                  {/* <p className="capitalize font-semibold text-nowrap">
                    {schedule.agenda_name.length > 20 ? `${schedule.agenda_name.substring(0, 20)}...` : schedule.agenda_name}
                  </p> */}
                  <p className="capitalize font-semibold text-nowrap">
                    {schedule.agenda_name && schedule.agenda_name.length > 20
                      ? `${schedule.agenda_name.substring(0, 20)}...`
                      : schedule.agenda_name || "No Agenda Name"}
                  </p>
                  <div className="xmcncjw flex items-center gap-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.991 0C4.023 0 0 4.032 0 9C0 13.968 4.023 18 8.991 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 8.991 0ZM9 16.2C5.022 16.2 1.8 12.978 1.8 9C1.8 5.022 5.022 1.8 9 1.8C12.978 1.8 16.2 5.022 16.2 9C16.2 12.978 12.978 16.2 9 16.2Z"
                        fill="#525761"
                      />
                      <path
                        d="M9.4501 4.5H8.1001V9.9L12.8251 12.735L13.5001 11.628L9.4501 9.225V4.5Z"
                        fill="#525761"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">
                      {new Date(schedule.start_time).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}{" "}
                      -{" "}
                      {new Date(schedule.end_time).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ikonreg flex flex-col items-center text-sm gap-1">
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
                  className="flex-shrink-0 w-5 h-5 text-palettxt transition duration-75 dark:text-white group-hover:text-palet3 dark:group-hover:text-white"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-xs text-gray-700 min-w-11">
                  {new Date(schedule.end_time).toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            </Draggable>
          ))
          
        )}
        
      </div>

      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
        {/* Schedule List */}
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                No
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Agenda Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                Time
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
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-16 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                      <div className="h-2 w-7 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              schedules.map((schedule, index) => (
                <tr
                  key={schedule.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                  <td className="px-4 py-3 w-11 text-sm text-gray-700 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 w-52 text-sm text-gray-700 dark:text-white capitalize">
                    {schedule.agenda_name}
                  </td>
                  <td className="px-4 py-3 max-w-fit text-sm text-gray-700 dark:text-white">
                    {new Date(schedule.start_time).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}{" "}
                    -{" "}
                    {new Date(schedule.end_time).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 ml-4"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-blur-sm transition-all">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <div className="flex space-x-2 absolute top-4 right-4">
              {/* Red circle */}
              <span
                className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                onClick={() => setShowModal(false)}
              />
              {/* Yellow circle */}
              <span
                className="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 transition"
                onClick={() => setShowModal(false)}
              />
              {/* Green circle */}
              <span
                className="w-4 h-4 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                onClick={() => setShowModal(false)}
              />
            </div>

            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              {editMode ? "Detail Schedule" : "New Schedule"}
            </h3>

            {/* Form content */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Agenda Name
            </label>
            <input
              type="text"
              name="agenda_name"
              required
              value={formData.agenda_name}
              onChange={handleInputChange}
              placeholder="Meeting with Team"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="flex w-full gap-1">
              <div className="plexlabsdfls w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  required
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              {/* <td className="p-4">{new Date(formData.start_time).toLocaleDateString()}</td> */}
              <div className="plexlabsdfls w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  required
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Klien
            </label>
            <Select
              options={clients} // Use clients instead of users
              className="mb-2"
              placeholder="Select a client"
              value={clients.filter(
                (client) => client?.value === formData.with_klien
              )}
              onChange={(selectedOption) => {
                const selectedClient = selectedOption
                  ? parseInt(selectedOption.value, 10)
                  : null; // Convert to integer
                setFormData({ ...formData, with_klien: selectedClient });
              }}
            /> */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Participants
            </label>
            <Select
              isMulti
              options={users}
              className="mb-2"
              placeholder="Select participants"
              value={users.filter((user) =>
                formData.participants.includes(user?.value)
              )}
              onChange={(selectedOptions) => {
                const selectedUsers = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []; // Pastikan ini mengirimkan array
                console.log("Peserta yang dipilih:", selectedUsers); // Log untuk debug
                setFormData({ ...formData, participants: selectedUsers });
              }}
            />

            <button
              onClick={editMode ? handleUpdate : handleCreate}
              type="submit"
              className="w-full bg-gradient-to-r from-palet1 to-blue-400 text-white px-4 py-2 rounded-full shadow-lg hover:translate-y-1 transition-transform duration-200"
            >
              {editMode ? "Perbarui" : "Tambahkan"}
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Schedule;
