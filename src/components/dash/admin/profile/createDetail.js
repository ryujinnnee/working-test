import axios from "axios";
import { getTokenFromCookie } from "../../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../../auth/api";
import toast, { Toaster } from "react-hot-toast";
// Fungsi untuk membuat detail (diluar komponen React)
export const createDetail = async (detailData) => {
    const token = getTokenFromCookie(); 
  
    if (!token) {
      throw new Error("User not authenticated"); 
    }
  
    try {
      const formData = new FormData();
      formData.append("gender", detailData.gender);
      formData.append("dob", detailData.dob);
      formData.append("address", detailData.address);
      formData.append("phone_number", detailData.phone_number); // Sesuaikan field yang benar
      formData.append("hobby", detailData.hobby);
      formData.append("sosmed_link", detailData.sosmed_link);
      formData.append("university", detailData.university);
      formData.append("identity_number", detailData.identity_number);
      formData.append("profile_photo", detailData.profile_photo);
      formData.append("cover_photo", detailData.cover_photo);
  
      const userResponse = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = userResponse.data.id;
  
      const response = await axios.post(
        `${API_URL}${ENDPOINTS.CRETDTL.replace("{id}", userId)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Izin created successfully😎");
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      toast.error("Hemmm Error😡:v", error.response);
      console.error("Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  