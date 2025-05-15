import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllOrder } from "./fetchOrder";
import { fetchAllOrderDetail } from "./fetchOrderDetail";
import Select from "react-select";
import { getTokenFromCookie } from "../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import axios from "axios";

const Ordr = () => {
  const [orderAll, setOrderAll] = useState([]);
  const [orderAllDet, setOrderAllDet] = useState([]);
  // const [orderAllDet, setOrderAllDet] = useState({
  //   id: "",
  //   user_id: "",
  //   service_id: [],
  //   quantity: [],
  //   desc: "",
  //   subtotal: "",
  //   status: "",
  //   created_at: "",
  //   updated_at: "",
  // });

  const [activeTab, setActiveTab] = useState("order");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    handle_by: [],
    status: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getOrderAll = async () => {
      try {
        const data = await fetchAllOrder();
        const dataDetail = await fetchAllOrderDetail();
        console.log("Order Data Detail:", dataDetail);
        setOrderAll(data);
        setOrderAllDet(dataDetail);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching details");
      }
    };
    getOrderAll();
    fetchUsers();
  }, []);

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
      const userOptions = response.data.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      setUsers(userOptions);
    } catch (error) {
      toast.error("Error fetching users:", error);
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdate = async () => {
    if (!currentOrder) return;

    try {
      const token = getTokenFromCookie();

      // Ambil nilai handle_by dan pastikan itu adalah array
      const updatedParticipants = Array.isArray(formData.handle_by)
        ? formData.handle_by
        : formData.handle_by
        ? JSON.parse(formData.handle_by)
        : []; // Parsing jika itu adalah string

      const updatedData = {
        status: formData.status || currentOrder.status,
        handle_by: updatedParticipants,
      };

      console.log("Data yang akan diupdate:", updatedData); // Log untuk debug

      await axios.post(
        `${API_URL}${ENDPOINTS.ORDRH.replace("{id}", currentOrder.id)}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("orderCache");
      toast.success("Update Successful");
      const newOrderData = await fetchAllOrder();
      const newOrderDetailData = await fetchAllOrderDetail();

      setOrderAll(newOrderData);
      setOrderAllDet(newOrderDetailData);

      // fetchAllOrder();
      // fetchAllOrderDetail();
      setShowModal(false);
      setEditMode(false);
      // resetForm();
    } catch (error) {
      toast.error("Error updating orderss:", error);
      console.error("Error updating orderss:", error);
    }
  };

  const handleEdit = (orderss) => {
    // Parse handle_by if it's a string
    const handleBy =
      typeof orderss.handle_by === "string"
        ? JSON.parse(orderss.handle_by)
        : orderss.handle_by || [];

    setFormData({
      id: orderss.id,
      handle_by: handleBy,
      status: orderss.status,
    });
    setCurrentOrder(orderss);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="py-8" style={{ height: "80dvh" }}>
      <h1 className="dark:text-white text-3xl font-semibold mb-6">
        Order Management
      </h1>
      <div className="bg-white overflow-x-auto mt-1 dark:bg-slate-600 flex flex-col gap-3 dark:border-gray-400 border-2 rounded-lg px-5 pb-9 shadow-sm max-md:w-full">
        <div className="relative mt-3" style={{ width: "20%" }}>
          <div className="tabs flex">
            <button
              onClick={() => setActiveTab("order")}
              className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
                activeTab === "order"
                  ? "text-gray-900 dark:text-white font-medium text-xl"
                  : "text-gray-500 dark:text-white font-medium text-xl"
              }`}
            >
              Order
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`tab flex-1 py-2 text-center rounded-md transition duration-300 ease-in-out ${
                activeTab === "details"
                  ? "text-gray-900 dark:text-white font-medium text-xl"
                  : "text-gray-500 dark:text-white font-medium text-xl"
              }`}
            >
              Detail
            </button>
          </div>
          <div
            className={`absolute bottom-0 h-1 w-1/2 bg-blue-200 transition-all duration-300 ease-in-out ${
              activeTab === "order" ? "left-0" : "left-1/2"
            }`}
          />
        </div>
        {activeTab === "order" && (
          <div className="dark:bg-gray-800 rounded-md">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-500">
                <tr className="text-left text-sm font-medium text-gray-600 dark:text-white border-b capitalize">
                  {/* <th className="p-4">ID</th> */}
                  <th className="p-4">klien id</th>
                  <th className="p-4">pemesanan id</th>
                  <th className="p-4">handle by</th>
                  <th className="p-4">status</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">desc</th>
                  <th className="p-4">action</th>
                </tr>
              </thead>
              <tbody className="dark:text-gray-200">
                {orderAll.length > 0 ? (
                  orderAll.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition duration-200 text-left text-sm font-medium text-gray-600 dark:text-white"
                    >
                      {/* <td className="p-4">{order.id}</td> */}
                      <td className="p-4">{order.user_id}</td>
                      <td className="p-4 capitalize">{order.pemesanan_id}</td>
                      {/* <td className="p-4">{new Date(order.update_at).toLocaleDateString()}</td> */}
                      <td className="p-4">{order.handle_by}</td>
                      <td className="p-4 capitalize">
                        <span
                          className={`inline-block w-2 h-2 rounded mr-2 ${
                            order.status === "In Progress" ||
                            order.status === "Proses"
                              ? "bg-palet1 text-palettxt"
                              : order.status === "Todo" ||
                                order.status === "On Hold" ||
                                order.status === "Pending"
                              ? "bg-yellow-500"
                              : order.status === "Done"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        <p
                          className={`inline-block ${
                            order.status === "In Progress" ||
                            order.status === "Proses"
                              ? " text-blue-900"
                              : order.status === "Todo" ||
                                order.status === "On Hold" ||
                                order.status === "Pending"
                              ? " text-yellow-900"
                              : order.status === "Done"
                              ? " text-green-900"
                              : "text-gray-500"
                          }`}
                        >
                          {order.status}
                        </p>
                      </td>
                      <td className="p-4">{order.no_conf ?? '..'}</td>
                      <td className="p-4">{order.desc ?? '..'}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleEdit(order)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-400">
                      {error ? "Failed to load data" : "Loading..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "details" && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-500">
                <tr className="text-left text-sm font-medium text-gray-600 dark:text-white capitalize">
                  <th className="py-2 px-3 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Klien</th>
                  <th className="py-2 px-4 border-b">Service ID</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">subtotal</th>
                  <th className="py-2 px-4 border-b">status</th>
                </tr>
              </thead>
              <tbody>
                {orderAllDet.map((orderdet, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 capitalize transition duration-200 text-left text-sm font-medium text-gray-600 dark:text-white"
                  >
                    <td className="py-2 px-3 border-b">{orderdet.id}</td>
                    <td className="py-2 px-4 border-b">{orderdet.user_id}</td>
                    <td className="py-2 px-4 w-52 border-b text-xs">
                      {Array.isArray(orderdet.service_id)
                        ? orderdet.service_id.join(", ")
                        : orderdet.service_id}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {Array.isArray(orderdet.quantity)
                        ? orderdet.quantity.join(", ")
                        : orderdet.quantity}
                    </td>
                    <td className="py-2 px-4 border-b">{orderdet.desc}</td>
                    <td className="py-2 px-4 border-b">{orderdet.subtotal}</td>
                    <td className="py-2 px-4 border-b text-xs">
                      <span
                        className={`inline-block w-2 h-2 rounded mr-2 ${
                          orderdet.status === "In Progress" ||
                          orderdet.status === "Proses"
                            ? "bg-palet1 text-palettxt"
                            : orderdet.status === "Todo" ||
                              orderdet.status === "On Hold" ||
                              orderdet.status === "Pending"
                            ? "bg-yellow-500"
                            : orderdet.status === "Done"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                      <p
                        className={`inline-block ${
                          orderdet.status === "In Progress" ||
                          orderdet.status === "Proses"
                            ? " text-blue-900"
                            : orderdet.status === "Todo" ||
                              orderdet.status === "On Hold" ||
                              orderdet.status === "Pending"
                            ? " text-yellow-900"
                            : orderdet.status === "Done"
                            ? " text-green-900"
                            : "text-gray-500"
                        }`}
                      >
                        {orderdet.status}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                {editMode ? "Detail Order" : "New Schedule"}
              </h3>

              {/* Form content */}
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Status
              </label>
              <Select
                className="w-1/2 capitalize"
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
                  formData.status
                    ? { value: formData.status, label: formData.status }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    status: selectedOption.value,
                  });
                }}
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Handle By
              </label>
              <Select
                isMulti
                options={users}
                className="mb-2"
                placeholder="Select handle_by"
                value={
                  formData.handle_by
                    ? users.filter((user) =>
                        formData.handle_by.includes(user?.value)
                      )
                    : []
                }
                onChange={(selectedOptions) => {
                  const selectedUsers = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : []; // Pastikan ini mengirimkan array
                  console.log("Peserta yang dipilih:", selectedUsers); // Log untuk debug
                  setFormData({ ...formData, handle_by: selectedUsers });
                }}
              />

              <button
                onClick={handleUpdate}
                type="submit"
                className="w-full bg-gradient-to-r from-palet1 to-blue-400 text-white px-4 py-2 rounded-full shadow-lg hover:translate-y-1 transition-transform duration-200"
              >
                {editMode ? "Perbarui" : "Tambahkan"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};
export default Ordr;
