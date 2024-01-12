import React,{useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CreateInventory } from './CreateInventory';
import { EditInventory } from './EditInventory';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Detail from './Detail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {IconButton} from "@material-tailwind/react";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from "axios"
import { Link } from "react-router-dom";
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


export function ProductList() {

 const [open2, setOpen2] = React.useState(false);
 const [open3, setOpen3] = React.useState(false);
 const [product, setProduct] = useState([]);
 const [selectedRowId, setSelectedRowId] = useState(null);
 const [user, setUser] = useState(null)
  
  
   useEffect(() => {
     getProduct();
     fetchUserData()
   }, []);

   const getProduct = async () => {
     const token = localStorage.getItem("token");
     const authHeader = `Bearer ${token}`;

     try {
       const response = await axios.get("http://localhost:2024/product", {
         headers: {
           Authorization: authHeader
         }
       });
       setProduct(response.data);
       console.log(response);
     } catch (error) {
       console.error("Error:", error);
     }
   }; 
    

  const handleOpen2 = (id) => {
    setOpen2(true);
     console.log("Clicked Info button with id:", id);
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

      const isCreate= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserCreate= user && user.privileges && user.privileges.flat().includes("createInvent");


    

      const isEdit= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserEdit = user && user.privileges && user.privileges.flat().includes("editInvent");


    

      const isDetail= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserDetail = user && user.privileges && user.privileges.flat().includes("detailInvent");


    

      const isDel= user && user.roles && user.roles.includes("admin" || "partner" || "manager" || "helper" || "custom");
      const hasUserDel = user && user.privileges && user.privileges.flat().includes("delInvent");


    
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
    <div className="m-4 mb-8 flex flex-col gap-12">
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 1000 }}>
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

      {isCreate && hasUserCreate && (
        <div className="flex justify-end -mt-18 ">
          <Button
            className="shadow-lg bg-blue-800 text-white rounded"
            style={{ background: "blue", color: "white" }}
          >
            <Link to="/products/add">
              <GroupAddIcon />
            </Link>
          </Button>
        </div>
      )}

      <div className="shadow-2xl">
        <TableContainer component={Paper} className="-mt-10">
          <Table
            sx={{ minWidth: 600 }}
            size="small"
            aria-label="a dense table"
            id="stsTokenDisplay"
            className="m-4"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Method</TableCell>
                <TableCell align="right">Profit</TableCell>
                <TableCell align="right">Cost Price</TableCell>
                <TableCell align="right">Purchase</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Tag</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.sell_method}</TableCell>
                  <TableCell align="left">{product.margin}</TableCell>
                  <TableCell align="left">{product.cost_price}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">{product.stock_available}</TableCell>
                  <TableCell align="left">{product.tax}</TableCell>
                  <TableCell align="left">
                    <img
                      src={product.url}
                      alt={product.name}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  </TableCell>
                  <TableCell align="left">{product.tag}</TableCell>
                  <TableCell align="left">
                    <div style={{ display: "flex" }}>
                      {isEdit && hasUserEdit && (
                        <Link
                          to={`/products/edit/${product.id}`}
                          style={{ textDecoration: "none", color: "blue" }}
                        >
                          <EditIcon />
                        </Link>
                      )}

                      {isDetail && hasUserDetail && (
                        <Link onClick={() => handleOpen2(product.id)}>
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
    </div>
  );
}

export default ProductList;
