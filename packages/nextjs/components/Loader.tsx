import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">Please wait until the transaction is submitted and confirmed</div>
      <div className="border-4 border-solid border-gray-200 h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
