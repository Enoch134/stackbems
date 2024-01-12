import React, {useEffect,useState}from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DashboardDesign from "./DashboardDesign"
import axios from "axios"
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard
} from '@coreui/react'
import SaleChart from "./sales/SaleChart";
import Analysis from "./Analysis";
// import Analysis from "./Analysis";

const Welcome = () => {
 const [user, setUser] = useState(null)

  
   useEffect(() => {
     fetchUserData();
   }, []);
  
     const fetchUserData = async () => {
       try {
         const token = localStorage.getItem("token");
         const response = await fetch(
           "http://localhost:2024/verify-privileges",
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
             }
           }
         );

         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const result = await response.json();
         setUser(result.user);
         console.log("this is a test", result);
       } catch (error) {
         console.error("User data fetch error:", error);
         // Handle error, e.g., redirect to login page
       }
     };

     const isAdmin = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
     const hasUserListPrivilege =
       user && user.privileges && user.privileges.flat().includes("viewCard");

  
  return (
    <>
     
      {isAdmin && hasUserListPrivilege && (
         <div style={{ marginTop: "25px" }}>
        <DashboardDesign />
      </div>
      )}

      <div style={{ marginTop: "25px" }}>
        <Analysis />
      </div>
      <div style={{ marginTop: "25px" }}>
        <SaleChart />
      </div>

      <br />
    </>
  );
};

export default Welcome;
