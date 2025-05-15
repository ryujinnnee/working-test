import axios from "axios";
import { API_URL, ENDPOINTS } from "../auth/api";
import { getTokenFromCookie, removeToken } from "../auth/localdt";
import toast from "react-hot-toast";

export const handleLogout = async () => {
  const keysToRemove = ["rekCache", "payCache", "rolesCache", "rekProf", "orderCache"];

  try {
    const token = getTokenFromCookie();
    await axios.post(
      `${API_URL}${ENDPOINTS.LOGOUT}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    removeToken();
    localStorage.clear();
    toast.error("Sesi Berakhir!");
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    window.location.reload();
    // localStorage.removeItem("rekCache");

    // navigate("/login");
  } catch (error) {
    removeToken();
    toast.error("Logout failed: " + error);
  }
};
