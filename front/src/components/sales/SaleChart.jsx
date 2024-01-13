import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import axios from "axios";


function SaleChart() {
   const [monthlySums, setMonthlySums] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        
       const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_URL}/totalSaleYearly`,
            {
              headers: {
                Authorization: authHeader
              }
            }
          ); 
          setMonthlySums(response.data);
          console.log(response)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols gap-1 shadow-2xl ">
        <div className="bg-white p-4 rounded-lg shadow-2xl">
          <h3 className="text-xl font-semibold mb-2">Sales Line Chart</h3>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
              data={monthlySums}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
            >
              <Tooltip />
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend />
              <Line type="monotone" dataKey="totalAmount" stroke="#11009E" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default SaleChart;
