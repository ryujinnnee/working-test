// import { getTokenFromCookie } from "../../../auth/localdt";
// import { API_URL, ENDPOINTS } from "../../../auth/api";
// import axios from "axios";

// export const fetchAllOrder = async () => {
//     const token = getTokenFromCookie(); 
  
//     if (!token) {
//       throw new Error("User not authenticated");
//     }
  
//     try {
//       const response = await axios.get(`${API_URL}${ENDPOINTS.ORDALL}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
      
//       console.log("Order All:", response.data);
//       console.table(response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching order:", error);
//       throw error; 
//     }
//   };
  
import { getTokenFromCookie } from "../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import axios from "axios";

export const fetchAllOrder = async () => {
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

    try {
        const response = await axios.get(`${API_URL}${ENDPOINTS.ORDALL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const ordersData = response.data;

        // Cache the fetched data with a timestamp
        localStorage.setItem(
            "orderCache",
            JSON.stringify({ data: ordersData, timestamp: new Date().getTime() })
        );

        console.log("Fetched and cached orders:", ordersData);
        return ordersData;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};
