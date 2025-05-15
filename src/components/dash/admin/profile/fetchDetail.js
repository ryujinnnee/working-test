// import React from 'react'
import { getTokenFromCookie } from "../../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import axios from "axios";
export const fetchDetail = async () => {
    const token = getTokenFromCookie(); // Ambil token dari cookie
  
    if (!token) {
      throw new Error("User not authenticated"); // Menangani kasus jika pengguna tidak terautentikasi
    }
  
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.PIPELDTL}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      });
      // console.table(response.data);
      return response.data; // Mengembalikan data yang diambil
    } catch (error) {
      console.error("Error fetching staff detail:", error);
      throw error; // Melempar error agar bisa ditangani di tempat lain
    }
  };