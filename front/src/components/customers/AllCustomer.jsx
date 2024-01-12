import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CreateCustomer } from './CreateCustomer';
import { EditCustomer } from './EditCustomer';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Detail from './Detail';
import axios from "axios"
import {Link} from "react-router-dom"
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


export function AllCustomer() {

 const [open, setOpen] = React.useState(false);
 const [open1, setOpen1] = React.useState(false);
 const [open2, setOpen2] = React.useState(false);
 const [open3, setOpen3] = React.useState(false);
 const [customer, setCustomer] = useState([])
 const [selectedRowId, setSelectedRowId] = useState(null);
 const [user, setUser] = useState(null)
  

   useEffect(() => {
     getCustomer();
     fetchUserData()
   }, []);

   const getCustomer = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get("http://localhost:2024/customer", {
         headers: {
           Authorization: authHeader
         }
       });
       setCustomer(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
   }; 

    
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    };

  const handleOpen1 = (id) => {
    setOpen1(true);
    setSelectedRowId(id);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setSelectedRowId(null);
    };
  const handleOpen2 = (id) => {
    setOpen2(true);
     setSelectedRowId(id);
  };
  const handleClose2 = () => {
    setOpen2(false);
     setSelectedRowId(null);
    };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
    };



    const [anchorEl, setAnchorEl] = React.useState(null);
    const opens = Boolean(anchorEl);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    
  
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
        user && user.privileges && user.privileges.flat().includes("createCustomer");

      const isEdit= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserEdit =
        user && user.privileges && user.privileges.flat().includes("editCustomer");

      const isDetail= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserDetail =
        user && user.privileges && user.privileges.flat().includes("detailCustomer");

      const isDel = user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserDel =
        user && user.privileges && user.privileges.flat().includes("delCustomer");


    
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
 
    
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 50,
  p: 4,
};

  return (
    <div className="m-4 mb-8 flex flex-col gap-12 shadow-2xl">
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 900 }}>
          <EditCustomer id={selectedRowId} />
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 900, marginLeft: "200px" }}>
          <Detail id={selectedRowId} />
        </Box>
      </Modal>

      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this staff member? This action is
            irreversible, and all associated data will be permanently removed.
            Please double-check your decision, ensuring that you have backed up
            any necessary information, before confirming the deletion.
          </Typography>
        </Box>
      </Modal>

      {isAdmin && hasUserListPrivilege && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className="flex items-center justify-center"
          >
            <Box sx={{ width: 900 }}>
              <CreateCustomer />
            </Box>
          </Modal>
          <div className="flex justify-end -mt-15 ">
            <Button
              onClick={handleOpen}
              className="shadow-2xl text-white rounded"
              style={{ background: "blue" }}
            >
              <GroupAddIcon />
            </Button>
          </div>
        </>
      )}

      <TableContainer component={Paper} className="-mt-10 shadow-2xl">
        <Table
          sx={{ minWidth: 200 }}
          size="small"
          aria-label="a dense table"
          id="stsTokenDisplay"
        >
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer, index) => (
              <TableRow
                key={customer.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{customer.name}</TableCell>
                <TableCell align="left">{customer.phone}</TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="left">{customer.country}</TableCell>
                <TableCell align="left">{customer.city}</TableCell>
                <TableCell align="left">{customer.address}</TableCell>
                <TableCell align="left">{customer.gender}</TableCell>
                <TableCell align="left">
                  <div style={{ display: "flex" }}>
                    {isEdit && hasUserEdit && (
                      <Link
                        to={`/allCutomers/edit/${customer.id}`}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        <EditIcon />
                      </Link>
                    )}

                    {isDetail && hasUserDetail && (
                      <Link onClick={() => handleOpen2(customer.id)}>
                        <span className="text-yellow-600">
                          <InfoIcon />
                        </span>
                      </Link>
                    )}

                    {isDel && hasUserDel && (
                      <Link onClick={handleOpen3}>
                        <span className="text-red-600">
                          <DeleteForeverIcon />
                        </span>
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllCustomer;
