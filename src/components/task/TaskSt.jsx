import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../auth/api";
import { getTokenFromCookie } from "../../auth/localdt";
import toast, { Toaster } from "react-hot-toast";
import { timeSince } from "../../utils/timeUtils";
import "../style/tooltip.css";
// import { API_URL, ENDPOINTS } from '../../../auth/api';
import "../style/remove.css";
// import Spinner from "../../fragment/Spinner";
import Spinner from "../fragment/Spinner";
import { FormatRupiah } from "@arismun/format-rupiah";
// import { formatRupiah } from '@arismun/format-rupiah';
import Select from "react-select";
import OrdrST from "../dash/order/OrdrS";
import Draggable from "react-draggable";

const TaskST = () => {
  const [assignments, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [users, setUsers] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    doc_opt: "",
    for: [],
    deadline: "",
    status: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.ALLUS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userOptions = response.data.users.map((users) => ({
        value: users.id,
        label: users.name,
      }));
      setUsers(userOptions);
      console.table(response);
    } catch (error) {
      toast.error("Error fetching users:", error);
      console.error("Error fetching users:", error);
    }
  };

  const token = getTokenFromCookie();
  useEffect(() => {
    fetchAssign();
    fetchUsers();
  }, []);

  const fetchAssign = async () => {
    try {
      const resid = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const aydi = resid.data.id;
      const response = await axios.get(
        `${API_URL}${ENDPOINTS.ASGE.replace("{id}", aydi)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const assignments = response.data.data.map((assignment) => ({
        ...assignment,
        for: Array.isArray(assignment.for)
          ? assignment.for
          : [assignment.for].filter(Boolean),
      }));
      //   setServices(response.data.assignments);
      //   setLoading(false);
        console.table(response.data.assignments);
      setServices(assignments);
      setLoading(false);
      console.table(assignments);
    } catch (error) {
      toast.error("Error fetching task:", error);
      console.error("Error fetching task:", error);
    }
  };

  const updateTask = async () => {
    try {
      await axios.put(
        `${API_URL}${ENDPOINTS.ASDETST.replace("{id}", editingTask.id)}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAssign();
      setShowModal(false);
      setEditingTask(null);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task:", error);
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const totalAssignments = assignments.length;
  const doneAssignments = assignments.filter(
    (assignment) => assignment.status === "Done"
  ).length;
  const donePercentage =
    totalAssignments > 0 ? (doneAssignments / totalAssignments) * 100 : 0;

    
  
  return (
    <div className="container mx-auto p-4">
      <div className="firsttaskheadingprogres flex-col flex w-1/4 max-md:w-1/3">
        <h1 className="text-3xl font-bold capitalize dark:text-white">
          Assignment
        </h1>

        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-green-700 dark:text-white">
            Done
          </span>
          <span className="text-sm font-medium text-green-700 dark:text-white">
            {doneAssignments} of {totalAssignments} ({donePercentage.toFixed(0)}
            %)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${donePercentage}%` }} // Sesuaikan lebar berdasarkan persentase
          ></div>
        </div>
      </div>
      <div className="mb-3 overflow-x-auto grid-cols-3 max-md:grid-cols-2 grid rounded-lg py-5 max-md:w-full min-h-96">
        {loading ? (
          <p>Loading...</p>
        ) : (
          assignments.map((assignment) => (
            <Draggable>
            <div
              key={assignment.id}
              className={`lsfs bg-white dark:bg-gray-700 w-56 h-max max-md:w-40 pt-5 pb-3 flex flex-col rounded-lg dark:text-white border-2 border-opacity-35 hover:shadow-md hover:cursor-grab ${
                assignment.status === "Done"
                  ? "border-green-500"
                  : assignment.status === "Pending"
                  ? "border-yellow-500"
                  : assignment.status === "Todo"
                  ? "border-yellow-500"
                  : assignment.status === "On Hold"
                  ? "border-yellow-500"
                  : assignment.status === "In Progress"
                  ? "border-blue-500"
                  : "border-red-500"
              }`}
              
            >
              <div className="firsttaskxfsxf flex justify-between items-center px-3">
                <h3 className="capitalize text-xl font-semibold group cursor-default">
                  {assignment.title.length > 10
                    ? `${assignment.title.substring(0, 10)}...`
                    : assignment.title}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-600 dark:bg-gray-500 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>{assignment.title}</span>
                  </div>
                </h3>
                <div className="relative group">
                  <svg
                    width="3"
                    height="12"
                    viewBox="0 0 3 12"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-palettxt transition duration-75 dark:text-white"
                  >
                    <path
                      d="M1.26799 2.89216C1.96538 2.89216 2.53597 2.24142 2.53597 1.44608C2.53597 0.650735 1.96538 0 1.26799 0C0.570593 0 0 0.650735 0 1.44608C0 2.24142 0.570593 2.89216 1.26799 2.89216ZM1.26799 4.33824C0.570593 4.33824 0 4.98897 0 5.78431C0 6.57966 0.570593 7.23039 1.26799 7.23039C1.96538 7.23039 2.53597 6.57966 2.53597 5.78431C2.53597 4.98897 1.96538 4.33824 1.26799 4.33824ZM1.26799 8.67647C0.570593 8.67647 0 9.32721 0 10.1225C0 10.9179 0.570593 11.5686 1.26799 11.5686C1.96538 11.5686 2.53597 10.9179 2.53597 10.1225C2.53597 9.32721 1.96538 8.67647 1.26799 8.67647Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute cursor-default flex flex-nowrap whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => deleteService(assignment.id)}
                    >
                      <svg viewBox="0 0 448 512" class="svgIcon">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                      </svg>
                      <span>Remove Task</span>
                    </button>
                  </div>
                </div>
              </div>
              <h4 className="px-3 my-3 text-xs text-gray-700 capitalize dark:text-white w-40 text-balance">
                {assignment.desc}
              </h4>
              <hr className="dark:border-gray-400" />
              <div className="lastlinetask flex px-3 justify-between pt-2 items-center">
                <button
                  className="px-1 py-2 hover:text-palettxt text-sm"
                  onClick={() => handleEditClick(assignment)}
                >
                  Edit
                </button>
                <div className="pptaskfskdf rounded-full text-xs">
                  {Array.isArray(assignment.for) &&
                  assignment.for.length === 1 &&
                  assignment.for[0].replace(/[\[\]\\"]/g, "") === "everyone"
                    ? "All"
                    : assignment.for
                        .map((item) => item.replace(/[\[\]\\"]/g, ""))
                        .join(", ")}
                </div>
              </div>
            </div>
            </Draggable>
          ))
        )}
      </div>
      <div className="bg-white overflow-x-auto dark:bg-slate-600 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">
      <div className="eyoo flex justify-between items-center my-3">
        <h1 className="text-3xl font-bold capitalize dark:text-white">Assignment</h1>
        {/* <button
          className="bg-gradient-to-r from-palet3 to-palet2 text-white px-4 py-2 rounded-xl hover:translate-y-1 transition-all"
          onClick={() => setShowModal(true)}
        >
          New Task
        </button> */}
      </div>
      <table className="w-full table-auto dark:text-white rounded-sm capitalize border-collapse border border-gray-200">
        <thead>
        <tr className="bg-gray-100 dark:bg-gray-500 text-left">
        <th className="py-2 px-3">No</th>
              <th className="py-2 px-4">judul</th>
              <th className="py-2 px-4">desc</th>
              {/* <th className="py-2">doc</th> */}
              <th className="py-2 px-4">deadline</th>
              {/* <th className="py-2">creator</th> */}
              <th className="py-2 px-4">for</th>
              <th className="py-2 px-4">status</th>
              {/* <th className="py-2">modify</th> */}
              <th className="py-2 px-4">action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={7} className="px-1 py-4 text-center">
                <Spinner />
              </td>
            </tr>
          ) : (
            Array.isArray(assignments) &&
            assignments.map((assignment, index) => (
              <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-gray-400 transition duration-200">
                <td className="px-3 py-2 text-sm">{index + 1}</td>
                <td className="px-4 py-2 text-sm">{assignment.title}</td>
                <td className="px-4 py-2 text-sm">{assignment.desc}</td>
                {/* <td className="border px-4 py-2">
                  {assignment.doc_opt ? assignment.doc_opt : <p>??</p>}
                </td> */}
                <td className="px-4 py-2 text-sm">
                  {new Date(assignment.deadline).toLocaleDateString()}
                </td>
                {/* <td className="border px-4 py-2">{assignment.created_by}</td> */}
                <td className="px-4 py-2 text-xs">
                  {Array.isArray(assignment.for) &&
                  assignment.for.length === 1 &&
                  assignment.for[0].replace(/[\[\]\\"]/g, "") === "everyone"
                    ? "All"
                    : assignment.for
                        .map((item) => item.replace(/[\[\]\\"]/g, ""))
                        .join(", ")}
                  </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`inline-block w-2 h-2 rounded mr-2 ${
                      assignment.status === "In Progress"
                        ? "bg-palet1 text-palettxt"
                        : assignment.status === "Todo" || assignment.status === "On Hold"
                        ? "bg-yellow-500"
                        : assignment.status === "Done"
                        ? "bg-green-500"
                        : "bg-gray-500" // Warna default jika status tidak dikenali
                    }`}
                  ></span>
                  <p 
                    className={`inline-block ${
                      assignment.status === "In Progress"
                        ? " text-blue-900"
                        : assignment.status === "Todo" || assignment.status === "On Hold"
                        ? " text-yellow-900"
                        : assignment.status === "Done"
                        ? " text-green-900"
                        : "text-gray-500" // Warna default jika status tidak dikenali
                    }`}
                  >{assignment.status}</p>
                </td>
                {/* <td className="border px-4 py-2 cursor-not-allowed">
                  {assignment.updated_at
                    ? timeSince(new Date(assignment.updated_at))
                    : "Unknown"}
                </td> */}
                <td className="px-5 py-2 flex flex-col w-32 gap-1 items-center text-xs">
                <button
                      className="px-1 py-2 hover:text-palet3 text-sm"
                      onClick={() => handleEditClick(assignment)}
                    >
                      Detail
                    </button>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
          <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 backdrop-blur-sm transition-all">
            <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative w-full max-w-md">
              <div className="flex space-x-2 absolute top-4 right-4">
                <span
                  className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition"
                  onClick={() => setShowModal(false)}
                />
                <span
                  className="w-4 h-4 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-500 transition"
                  onClick={() => setShowModal(false)}
                />
                <span
                  className="w-4 h-4 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-left">
                {editingTask ? "Detail Task" : "New Task"}
              </h2>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                placeholder="title"
                readOnly
                className="border p-2 mb-2 w-full capitalize cursor-not-allowed"
                value={editingTask ? editingTask.title : newTask.title}
                
              />
              <label className="block mb-1 capitalize text-sm">
                Link File/Doc
              </label>
              <input
                type="text"
                placeholder="link file/doc"
                className="border p-2 mb-2 w-full"
                value={editingTask ? editingTask.doc_opt : newTask.doc_opt}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({
                        ...editingTask,
                        doc_opt: e.target.value,
                      })
                    : setNewTask({ ...newTask, doc_opt: e.target.value })
                }
              />
              <label className="block mb-1 capitalize text-sm">
                Description
              </label>
              <textarea
                placeholder="desc"
                className="border p-2 mb-2 w-full"
                value={editingTask ? editingTask.desc : newTask.desc}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, desc: e.target.value })
                    : setNewTask({ ...newTask, desc: e.target.value })
                }
              />
              <label className="block mb-1 capitalize text-sm">
                Select participants
              </label>
              <Select
                isMulti
                options={users}
                className="mb-2 cursor-not-allowed"
                placeholder="Select users"
                value={
                  editingTask
                    ? users.filter((user) =>
                        editingTask.for.includes(user.value)
                      )
                    : users.filter((user) => newTask.for.includes(user.value))
                }
                
              />
              <div className="mb-4 flex justify-center gap-2 items-center">
                {/* <label className="block mb-1">Deadline</label> */}
                <input
                  type="date"
                  placeholder="deadline"
                  readOnly
                  className="border p-2 mb-2 w-1/2"
                  value={editingTask ? editingTask.deadline : newTask.deadline}
                  onChange={(e) =>
                    editingTask
                      ? setEditingTask({
                          ...editingTask,
                          deadline: e.target.value,
                        })
                      : setNewTask({ ...newTask, deadline: e.target.value })
                  }
                />
                {/* <label className="block mb-1">Status</label> */}
                <Select
                  className="w-1/2"
                  options={[
                    { value: "Todo", label: "Todo" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Done", label: "Done" },
                    { value: "Pending", label: "Pending" },
                    { value: "On Hold", label: "On Hold" },
                    { value: "Cancelled", label: "Cancelled" },
                    { value: "Review", label: "Review" },
                    { value: "Blocked", label: "Blocked" },
                    { value: "Deffered", label: "Deffered" },
                    { value: "Priority", label: "Priority" },
                    { value: "Critical", label: "Critical" },
                  ]}
                  placeholder="Select status"
                  value={
                    editingTask
                      ? { value: editingTask.status, label: editingTask.status }
                      : { value: newTask.status, label: newTask.status }
                  }
                  onChange={(selectedOption) => {
                    if (editingTask) {
                      setEditingTask({
                        ...editingTask,
                        status: selectedOption.value,
                      });
                    } else {
                      setNewTask({ ...newTask, status: selectedOption.value });
                    }
                  }}
                />
              </div>
              <div className="flex justify-center gap-2 mt-5">
                <button
                  className="bg-gradient-to-r from-palet3 to-palet2 w-full text-white px-5 py-2 rounded-lg shadow-md hover:bg-palet3 hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                  onClick={editingTask ? updateTask : createTask}
                >
                  {editingTask ? "Update" : "Simpan"}
                </button>
                {/* <button
                className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                onClick={() => {
                  setShowModal(false);
                  setEditingTask(null);
                }}
              >
                Cancel
              </button> */}
              </div>
            </div>
          </div>
        )}
      <Toaster />
    </div>
    <OrdrST />
    </div>
  );
};

export default TaskST;
