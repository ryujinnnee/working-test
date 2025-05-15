// import React from 'react'
import { getTokenFromCookie } from "../../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import axios from "axios";
// export const fetchAllDetail = async () => {
//     const token = getTokenFromCookie(); 
  
//     if (!token) {
//       throw new Error("User not authenticated"); 
//     }
  
//     try {
//       const response = await axios.get(`${API_URL}${ENDPOINTS.USERDTLALL}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.table(response.data.users.staffDetails);
//       return response.data.users.staffDetails; 
//     } catch (error) {
//       console.error("Error fetching staff detail:", error);
//       throw error; 
//     }
//   };

export const fetchAllDetail = async () => {
  const token = getTokenFromCookie(); 

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await axios.get(`${API_URL}${ENDPOINTS.USERDTLALL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // console.log("Full Response:", response.data);
    console.log("Staff Details:", response.data.users.staffDetails);
    // console.log("User Details:", response.data.users.userDetails);
    // console.table(response.data.users.userDetails);
    return response.data.users.staffDetails; // Kembalikan `users` yang memiliki `staffDetails` dan `userDetails`
  } catch (error) {
    console.error("Error fetching staff detail:", error);
    throw error; 
  }
};
