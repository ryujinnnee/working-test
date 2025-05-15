
  
import { getTokenFromCookie } from "../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import axios from "axios";

export const fetchAllOrderSt = async () => {
    const cachedOrders = localStorage.getItem("orderCache");

    if (cachedOrders) {
        const { data, timestamp } = JSON.parse(cachedOrders);

        const cacheDuration = 5 * 60 * 1000; // Cache duration of 5 minutes
        const now = new Date().getTime();

        if (now - timestamp < cacheDuration) {
            console.log("Returning cached orders:", data);
            return data; // Return cached data if it's still valid
        }
    }

    const token = getTokenFromCookie();

    if (!token) {
        throw new Error("User not authenticated");
    }

    const resid = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const aydi = resid.data.id;
      
      try {
        const response = await axios.post(
          `${API_URL}${ENDPOINTS.ORDALLST.replace("{id}", aydi)}`,
          {}, // You might need to add data for the post request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        const ordersData = response.data;
        console.log("datanya: ", ordersData);
        console.table("datanya: ", ordersData);
        localStorage.setItem(
          "orderCache",
          JSON.stringify({ data: ordersData, timestamp: new Date().getTime() })
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle the error here, potentially showing a message to the user or redirecting to login
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access to order data");
          // Handle unauthorized access specifically (e.g., redirect to login)
        }
      }
};
