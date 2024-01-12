import React,{useState} from 'react';
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


export function Report() {

    
    $("#stsTokenDisplay").DataTable().destroy();
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
             className: "btn-blue",
           },
           {
             extend: "csv",
             className: "btn-green",
           },
           {
             extend: "excel",
             className: "btn-yellow",
           },
           {
             extend: "pdf",
             className: "btn-red",
           },
           {
             extend: "print",
             className: "btn-purple",
           },
         ],
         initComplete: function () {
           // Manually apply Tailwind CSS classes after DataTable initialization is complete
           $(".btn-blue").addClass("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4 ml-4");
           $(".btn-green").addClass("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded");
           $(".btn-yellow").addClass("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded");
           $(".btn-red").addClass("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded");
           $(".btn-purple").addClass("bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded");
         },
       });
     });
 
   const logourl = "/assets/cjlogo.png";
  
  return (
  <div>
  <div class="min-h-screen p-6 flex items-center justify-center">
  <div class="container max-w-screen-lg mx-auto  ">
    <div>
      <div class="bg-white rounded shadow-2xl p-4 px-4 md:p-8 mb-6 " style={{marginTop:"-35%"}}>
        <form >
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 ">
          <div class="text-gray-900">
              <img
                src={logourl}
                alt="CJBEM Logo"
                className="mt-4 mb-2"
                style={{ maxWidth: "40%", height: "auto" }}
              />
            <p class="font-medium text-lg pl-4">Sales Report</p>
            <p className='pl-4'>Please fill out all the fields.</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="full_name">Staff Name</label>
                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div class="md:col-span-5">
                <label for="email">Sale</label>
                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="sales" />
              </div>

              <div class="md:col-span-2">
                <label for="address">Start Date</label>
                <input type="date" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
              </div>

              <div class="md:col-span-2">
                <label for="city">End Date</label>
                <input type="date" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div class="md:col-span-1">
                <button type="text" name="city" id="city" class="h-10 border mt-6 rounded px-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold">Submit</button>
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
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-2xl " style={{marginTop:"-35%"}}>
    <div class="w-full overflow-x-auto">
      <table class="w-full" id='stsTokenDisplay'>
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Age</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Date</th>
            <th class="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700">
            <td class="px-4 py-3 border">
              <div class="flex items-center text-sm">
                <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p class="font-semibold text-black">Sufyan</p>
                  <p class="text-xs text-gray-600">Developer</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-ms font-semibold border">22</td>
            <td class="px-4 py-3 text-xs border">
              <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
            </td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
            <td class="px-4 py-3 text-sm border">6/4/2000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
</div>
  );
}

export default Report;
