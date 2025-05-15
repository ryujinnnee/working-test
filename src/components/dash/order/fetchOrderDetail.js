
// import { getTokenFromCookie } from "../../../auth/localdt";
// import { API_URL, ENDPOINTS } from "../../../auth/api";
// import axios from "axios";

// export const fetchAllOrderDetail = async () => {
//     const cachedOrders = localStorage.getItem("orderDetailCache");

//     if (cachedOrders) {
//         const { data, timestamp } = JSON.parse(cachedOrders);

//         const cacheDuration = 5 * 60 * 1000; // Cache duration of 5 minutes
//         const now = new Date().getTime();

//         if (now - timestamp < cacheDuration) {
//             console.log("Returning cached orders:", data);
//             return data; // Return cached data if it's still valid
//         }
//     }

//     const token = getTokenFromCookie();

//     if (!token) {
//         throw new Error("User not authenticated");
//     }

//     try {
//         const response = await axios.get(`${API_URL}${ENDPOINTS.ORDDTL}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         const ordersData = response.data.item;
//         console.table(response.data.item)
//         // Cache the fetched data with a timestamp
//         localStorage.setItem(
//             "orderDetailCache",
//             JSON.stringify({ data: ordersData, timestamp: new Date().getTime() })
//         );

//         console.log("Fetched and cached orders det:", ordersData);
//         return ordersData;
//     } catch (error) {
//         console.error("Error fetching order det:", error);
//         throw error;
//     }
// };

// import { getTokenFromCookie } from "../../../auth/localdt";
// import { API_URL, ENDPOINTS } from "../../../auth/api";
// import axios from "axios";

// export const fetchAllOrderDetail = async () => {
//     const cachedOrders = localStorage.getItem("orderDetailCache");

//     if (cachedOrders) {
//         const { data, timestamp } = JSON.parse(cachedOrders);

//         const cacheDuration = 5 * 60 * 1000; // Cache duration of 5 minutes
//         const now = new Date().getTime();

//         if (now - timestamp < cacheDuration) {
//             console.log("Returning cached orders:", data);
//             return data; // Return cached data if it's still valid
//         }
//     }

//     const token = getTokenFromCookie();

//     if (!token) {
//         throw new Error("User not authenticated");
//     }

//     try {
//         const response = await axios.get(`${API_URL}${ENDPOINTS.ORDDTL}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         // Parse quantity field if it is a string
//         const ordersData = response.data.item.map(order => ({
//             ...order,
//             quantity: typeof order.quantity === 'string' ? JSON.parse(order.quantity) : order.quantity
//         }));
        
//         console.table(ordersData);

//         // Cache the fetched data with a timestamp
//         localStorage.setItem(
//             "orderDetailCache",
//             JSON.stringify({ data: ordersData, timestamp: new Date().getTime() })
//         );

//         console.log("Fetched and cached orders det:", ordersData);
//         return ordersData;
//     } catch (error) {
//         console.error("Error fetching order det:", error);
//         throw error;
//     }
// };
import { getTokenFromCookie } from "../../../auth/localdt";
import { API_URL, ENDPOINTS } from "../../../auth/api";
import axios from "axios";

export const fetchAllOrderDetail = async () => {
    const token = getTokenFromCookie();

    if (!token) {
        throw new Error("User not authenticated");
    }

    try {
        const response = await axios.get(`${API_URL}${ENDPOINTS.ORDDTL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Parse quantity field if it is a string
        // const ordersData = response.data.item.map(order => ({
        //     ...order,
        //     quantity: typeof order.quantity === 'array' ? JSON.parse(order.quantity) : order.quantity,
        // }));
        const ordersData = response.data.item.map(order => ({
            ...order,
            service_id: (typeof order.service_id === 'string') ? JSON.parse(order.service_id) : order.service_id,
            quantity: (typeof order.quantity === 'string') ? JSON.parse(order.quantity) : order.quantity,
        }));
        
        

        console.table(ordersData);
        console.log("Fetched orders details:", ordersData);
        return ordersData;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error;
    }
};
