import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import { CreateStaff } from "./CreateStaff";
// import { EditStaff } from "./EditStaff";
// import Detail from "./Detail";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import axios from "axios";
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
import UserRoleForm from "./UserRoleForm";
import { getMe } from "../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
  import MoreVertIcon from "@mui/icons-material/MoreVert";

window.JSZip = jzip;

export function UserRole() {
  const [role, setRole] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { isError } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getMe());
   }, [dispatch]);

   useEffect(() => {
     if (isError) {
       navigate("/");
     }
   }, [isError, navigate]);

  useEffect(() => {
    getAllRole();
  }, []);

  const getAllRole = async () => {
  

    try {
      const response = await axios.get("http://localhost:2024/role");
      setRole(response.data);
      console.log(response.data);
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 50,
    p: 4
  };


  


  return (
    <div className="m-4 mb-8 flex flex-col gap-12 shadow-2xl">
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-end justify-end"
      >
        <Box sx={{ width: 900 }}>{/* <EditStaff id={selectedRowId} /> */}</Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 1000, marginLeft: "300px" }}>
          {/* <Detail id={selectedRowId} /> */}
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        className="flex items-center justify-center"
      >
        <Box sx={{ width: 900 }}>
          <UserRoleForm />
        </Box>
      </Modal>

      <div className="flex justify-end -mt-15 ">
        <Button
          onClick={handleOpen}
          className="shadow-lg bg-blue-800 text-white rounded"
          style={{ background: "blue" }}
        >
          <GroupAddIcon />
        </Button>
      </div>
      <TableContainer component={Paper} className="-mt-9 shadow-2xl">
        <Table
          sx={{ minWidth: 600 }}
          size="small"
          aria-label="a dense table"
          id="stsTokenDisplay"
        >
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Role Name</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {role.map((role, index) => (
              <TableRow
                key={role.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{role.name}</TableCell>
                <TableCell align="left">
                  {" "}
                  {role.user ? role.user.userId?.first_name || "N/A" : "N/A"}
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={handleMenuClick}
                    aria-label="more"
                    id="long-button"
                    aria-controls={opens ? "long-menu" : undefined}
                    aria-expanded={opens ? "true" : undefined}
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                  </Button>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button"
                    }}
                    anchorEl={anchorEl}
                    open={opens}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        width: "20ch"
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleOpen1(role.id)}>
                      <Button
                        startIcon={<EditIcon />}
                        style={{ color: "blue" }}
                      >
                        Edit
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={() => handleOpen2(role.id)}>
                      <Button
                        startIcon={<InfoIcon />}
                        style={{ color: "orange" }}
                      >
                        Info
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleOpen3}>
                      <Button
                        startIcon={<DeleteForeverIcon />}
                        style={{ color: "red" }}
                      >
                        Delete
                      </Button>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserRole;
