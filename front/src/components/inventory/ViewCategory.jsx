import React from "react";

export const ViewCategory = () => {
     const logourl = "/img/cjlogo.png";
  return (
      <div  fullWidth maxWidth="md" className="max-w-sm mx-auto bg-white p-6">
       <img
        src={logourl}
        alt="CJBEM Logo"
        className="mx-auto mt-8 mb-2"
        style={{ maxWidth: "20%", height: "auto" }}
      />
     <h1 className="text-center text-lg font-bold text-gray-900">
       Category Detail
     </h1>
 <div className="mt-6  ">
  <div className="mt-4 flex flex-col items-center space-y-2">
    <div className="flex w-full justify-between border-t border-black/10 pt-2">
      <span className="font-bold">Subtotal:</span>
      <span>$4500</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Unit:</span>
      <span>30</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Tax:</span>
      <span>$30</span>
    </div>
    <div className="flex w-full justify-between border-t border-black/10 py-2">
      <span className="font-bold">Total:</span>
      <span className="font-bold">
         2000
      </span>
    </div>
  </div>
  <div className="mt-4 flex flex-col items-center space-y-2">
    <div className="flex w-full justify-between border-t border-black/10 pt-2">
      <span className="font-bold">Subtotal:</span>
      <span>$4500</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Unit:</span>
      <span>30</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Tax:</span>
      <span>$30</span>
    </div>
    <div className="flex w-full justify-between border-t border-black/10 py-2">
      <span className="font-bold">Total:</span>
      <span className="font-bold">
         2000
      </span>
    </div>
  </div>
  <div className="mt-4 flex flex-col items-center space-y-2">
    <div className="flex w-full justify-between border-t border-black/10 pt-2">
      <span className="font-bold">Product Name:</span>
      <span>Shoe</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Unit:</span>
      <span>30</span>
    </div>
    <div className="flex w-full justify-between">
      <span className="font-bold">Tax:</span>
      <span>$30</span>
    </div>
    <div className="flex w-full justify-between border-t border-black/10 py-2">
      <span className="font-bold">Total:</span>
      <span className="font-bold">
         2000
      </span>
    </div>
  </div>
   </div>

         
      </div>
    
  );
};

export default ViewCategory;
