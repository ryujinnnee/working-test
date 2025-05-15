import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import toast, { Toaster } from "react-hot-toast";
import { timeSince } from "../../../utils/timeUtils";
import '../../style/tooltip.css';
// import { API_URL, ENDPOINTS } from '../../../auth/api';
import "../../style/remove.css";
import Spinner from "../../fragment/Spinner";
import { FormatRupiah } from "@arismun/format-rupiah";
// import { formatRupiah } from '@arismun/format-rupiah';
const Serv = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null); // Tambahkan state ini
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const formatRupiah = (harga) => {
    return new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(harga);
  };

  const token = getTokenFromCookie();
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.GTSERVICE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data.services);
      setLoading(false);
      console.table(response.data.services);
    } catch (error) {
      toast.error("Error fetching service:", error);
      console.error("Error fetching services:", error);
    }
  };

  const createService = async () => {
    try {
      await axios.post(`${API_URL}${ENDPOINTS.PSCRETSERV}`, newService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
      setShowModal(false);
      toast.success("Succesfully Created");
    } catch (error) {
      toast.error("Error creating service:", error);
      console.error("Error creating service:", error);
    }
  };

  const updateService = async (id, updatedService) => {
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.PSEDTSERV.replace("{id}", id)}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchServices();
      toast.success("Update Succes");
      console.table(services);
    } catch (error) {
      toast.error("Error updatting service:", error);
      console.error("Error updating service:", error);
    }
  };

  const deleteService = async (id, deletee) => {
    try {
      await axios.post(
        `${API_URL}${ENDPOINTS.DELSERV.replace("{id}", id)}`,
        deletee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchServices();
      toast.success("Data Dihapus");
    } catch (error) {
      toast.error("Error deleting service:", error);
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="container w-full mx-auto p-4">
      <div className="eyoo flex justify-between items-center my-3">
        <div className="sdfsdfmmblh flex gap-1 items-start">
        <h1 className="text-3xl font-bold dark:text-white">Layanan</h1>
        <div className="relative group">
          <span className="text-gray-600 text-xs dark:text-white">Live Edit✔</span>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Update Data Langsung pada tabel
          </div>
        </div>
        </div>
        <button
          className="bg-gradient-to-r from-palet1 to-blue-300 hover:translate-y-1 font-semibold text-white px-4 py-2 rounded-lg transition-all"
          onClick={() => setShowModal(true)}
        >
          New Service
        </button>
      </div>
      <div className="bg-white overflow-x-auto mt-5 dark:bg-slate-600 flex gap-3 dark:border-gray-400 border-2 rounded-lg p-5 shadow-sm max-md:w-full">  
      <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-500">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">No</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">Name</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">Description</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">Price</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">Modified</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">Actions</th>
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
                <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                  <div className="h-2 w-7 bg-gray-300 rounded"></div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-700 animate-pulse">
                  <div className="h-2 w-7 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </>
          ) : (
            services.map((service, index) => (
              <tr key={service.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                  <input
                    className="focus:outline-none dark:bg-gray-700 text-sm text-gray-700 dark:text-white"
                    type="text"
                    value={service.name}
                    onBlur={(e) =>
                      updateService(service.id, {
                        ...service,
                        name: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      const updatedServices = services.map((s) =>
                        s.id === service.id ? { ...s, name: e.target.value } : s
                      );
                      setServices(updatedServices);
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                  <textarea
                    className="resize focus:outline-none px-4 overflow-hidden dark:bg-gray-700 text-sm text-gray-700 dark:text-white"
                    value={service.description}
                    onBlur={(e) =>
                      updateService(service.id, {
                        ...service,
                        description: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      const updatedServices = services.map((s) =>
                        s.id === service.id
                          ? { ...s, description: e.target.value }
                          : s
                      );
                      setServices(updatedServices);
                    }}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white cursor-cell whitespace-nowrap">
                  <span
                    className="tooltip"
                    onClick={() => setEditingService(service)}
                  >
                    {formatRupiah(service.price)}
                    <span className="tooltiptext">Ubah</span>
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white cursor-not-allowed">
                  {service.updated_at
                    ? timeSince(new Date(service.updated_at))
                    : "Unknown"}
                </td>
                <td className="px-8 py-2 text-sm text-gray-700 dark:text-white">
                  {/* <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() =>
                    updateService(service.id, {
                      name: service.name,
                      description: service.description,
                    })
                  }
                >
                  Edit
                </button> */}
                  {/* <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button> */}
                  <button
                    class="buten"
                    onClick={() => deleteService(service.id)}
                  >
                    <svg viewBox="0 0 448 512" class="svgIcon">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
      {editingService && (
        <div className="modal fixed inset-0 z-50 mx-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content p-4 bg-slate-100">
            <span
              className="close cursor-pointer"
              onClick={() => setEditingService(null)}
            >
              &times;
            </span>
            <h2>Edit Price</h2>
            <input
              className="focus:outline-none cursor-cell w-28"
              placeholder={editingService.price}
              type="number"
              // value={editingService.price}
              onChange={(e) => {
                const updatedService = {
                  ...editingService,
                  price: e.target.value,
                };
                setEditingService(updatedService);
              }}
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded mt-2"
              onClick={() => {
                updateService(editingService.id, editingService);
                setEditingService(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70 dark:bg-opacity-25 backdrop-blur-sm transition-all">
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
            <h2 className="text-xl mb-4 font-semibold dark:text-white">New Service</h2>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Jasa SEO"
              className="border p-2 mb-2 w-full focus:ring-palet2 focus:ring-2 focus:outline-none rounded-md dark:bg-gray-700"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <input
              type="text"
              placeholder="desc"
              className="border p-2 mb-2 w-full focus:ring-palet2 focus:ring-2 focus:outline-none rounded-md dark:bg-gray-700"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Harga
            </label>
            <input
              type="number"
              placeholder="500000"
              className="border p-2 mb-2 w-full focus:ring-palet2 focus:ring-2 focus:outline-none rounded-md dark:bg-gray-700"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />
            <button
              className="w-full bg-gradient-to-r mt-3 font-semibold from-blue-400 to-palet1 text-white px-4 py-2 rounded-md shadow-lg hover:translate-y-1 transition-transform duration-200"
              onClick={createService}
            >
              Tambahkan
            </button>
            
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Serv;
