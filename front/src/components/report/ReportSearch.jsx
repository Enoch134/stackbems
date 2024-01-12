import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
window.JSZip = jzip;

export function ReportSearch() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerReport, setCustomerReport] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveCustomer = async (e) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/customerReport",
        {
          startDate: startDate,
          endDate: endDate
        },
        {
          headers: {
            Authorization: authHeader
          }
        }
      );

      setCustomerReport(response.data.data.customerReport);
      console.log(response);
      
      // navigate("/allCustomer");
      //  $("#stsTokenDisplay").DataTable().destroy();
       $(document).ready(function () {
         $("#stsTokenDisplay").DataTable({
           pagingType: "full_numbers",
           pageLength: 5,
           destroy: true,
           processing: true,
           dom: "Bfrtip",
           buttons: [
             {
               extend: "copy",
               className: "btn-blue"
             },
             {
               extend: "csv",
               className: "btn-green"
             },
             {
               extend: "excel",
               className: "btn-yellow"
             },
             {
               extend: "pdf",
               className: "btn-red"
             },
             {
               extend: "print",
               className: "btn-purple"
             }
           ],
           initComplete: function () {
             // Manually apply Tailwind CSS classes after DataTable initialization is complete
             $(".btn-blue").addClass(
               "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4 ml-4"
             );
             $(".btn-green").addClass(
               "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
             );
             $(".btn-yellow").addClass(
               "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
             );
             $(".btn-red").addClass(
               "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
             );
             $(".btn-purple").addClass(
               "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
             );
           }
         });
       });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

 

  const logourl = "/assets/cjlogo.png";

  return (
    <div>
      <div class="min-h-screen p-6 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto  ">
          <div>
            <div
              class="bg-white rounded shadow-2xl p-4 px-4 md:p-8 mb-6 "
              style={{ marginTop: "-35%" }}
            >
              <form onSubmit={saveCustomer}>
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 ">
                  <div class="text-gray-900">
                    <img
                      src={logourl}
                      alt="CJBEM Logo"
                      className="mt-4 mb-2"
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                    <p class="font-medium text-lg pl-4">Sales Report</p>
                    <p className="pl-4">Please fill out all the fields.</p>
                  </div>

                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-2">
                        <label for="full_name" className="text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          class="h-10 border mt-1 rounded px-4 w-full text-gray-600 placeholder-text-gray-600"
                          placeholder="item name"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="email" className="text-gray-700">
                          Payment Status
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          class="h-10 border mt-1 rounded px-4 w-full text-gray-600 placeholder-text-gray-600"
                          placeholder="end date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.vaalue)}
                        />
                      </div>
                      <div class="md:col-span-5 text-gray-900 mt-4">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* table for report */}
      <section class="container mx-auto p-6 font-mono ">
        <div
          class="w-full mb-8 overflow-hidden rounded-lg shadow-2xl "
          style={{ marginTop: "-35%" }}
        >
          <div class="w-full overflow-x-auto">
            <table class="w-full" id="stsTokenDisplay">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">No</th>
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Phone</th>
                  <th class="px-4 py-3">Email</th>
                  <th class="px-4 py-3">Country</th>
                  <th class="px-4 py-3">City</th>
                  <th class="px-4 py-3">Address</th>
                  <th class="px-4 py-3">Gender</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {customerReport.map((customerReport, index) => (
                  <tr class="text-gray-700" key={customerReport.id}>
                    <td class="px-4 py-3 border">{index + 1}</td>
                    <td class="px-4 py-3 text-ms font-semibold border">
                      {customerReport.name}
                    </td>
                    <td class="px-4 py-3 text-xs border">
                      {customerReport.phone}
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      {customerReport.email}
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      {customerReport.country}
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      {customerReport.city}
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      {customerReport.address}
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      {customerReport.gender}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportSearch;
