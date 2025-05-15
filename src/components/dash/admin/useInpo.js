import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini
import { API_URL, ENDPOINTS } from '../../../auth/api'; // Perbaiki path
import { getTokenFromCookie } from '../../../auth/localdt'; // Perbaiki path
import toast from 'react-hot-toast'; // Optional untuk notifikasi

export const useInpo = () => {
  const [inpo, setInpo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Tambahkan error state
  const navigate = useNavigate(); // Tambahkan ini

  const fetchInpo = async () => {
    setError(null); // Reset error state
    const cachedRek = localStorage.getItem("inpoCache");
  
    if (cachedRek) {
      try {
        const { data, timestamp } = JSON.parse(cachedRek);
        const cacheDuration = 5 * 60 * 1000; 
        const now = new Date().getTime();
    
        if (now - timestamp < cacheDuration) {
          setInpo(data); 
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error parsing cache:", e);
        localStorage.removeItem("inpoCache"); // Clear invalid cache
      }
    }

    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${API_URL}${ENDPOINTS.INP}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rekData = response.data;
      setInpo(rekData);
      setLoading(false);

      localStorage.setItem(
        "inpoCache",
        JSON.stringify({ data: rekData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error("Error fetching data"); // Optional
      console.error("Error fetching inpo:", error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.INPN}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInpo([...inpo, response.data]);
      localStorage.removeItem("inpoCache");
      localStorage.removeItem("unreadCount");
      fetchInpo();
      toast.success("Broadcast Successful Created");
      return true; // Return true on success
    } catch (error) {
      console.error("Error creating inpo:", error);
      toast.error("Error creating broadcast");
      return false; // Return false on error
    }
  };

  return { inpo, loading, error, fetchInpo, handleCreate };
};