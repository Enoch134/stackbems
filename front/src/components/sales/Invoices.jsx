import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import  axios  from "axios";

export const Invoices = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
  id
}) => {

  const [msg, setMsg] = useState("");
   const [selected_items, setSelected_items] = useState([]);
   const [sub_total, setSub_total] = useState([]);
   const [shipping, setShipping] = useState([]);
   const [discount, setDiscount] = useState([]);
   const [charges_description, setCharges_description] = useState([]);
   const [ground_total, setGround_total] = useState([]);
   const [payment_status, setPayment_status] = useState([]);
   const [payment_method, setPayment_method] = useState([]);
   const [customer_phone, setCustomer_phone] = useState([]);
   const [customer_name, setCustomer_name] = useState([]);
   const [payment_receive, setPayment_receive] = useState([]);
   const [tax, setTax] = useState([]);
   const [balance, setBalance] = useState([]);

   useEffect(() => {
     const getCustomerById = async () => {
       try {
         const token = localStorage.getItem("token");
         const config = {
           headers: {
             Authorization: `Bearer ${token}`
           }
         };

         const response = await axios.get(
           `http://localhost:2024/sale/${id}`,
           config
         );

         console.log("Fetched data:", response.data);
         const customerData = response.data;

         setSelected_items(customerData.selected_items);
         setSub_total(customerData.sub_total);
         setShipping(customerData.shipping);
         setDiscount(customerData.discount);
         setCharges_description(customerData.charges_description);
         setGround_total(customerData.ground_total);
         setPayment_status(customerData.payment_status);
         setPayment_method(customerData.payment_method);
         setCustomer_name(customerData.customer_name);
         setCustomer_phone(customerData.customer_phone);
         setTax(customerData.tax);
         setPayment_receive(customerData.payment_receive);
         setBalance(customerData.balance);
       } catch (error) {
         if (error.response) {
           setMsg(error.response.data.msg);
         }
       }
     };

     getCustomerById();
   }, [id]);
  
  const theme = useTheme();
  const printRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

   const saveAsPDFHandler = () => {
     const dom = printRef.current;

     // Convert HTML content to image
     toPng(dom)
       .then((dataUrl) => {
         const img = new Image();
         img.crossOrigin = "anonymous";
         img.src = dataUrl;
         img.onload = () => {
           // Initialize the PDF.
           const pdf = new jsPDF({
             orientation: "portrait",
             unit: "in",
             format: [5.5, 8.5]
           });

           // Define reused data
           const imgProps = pdf.getImageProperties(img);
           const imageType = imgProps.fileType;
           const pdfWidth = pdf.internal.pageSize.getWidth();

           // Calculate the number of pages.
           const pxFullHeight = imgProps.height;
           const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
           const nPages = Math.ceil(pxFullHeight / pxPageHeight);

           // Define pageHeight separately so it can be trimmed on the final page.
           let pageHeight = pdf.internal.pageSize.getHeight();

           // Create a one-page canvas to split up the full image.
           const pageCanvas = document.createElement("canvas");
           const pageCtx = pageCanvas.getContext("2d");
           pageCanvas.width = imgProps.width;
           pageCanvas.height = pxPageHeight;

           for (let page = 0; page < nPages; page++) {
             // Trim the final page to reduce file size.
             if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
               pageCanvas.height = pxFullHeight % pxPageHeight;
               pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
             }

             // Display the page.
             const w = pageCanvas.width;
             const h = pageCanvas.height;
             pageCtx.fillStyle = "white";
             pageCtx.fillRect(0, 0, w, h);
             pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

             // Add the page to the PDF.
             if (page) pdf.addPage();

             const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
             pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
           }

           // Output / Save
           pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
         };
       })
       .catch((error) => {
         console.error("Oops, something went wrong!", error);
       });
   };

   const printHandler = () => {
     // Trigger the browser's print dialog
     window.print();
   };

const shareHandler = async () => {
  try {
    const sharedData = {
      title: "Invoice",
      text: "Check out this invoice!",
      // Include your data to share (example: invoice details)
      data: {
        selected_items: invoiceInfo.selected_items,
        customer_name: invoiceInfo.customer_name,
        customer_phone: invoiceInfo.customer_phone,
        items: items.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          total: item.qty * item.price
        })),
        subtotal: invoiceInfo.subtotal,
        discount: invoiceInfo.discountRate,
        tax: invoiceInfo.taxRate,
        total: invoiceInfo.total
      }
    };

    if (navigator.share) {
      // Serialize the entire sharedData object as text
      const serializedData = JSON.stringify(sharedData);

      await navigator.share({
        title: sharedData.title,
        text: sharedData.text,
        url: window.location.href, // You might want to adjust this URL
        files: [
          new File([serializedData], "invoice_data.json", {
            type: "application/json"
          })
        ]
      });
    } else {
      // Fallback for browsers/devices that don't support Web Share API
      // Create a shareable link
      const shareableLink = generateShareableLink(sharedData.data);

      // You can implement your custom sharing solution here
      // For example, open a modal with the shareable link
      openCustomShareModal(shareableLink);
    }
  } catch (error) {
    console.error("Error sharing:", error);
    alert("Error sharing. Please try again.");
  }
};

// Function to generate a shareable link
const generateShareableLink = (invoiceData) => {
  // Convert the invoice data to a query string
  const queryString = Object.entries(invoiceData)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  // Append the query string to the base URL
  const shareableLink = `${window.location.href.split("?")[0]}?${queryString}`;

  return shareableLink;
};

// Function to open a custom share modal with the shareable link
const openCustomShareModal = (shareableLink) => {
  // You can implement your custom modal logic here
  // For example, use a library like Material-UI Dialog to display the shareable link
  alert(`Share this link:\n${shareableLink}`);
};


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
        className="max-w-lg mx-auto"
      >
        <DialogContent dividers>
          <div ref={printRef}>
            {/* Your invoice content */}
            <h1 className="text-center text-lg font-bold text-gray-900">
              INVOICE
            </h1>
            <div className="mt-6  ">
              <div className="mb-4 grid grid-cols-2 ">
                <span className="font-bold">Cashier:</span>
                <span>{invoiceInfo.cashierName}</span>
                <span className="font-bold">Customer:</span>
                <span>{invoiceInfo.customerName}</span>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-y border-black/10 text-sm md:text-base">
                    <th>ITEM</th>
                    <th className="text-center">QTY</th>
                    <th className="text-right">PRICE</th>
                    <th className="text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td className="min-w-[50px] text-center">{item.qty}</td>
                      <td className="min-w-[80px] text-right">
                        ${Number(item.price).toFixed(2)}
                      </td>
                      <td className="min-w-[90px] text-right">
                        ${Number(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex flex-col items-center space-y-2">
                <div className="flex w-full justify-between border-t border-black/10 pt-2">
                  <span className="font-bold">Subtotal:</span>
                  <span>${invoiceInfo.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span className="font-bold">Discount:</span>
                  <span>${invoiceInfo.discountRate.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span className="font-bold">Tax:</span>
                  <span>${invoiceInfo.taxRate.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-between border-t border-black/10 py-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">
                    $
                    {invoiceInfo.total % 1 === 0
                      ? invoiceInfo.total
                      : invoiceInfo.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveAsPDFHandler} variant="outlined" color="primary">
            Download
          </Button>
          <Button onClick={shareHandler} variant="outlined" color="primary">
            Share
          </Button>
          <Button onClick={printHandler} variant="outlined" color="primary">
            Print
          </Button>
          <Button
            onClick={addNextInvoiceHandler}
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </Transition>
  );
};

export default Invoices;
