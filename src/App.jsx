// Import react router dom
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  useNavigate,
} from "react-router-dom";

// Import view homepage
// import Home from "../home.jsx";
import Login from "./auth/login.jsx";
// import React from "react";
// Import view posts index
import PostIndex from "./view/index.jsx";
import Profile from "./pages/profile.jsx";
import { AuthProvider } from "./auth/AuthContex.jsx";
import Register from "./auth/register.jsx";
import ProfileUpd from "./pages/UpdateProf.jsx";
import Dashboard from "./components/dash/dashboard.jsx";
// import Dashboard2 from "./components/dash/fragment/dashboard2.jsx"; // Assuming this component exists
// import Guest from "./components/dash/Guest.jsx"; // Assuming this component exists
import { Toaster } from "react-hot-toast";
import withSplashScreen from "./components/splash/SplashScreen.jsx";
import React, { useState, useEffect } from "react";
// import Dashboard from "./components/dashboard.jsx";
import axios from "axios";
import { API_URL, ENDPOINTS } from "./auth/api.js";
import { getTokenFromCookie } from "./auth/localdt.js";
import Dash2 from "./components/dash/dash2.jsx";
import Suhu from "./components/dash/weather/suhu.jsx";
import Pipel from "./components/userss/Pipel.jsx";
import Role from "./components/dash/more/Role.jsx";
import Bann from "./components/dash/bann.jsx";
import DashAll from "./components/dash/admin/DashAll.jsx";
import Serv from "./components/serv/admin/Serv.jsx";
import Tools from "./components/dash/admin/work/Tools.jsx";
import Attend from "./components/presensi/attend.jsx";
import Permit from "./components/iz/Permit.jsx";
import TaskM from "./components/task/TaskM.jsx";
import Sd from "./components/dash/admin/schedule/Sd.jsx";
import Bank from "./components/dash/admin/bank/Bank.jsx";
import Pay from "./components/dash/admin/payment/Pay.jsx";
import Trolly from "./components/dash/order/Trolly.jsx";
import AllDetl from "./components/dash/admin/profile/AllDetl.jsx";
import Ordr from "./components/dash/order/Ordr.jsx";
import Inp from "./components/dash/admin/Inpo.jsx";
import Rei from "./components/iz/Reim.jsx";
import DashSt from "./components/dash/DashSt.jsx";
import Attenable2 from "./components/presensi/Attenable2.jsx";
import IzinStaf from "./components/iz/izinstaf.jsx";
import SchedlStf from "./components/dash/admin/schedule/SchedlStf.jsx";
import ReimStaf from "./components/iz/ReimStaf.jsx";
import BAS from "./components/dash/admin/bank/BAS.jsx";
import TaskST from "./components/task/TaskSt.jsx";
import OrdrST from "./components/dash/order/OrdrS.jsx";
import Guest2 from "./components/dash/Guest2.jsx";
import ForgotPassword from "./auth/ForgorPW.jsx";
import ResetPassword from "./auth/ResetPW.jsx";
import ProfileUser from "./pages/profile/ProfileUser.jsx";
import UserAlls from "./auth/UserAlls.jsx";
// import DB from "./components/dash/db/DB.jsx";
import Db from "./components/dash/db/Db.jsx";
import Santri from "./components/dash/santri/Santri.jsx";
import Paket from "./components/dash/paket/Paket.jsx";
import More from "./components/dash/More.jsx";
import Report from "./components/dash/more/Report.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Route "/" */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<DashAll />} />
          <Route path="home" element={<DashSt />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<Attend />} />
          <Route path="presensi" element={<Attenable2 />} />
          <Route path="permit" element={<Permit />} />
          <Route path="izin-n-cuti" element={<IzinStaf />} />
          <Route path="weather" element={<Suhu />} />
          <Route path="people" element={<Pipel />} />
          <Route path="manage" element={<More />} />
          <Route path="profile-all" element={<ProfileUser />} />
          <Route path="ai" element={<Tools />} />
          <Route path="services" element={<Serv />} />
          <Route path="task" element={<TaskM />} />
          <Route path="tasks" element={<TaskST />} />
          <Route path="update-profile" element={<ProfileUpd />} />
          <Route path="posts" element={<PostIndex />} />
          <Route path="bank-account" element={<Bank />} />
          {/* <Route path="bank-accounts" element={<BAS />} /> */}
          <Route path="broadcast" element={<Inp />} />

          <Route path="member-detail" element={<AllDetl />} />
          <Route path="member-all" element={<UserAlls />} />
          <Route path="order" element={<Ordr />} />
          <Route path="orders" element={<OrdrST />} />
          <Route path="backup" element={<Db /> } />
          <Route path="santri-all" element={<Santri /> } />
          <Route path="paket" element={<Paket /> } />
          <Route path="reports" element={<Report /> } />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
    
  );
}

const MainLayout = () => {
  const navigate = useNavigate();
  const token = getTokenFromCookie();
  
  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    // const fetchUserStatus = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}${ENDPOINTS.ME}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // setUserStatus(response.data.status);
    //     setUserRole(response.data.id_role);
    //     const userData = response.data;
    //     localStorage.setItem("dtUser", JSON.stringify(userData));
    //     console.table(response.data.id_role);
    //   } catch (error) {
    //     console.error("Failed to fetch user status", error);
    //   }
    // };
    if (!token) {
      navigate("/");
    }
    // if (token) {
    //   fetchUserStatus();
    // } else {
    //   navigate("/");
    // }
  }, [token]);

  if (!token) {
    return <Guest2 />;
  }  else {
    return <Dashboard />;
  }
  // if (!token) {
  //   return <Guest2 />;
  // } else if (userRole == 1) {
  //   return <Dashboard />;
  // } else {
  //   return <DashSt />;
  // }
};

export default withSplashScreen(App);
