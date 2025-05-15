import axios from "axios";
import { getTokenFromCookie } from "../../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../../auth/api";

// Fungsi untuk mengambil profile photo pengguna saat ini
export const fetchProfilePhoto = async () => {
  try {
    // Ambil token dari cookie
    const token = getTokenFromCookie();

    if (!token) {
      throw new Error("Token is missing. Please login.");
    }

    // Panggil API untuk mengambil data profile_photo
    const response = await axios.get(`${API_URL}${ENDPOINTS.SELFPP}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set header authorization
      },
    });

    // Cek apakah respons berhasil
    if (response.status === 404) {
      return "https://dummyimage.com/150"; // Kembalikan image dummy jika 404
    } else if (response.data.status === "success") {
      const profilePhoto = response.data.data.profile_photo;
      console.log(response.data.data);
      return profilePhoto; // Kembalikan profile_photo
    } else {
      throw new Error("Failed to fetch profile photo");
    }
  } catch (error) {
    console.error("Error fetching profile photo:", error);
     // Jika gagal, kembalikan null
  }
};
