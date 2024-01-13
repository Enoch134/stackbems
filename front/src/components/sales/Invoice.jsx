// import React, { Fragment, useRef } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
// // import { useTheme } from "@material-ui/core/styles";
// import { Transition } from "@headlessui/react";
// import { toPng } from "html-to-image";
// import { jsPDF } from "jspdf";

// export const Invoice = ({
//   isOpen,
//   setIsOpen,
//   invoiceInfo,
//   cartItems,
//   onAddNextInvoice
// }) => {
//   // const theme = useTheme();
//   const printRef = useRef(null);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const addNextInvoiceHandler = () => {
//     setIsOpen(false);
//     onAddNextInvoice();
//   };

//   const saveAsPDFHandler = () => {
//     const dom = printRef.current;

//     // Convert HTML content to image
//     toPng(dom)
//       .then((dataUrl) => {
//         const img = new Image();
//         img.crossOrigin = "anonymous";
//         img.src = dataUrl;
//         img.onload = () => {
//           // Initialize the PDF.
//           const pdf = new jsPDF({
//             orientation: "portrait",
//             unit: "in",
//             format: [5.5, 8.5]
//           });

//           // Define reused data
//           const imgProps = pdf.getImageProperties(img);
//           const imageType = imgProps.fileType;
//           const pdfWidth = pdf.internal.pageSize.getWidth();

//           // Calculate the number of pages.
//           const pxFullHeight = imgProps.height;
//           const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
//           const nPages = Math.ceil(pxFullHeight / pxPageHeight);

//           // Define pageHeight separately so it can be trimmed on the final page.
//           let pageHeight = pdf.internal.pageSize.getHeight();

//           // Create a one-page canvas to split up the full image.
//           const pageCanvas = document.createElement("canvas");
//           const pageCtx = pageCanvas.getContext("2d");
//           pageCanvas.width = imgProps.width;
//           pageCanvas.height = pxPageHeight;

//           for (let page = 0; page < nPages; page++) {
//             // Trim the final page to reduce file size.
//             if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
//               pageCanvas.height = pxFullHeight % pxPageHeight;
//               pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
//             }

//             // Display the page.
//             const w = pageCanvas.width;
//             const h = pageCanvas.height;
//             pageCtx.fillStyle = "white";
//             pageCtx.fillRect(0, 0, w, h);
//             pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

//             // Add the page to the PDF.
//             if (page) pdf.addPage();

//             const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
//             pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
//           }

//           // Output / Save
//           pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
//         };
//       })
//       .catch((error) => {
//         console.error("Oops, something went wrong!", error);
//       });
//   };

//   const printHandler = () => {
//     // Trigger the browser's print dialog
//     window.print();
//   };

//   const shareHandler = async () => {
//     try {
//       const sharedData = {
//         title: "Invoice",
//         text: "Check out this invoice!",
//         // Include your data to share (example: invoice details)
//         data: {
//           invoiceNumber: invoiceInfo.invoiceNumber,
//           cashier: invoiceInfo.cashierName,
//           customer: invoiceInfo.customerName,
//           cartItems: cartItems.map((item) => ({
//             name: item.name,
//             qty: item.qty,
//             price: item.price,
//             quantity: item.quantity,
//             subtotal: item.subtotal
//           })),
//           ground_total: invoiceInfo.ground_total,
//           discount: invoiceInfo.discount,
//           tax: invoiceInfo.tax,
//           payment_method: invoiceInfo.payment_method,
//           payment_receive: invoiceInfo.payment_receive,
//           payment_status: invoiceInfo.payment_status,
//           balance: invoiceInfo.balance
//         }
//       };

//       if (navigator.share) {
//         // Serialize the entire sharedData object as text
//         const serializedData = JSON.stringify(sharedData);

//         await navigator.share({
//           title: sharedData.title,
//           text: sharedData.text,
//           url: window.location.href, // You might want to adjust this URL
//           files: [
//             new File([serializedData], "invoice_data.json", {
//               type: "application/json"
//             })
//           ]
//         });
//       } else {
//         // Fallback for browsers/devices that don't support Web Share API
//         // Create a shareable link
//         const shareableLink = generateShareableLink(sharedData.data);

//         // You can implement your custom sharing solution here
//         // For example, open a modal with the shareable link
//         openCustomShareModal(shareableLink);
//       }
//     } catch (error) {
//       console.error("Error sharing:", error);
//       alert("Error sharing. Please try again.");
//     }
//   };

//   // Function to generate a shareable link
//   const generateShareableLink = (invoiceData) => {
//     // Convert the invoice data to a query string
//     const queryString = Object.entries(invoiceData)
//       .map(
//         ([key, value]) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//       )
//       .join("&");

//     // Append the query string to the base URL
//     const shareableLink = `${
//       window.location.href.split("?")[0]
//     }?${queryString}`;

//     return shareableLink;
//   };

//   // Function to open a custom share modal with the shareable link
//   const openCustomShareModal = (shareableLink) => {
//     // You can implement your custom modal logic here
//     // For example, use a library like Material-UI Dialog to display the shareable link
//     alert(`Share this link:\n${shareableLink}`);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         open={isOpen}
//         onClose={closeModal}
//         fullWidth
//         maxWidth="md"
//         className="max-w-lg mx-auto"
//       >
//         <DialogContent dividers>
//           <div ref={printRef}>
//             {/* Your invoice content */}
//             <h1 className="text-center text-lg font-bold text-gray-900">
//               INVOICE
//             </h1>
//             <div className="mt-6  ">
//               <div className="mb-4 grid grid-cols-2 ">
//                 <span className="font-bold">Cashier:</span>
//                 <span>{invoiceInfo.customer_name}</span>
//                 <span className="font-bold">Customer:</span>
//                 <span>{invoiceInfo.customer_phone}</span>
//               </div>

//               <div className="cart-items">
//                 <h3>Cart Items</h3>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                       <th>Sub Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartItems.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.name}</td>
//                         <td>{item.price}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.subtotal}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="mt-4 flex flex-col items-center space-y-2">
//                 <div className="flex w-full justify-between border-t border-black/10 pt-2">
//                   <span className="font-bold">Subtotal:</span>
//                   <span>${invoiceInfo.ground_total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex w-full justify-between">
//                   <span className="font-bold">Discount:</span>
//                   <span>${invoiceInfo.discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex w-full justify-between">
//                   <span className="font-bold">Tax:</span>
//                   <span>${invoiceInfo.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex w-full justify-between border-t border-black/10 py-2">
//                   <span className="font-bold">Total:</span>
//                   <span className="font-bold">
//                     ${invoiceInfo.payment_receive.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex w-full justify-between border-t border-black/10 py-2">
//                   <span className="font-bold">Total:</span>
//                   <span className="font-bold">
//                     ${invoiceInfo.payment_status.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex w-full justify-between border-t border-black/10 py-2">
//                   <span className="font-bold">Total:</span>
//                   <span className="font-bold">
//                     ${invoiceInfo.balance.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex w-full justify-between border-t border-black/10 py-2">
//                   <span className="font-bold">Total:</span>
//                   <span className="font-bold">
//                     ${invoiceInfo.payment_method.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={saveAsPDFHandler} variant="outlined" color="primary">
//             Download
//           </Button>
//           <Button onClick={shareHandler} variant="outlined" color="primary">
//             Share
//           </Button>
//           <Button onClick={printHandler} variant="outlined" color="primary">
//             Print
//           </Button>
//           <Button
//             onClick={addNextInvoiceHandler}
//             variant="contained"
//             color="primary"
//           >
//             Next
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Transition>
//   );
// };

// export default Invoice;
